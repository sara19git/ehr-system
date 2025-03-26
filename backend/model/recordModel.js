import mongoose from "mongoose";

import patientModel from "./patientModel.js";
import doctorModel from "./doctorModel.js";

const recordSchema = new mongoose.Schema({
    doctor_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: doctorModel 
    },
    patient_id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: patientModel
    },
    diagnosis:{
        type: String,
        required: true,
    },
    prescriptions:{
        type: Array,
        required: true,
    },
    testResults:{
        type: Array,
        required: true,
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