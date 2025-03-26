import express from "express"
import {createRecord , getAllRecords , updateRecord , deleteRecord} from "../controller/recordController.js"
import { protect, checkDoctor } from "../middleware/authMiddleware.js";

const recordRoute = express.Router();

recordRoute.post("/createRecord", protect, checkDoctor, createRecord);

recordRoute.get("/getAllRecords", protect, checkDoctor, getAllRecords);

recordRoute.put("/updateRecord/:id", protect, checkDoctor, updateRecord );

recordRoute.delete("/deleteRecord/:id", protect, checkDoctor, deleteRecord );

export default recordRoute;