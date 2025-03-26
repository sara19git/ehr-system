import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import Patient from "../model/patientModel.js"


// code for register a patient (create an account)
//Desc   register a new patient 
//Route  POST api/patient/registerPatient
//access Public
export const registerPatient = asyncHandler(async(req, res)=>{
    const {name, email, password, role} = req.body

    if(!name || !email || !password || !role){
         res.status(400)
         throw new Error("Please add all fields")
    }

    const patientExist = await Patient.findOne({email})
    if(patientExist){
        return res.status(400).json({message:"Patient already exist"})
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create patient 
    const patient =await Patient.create({name, email, password:hashedPassword , role  })

    if(patient){
        res.status(201).json({_id: patient.id, name: patient.name, email: patient.email, role: patient.role, token: generateToken(patient._id),})
    }else{
        res.status(400)
        throw new Error("Invalid patient data")
    }

})


// code for Login a patient 
//Desc   login as a patient 
//Route  POST api/patient/loginPatient
//access Public
export const loginPatient = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    
    //Check for patient email
    const patient = await Patient.findOne({email})

    if(patient && (await bcrypt.compare(password, patient.password))){
        res.json({_id: patient.id, name: patient.name, email: patient.email, token: generateToken(patient._id),})
    }
    else {
        res.status(400) 
        throw new Error("Invalid credentials")
    }
    
})


// code for get a patient 
//Desc   get a patient 
//Route  GET api/patient/getPatient
//access Private
export const getPatient = asyncHandler(async(req, res)=>{
    if (!req.user || req.user.role !== "patient") {
        res.status(403).json({ message: "Access denied, only patient can access this route" });
        return;
    }
    const {_id, name, email} = req.user;
    res.status(200).json({
        id:_id,
        name,
        email,
    })
})



//Generate JWT
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d",})
}



//code for inserting the data into the database 
//Desc   create a new patient 
//Route  POST api/patient/createPatient
//access Public
export const createPatient = async(req, res)=> {
    try {
        const patientData = new Patient(req.body);
        const{email} = patientData;

        const patientExist = await Patient.findOne({email})
        if(patientExist){
            return res.status(400).json({message:"Patient already exist"})
        }
        const savedPatient = await patientData.save();
        res.status(200).json(savedPatient);
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


//Desc   get all patient 
//Route  GET api/patient/getAllPatients
//access Public
export const getAllPatients = async(req, res)=> {
    try {
        const patients = await Patient.find();

        // if the data base is empty
        if(patients.length === 0){
            return res.status(404).json({message: "Patient Not Found"})

        }
        // if there are a patients
        res.status(200).json(patients);
        
    } catch (error) {
        res.status(500).json({error: "Internal Server error."});
        
    }
};


//Desc   Update a patient 
//Route  GET api/patient/updatePatient
//access Public
export const updatePatient = async(req, res)=>{
    try {
        const id =req.params.id;
        const patientExist = await Patient.findOne({_id:id})
        if(!patientExist){
            return res.status(404).json({message: "Patient Not Found"})
        }
        const updatePatient = await Patient.findByIdAndUpdate(id, req.body, {new:true, runValidators: true});
        res.status(201).json(updatePatient);

        
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
        
    }

};



//Desc   Delete a patient 
//Route  GET api/patient/deletePatient
//access Public
export const deletePatient = async(req, res)=>{
    try {
        const id =req.params.id;
        const patientExist = await Patient.findOne({_id:id})
        if(!patientExist){
            return res.status(404).json({message: "Patient Not Found"})
        }

        await Patient.findByIdAndDelete(id);
        res.status(201).json({message: "Patient deleted successfully"})
        
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}


//code for searching about patients 
export const searchPatients = asyncHandler(async (req, res) => {

    // the values requested with pagination
    const { name, email, nationalId, page = 1, limit = 10 } = req.query; 

    let query = {};
    if (name) query.name = { $regex: name, $options: "i" }; // Search with upercase and lowercase
    if (email) query.email = email;
    if (nationalId) query.nationalId = nationalId;

    try {
        const patients = await Patient.find(query)
        .select("-password") // Hide the password
        .skip((page - 1) * limit) // Skip number of records by page  ...  تخطي عدد من السجلات حسب الصفحة
        .limit(parseInt(limit)); // Specify the number of results per page  ...  تحديد عدد النتائج لكل صفحة

        if (patients.length === 0) {
            return res.status(404).json({ message: "No patients found" });
        }

        // calculate te total number of patients ... حساب عدد المرضى الكلي
        const totalPatients = await Patient.countDocuments(query); 
        res.status(200).json({
            totalPages: Math.ceil(totalPatients / limit),
            currentPage: page,
            totalPatients,
            data: patients
        });

        
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

