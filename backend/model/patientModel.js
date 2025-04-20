// for create te user Schema
import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
    },
    gender:{
        type: String,
    },
    dateOfBirth:{
        type: String,
    },
    bloodType:{
        type: String,
    },
    phone:{
        type: String,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    address:{
        type: String,
        
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    },
    registeredDate: { 
        type: String 
    }
},
{
    timestamps : true
})

export default mongoose.model("patients", patientSchema );