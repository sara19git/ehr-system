import Record from "../model/recordModel.js"
import asyncHandler from "express-async-handler";


export const createRecord = asyncHandler(async(req, res)=> {
    try {

        if (req.user.role !== "doctor") {
            return res.status(403).json({ message: "Access denied, only doctors can create records" });
        }

        const recordData = new Record({
            ...req.body,
            doctor_id: req.user._id 
          });
        const{_id} = recordData;

        const recordExist = await Record.findOne({_id})
        if(recordExist){
            return res.status(400).json({message:"Record already exist"})
        }
        const savedRecord = await recordData.save();
        res.status(200).json(savedRecord);
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

export const getAllRecords = asyncHandler(async(req, res)=> {
    try {

        if (req.user.role !== "doctor") {
            return res.status(403).json({ message: "Access denied, only doctors can view records" });
        }

        const records = await Record.find({ doctor_id: req.user._id });

        // if the data base is empty
        if(records.length === 0){
            return res.status(404).json({message: "Record Not Found"})

        }
        // if there are a record
        res.status(200).json(records);
        
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
        
    }
});

export const updateRecord = asyncHandler( async(req, res)=>{
    try {

        if (req.user.role !== "doctor") {
            return res.status(403).json({ message: "Access denied, only doctors can update records" });
        }

        const id =req.params.id;
        const recordExist = await Record.findOne({_id:id})
        if(!recordExist){
            return res.status(404).json({message: "Record Not Found"})
        }
        const updateRecord = await Record.findByIdAndUpdate(id, req.body, {new:true, runValidators: true});
        res.status(201).json(updateRecord);

        
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
        
    }

});


export const deleteRecord = asyncHandler(async(req, res)=>{
    try {

        if (req.user.role !== "doctor") {
            return res.status(403).json({ message: "Access denied, only doctors can delete records" });
        }

        const id =req.params.id;
        const recordExist = await Record.findOne({_id:id})
        if(!recordExist){
            return res.status(404).json({message: "Record Not Found"})
        }

        await Record.findByIdAndDelete(id);
        res.status(201).json({message: "Record deleted successfully"})
        
    } catch (error) {
        console.error(" Error in create function:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});



