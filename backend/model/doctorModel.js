//for define the doctor Schema
import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    specialization:{
        type: String,
        
    },
    licenseNumber:{
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
    hospital:{
        type: String,
        
    },
    registeredDate:{
        type: String,
        
    },
    password:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
    }
}, {
    timestamps : true
})

export default mongoose.model("doctors", doctorSchema);
