import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    registeredDate:{
        type: String,
        
    },
    role:{
        type: String,
       
    },
    permissions:{
        type: Array,
    
    }
}, {
    timestamps : true
})

export default mongoose.model("admins",  adminSchema);