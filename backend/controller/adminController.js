import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import Admin from "../model/adminModel.js"
import Patient from "../model/patientModel.js"
import Doctor from "../model/doctorModel.js"
import Record from "../model/recordModel.js"


// code for register an admin(create an account)
//Desc   register a new admin
//Route  POST api/admin/registerAdmin
//access Public
export const registerAdmin = asyncHandler(async(req, res)=>{
    const {fullName , email, password} = req.body

    if(!fullName || !email || !password ){
         res.status(400)
         throw new Error("Please add all fields")
    }

    const adminExist = await Admin.findOne({email})
    if(adminExist){
        return res.status(400).json({message:"Admin already exist"})
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //create Admin
    const admin =await Admin.create({fullName, email, password:hashedPassword})

    if(admin){
        res.status(201).json({_id: admin.id, fullName: admin.fullName, email: admin.email,  token: generateToken(admin._id),})
    }else{
        res.status(400)
        throw new Error("Invalid admin data")
    }

})


// code for Login an admin
//Desc   login as an admin 
//Route  POST api/admin/loginAdmin
//access Public
export const loginAdmin = asyncHandler(async(req, res)=>{
    const {email, password} = req.body
    
    //Check for admin email
    const admin = await Admin.findOne({email})

    if(admin  && (await bcrypt.compare(password, admin .password))){
        res.json({_id: admin.id, name: admin.name, email: admin.email, token: generateToken(admin._id),})
    }
    else {
        res.status(400) 
        throw new Error("Invalid credentials")
    }

})


// code for get a admin 
//Desc   login as a admin 
//Route  GET api/admin /getAdmin 
//access Private
export const getAdmin = asyncHandler(async(req, res)=>{
    if (!req.user || req.user.role !== "admin") {
        res.status(403).json({ message: "Access denied, only admins can access this route" });
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


export const createAdmin = async(req, res)=>{
    try {
        const adminData = new Admin(req.body);
        const{email}= adminData;

        const adminExist = await Admin.findOne({email})

        if(adminExist){
            return res.status(400).json({message: "Admin already exists"})
        }

        const savedAdmin = await adminData.save();
        res.status(200).json(savedAdmin);
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}



export const getAllAdmins = async(req, res)=>{
    try {
        const admins = await Admin.find();
        if(admins.length === 0){
            return res.status(404).json({message: "Admin Not Found"})
        }
        res.status(200).json(admins);
    } catch (error) {
        console.error("Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


export const updateAdmin = async(req, res)=>{
    try {
        const id = req.params.id;
        
        const adminExist = await Admin.findOne({_id:id})
        if(!adminExist){
            return res.status(404).json({message: "Admin Not Found"})
        }
        const updateAdmin = await Admin.findByIdAndUpdate(id, req.body, {new: true} );
        res.status(201).json(updateAdmin);
    } catch (error) {
        console.error("Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};


export const deleteAdmin = async(req, res)=>{
    try {
        const id = req.params.id;
        
        const adminExist = await Admin.findOne({_id:id})
        if(!adminExist){
            return res.status(404).json({message: "Admin Not Found"})
        }

        await Admin.findByIdAndDelete(id);
        res.status(201).json({message:"Admin deleted successfully"});
        
    } catch (error) {
        console.error("Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}


export const getAdminStatistics = asyncHandler(async (req, res) => {
    try {
      const totalPatients = await Patient.countDocuments();
      const totalDoctors = await Doctor.countDocuments();
      const totalRecords = await Record.countDocuments();
  
      const topDiagnoses = await Record.aggregate([
        { $group: { _id: "$diagnosis", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);
  
      res.status(200).json({
        totalPatients,
        totalDoctors,
        totalRecords,
        topDiagnoses
      });
    } catch (error) {
      console.error("Error fetching statistics", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });



