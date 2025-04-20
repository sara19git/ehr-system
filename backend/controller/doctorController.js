import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
// for handling the interaction with the doctor model
import Doctor from "../model/doctorModel.js"



// code for register a doctor (create an account)
//Desc   register a new doctor
//Route  POST api/doctor/registerDoctor
//access Public
export const registerDoctor = asyncHandler(async(req, res)=>{
    const {fullName, email, password, role} = req.body

    if(!fullName || !email || !password || !role){
         res.status(400)
         throw new Error("Please add all fields")
    }

    const doctorExist = await Doctor.findOne({email})
    if(doctorExist){
        return res.status(400).json({message:"Doctor already exist"})
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create doctor
    const doctor =await Doctor.create({fullName, email, password:hashedPassword, role })

    if(doctor){
        res.status(201).json({_id: doctor.id, fullName: doctor.fullName, email: doctor.email, role: doctor.role, token: generateToken(doctor._id),})
    }else{
        res.status(400)
        throw new Error("Invalid doctor data")
    }

     res.json({message:"Register Doctor"})
})


// code for Login a doctor
//Desc   login as a doctor 
//Route  POST api/doctor/loginDoctor
//access Public
export const loginDoctor = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    
    //Check for doctor email
    const doctor = await Doctor.findOne({email})

    if(doctor && (await bcrypt.compare(password, doctor.password))){
        res.json({_id: doctor.id, name: doctor.name, email: doctor.email, token: generateToken(doctor._id),})
    }
    else {
        res.status(400) 
        throw new Error("Invalid credentials")
    }
    
   
})


// code for get a doctor
//Desc   login as a doctor
//Route  GET api/doctor/getDoctor
//access Private
export const getDoctor = asyncHandler(async(req, res)=>{
    if (!req.user || req.user.role !== "doctor") {
        res.status(403).json({ message: "Access denied, only doctors can access this route" });
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
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"})
}


//code for inserting the data into the data base
export const createDoctor = async(req, res)=> {
    try {
         //create new doctor instant with the request body
        const doctorData = new Doctor(req.body);
        //check if doctor already exists or not
        const{email} = doctorData;

        const doctorExist = await Doctor.findOne({email})
        if(doctorExist){
            return res.status(400).json({message:"Doctor already exist"})
        }

        //if the doctor is not already exists (then save the data wich is providing with the json body)
        const savedDoctor = await doctorData.save();
        //return some responses
        res.status(200).json(savedDoctor);
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


//code for get the data from database
export const getAllDoctors = async(req, res)=> {
    try {
        //fetching all the users from te database
        const doctors = await Doctor.find();

        // if the data base is empty
        if(doctors.length === 0){
            return res.status(404).json({message: "Doctor Not Found"})

        }
        // if there are a doctors
        res.status(200).json(doctors);
        
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};

export const updateDoctor = async(req, res)=>{
    try {
        const id =req.params.id;
        const doctorExist = await Doctor.findOne({_id:id})
        if(!doctorExist){
            return res.status(404).json({message: "Doctor Not Found"})
        }
        const updateDoctor = await Doctor.findByIdAndUpdate(id, req.body, {new:true});
        res.status(201).json(updateDoctor);

        
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
        
    }

};


export const deleteDoctor = async(req, res)=>{
    try {
        const id =req.params.id;
        const doctorExist = await Doctor.findOne({_id:id})
        if(!doctorExist){
            return res.status(404).json({message: "Doctor Not Found"})
        }

        await Doctor.findByIdAndDelete(id);
        res.status(201).json({message: "Doctor deleted successfully"})
        
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}


//code for search about doctors
export const searchDoctors = asyncHandler(async (req, res) => {
    const { name, specialization, page = 1, limit = 10 } = req.query; 

    let query = {};
    if (name) query.name = { $regex: name, $options: "i" };
    if (specialization) query.specialization = { $regex: specialization, $options: "i" };

    try {
        const doctors = await Doctor.find(query)
        .select("-password")
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

        if (doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found" });
        }

        //calculate te total number of doctors
        const totalDoctors = await Doctor.countDocuments(query);
        res.status(200).json({
            totalPages: Math.ceil(totalDoctors / limit),
            currentPage: page,
            totalDoctors,
            data: doctors
        });

    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

