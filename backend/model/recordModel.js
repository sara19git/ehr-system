import mongoose from "mongoose";

import patientModel from "./patientModel.js";
import doctorModel from "./doctorModel.js";

const recordSchema = new mongoose.Schema({
    doctor_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: doctorModel,
        required: true
    },
    patient_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: patientModel,
         required: true
    },
    fullName:{
        type: String,
        required: true,
    },
    age:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phoneNumber:{
        type: String,
        required: true,
    },
    diagnosis:{
        type: String,
        required: true,
    },
    prescriptions:{
        type: String,
        required: true,
    },
    testResults:{
        type: Array,
        required: false,
    },
    notes:{
        type: String,
        required: true,
    },
    hospital:{
        type: String,
        required: true,
    },
    visitDate:{
        type: String,
        required: true,
    }
},
{
    timestamps : true
})

export default mongoose.model("medical_records", recordSchema );    