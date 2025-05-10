import express from "express"
import {createRecord , getAllRecords , updateRecord , deleteRecord, patientRecord, getPatientHistory} from "../controller/recordController.js"
import { protect, checkDoctor, checkPatient } from "../middleware/authMiddleware.js";

const recordRoute = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @swagger
 * /api/record/createRecord:
 *   post:
 *     summary: Create a new medical record
 *     description: Allows doctors to create a new patient record.
 *     tags: [Records]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully created record
 *       403:
 *         description: Access denied, only doctors can create records
 *       401:
 *         description: Unauthorized, token is missing or invalid
 */
recordRoute.post("/createRecord", protect, checkDoctor, createRecord);

/**
 * @swagger
 * /api/record/getAllRecords:
 *   get:
 *     summary: Retrieve all medical records
 *     description: Allows doctors to view all records.
 *     tags: [Records]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved records
 *       403:
 *         description: Access denied, only doctors can view records
 *       401:
 *         description: Unauthorized, token is missing or invalid
 */
recordRoute.get("/getAllRecords", protect, checkDoctor, getAllRecords);

/**
 * @swagger
 * /api/record/updateRecord/{id}:
 *   put:
 *     summary: Update a medical record
 *     description: Allows doctors to update an existing patient record.
 *     tags: [Records]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID to update
 *     responses:
 *       201:
 *         description: Successfully updated record
 *       403:
 *         description: Access denied, only doctors can update records
 *       401:
 *         description: Unauthorized, token is missing or invalid
 */
recordRoute.put("/updateRecord/:id", protect, checkDoctor, updateRecord );

/**
 * @swagger
 * /api/record/deleteRecord/{id}:
 *   delete:
 *     summary: Delete a medical record
 *     description: Allows doctors to delete an existing patient record.
 *     tags: [Records]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Record ID to delete
 *     responses:
 *       201:
 *         description: Successfully deleted record
 *       403:
 *         description: Access denied, only doctors can delete records
 *       401:
 *         description: Unauthorized, token is missing or invalid
 */
recordRoute.delete("/deleteRecord/:id", protect, checkDoctor, deleteRecord );

//router.get("/myrecord", protect, getPatientMedicalRecord);

recordRoute.get("/patientRecord", protect, checkPatient, patientRecord);
recordRoute.get("/patient/history", protect, checkPatient, getPatientHistory);
  
export default recordRoute;