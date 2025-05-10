import express from "express"
import { getAllPatients , createPatient , updatePatient, deletePatient , registerPatient, loginPatient, getPatient, searchPatients} from "../controller/patientController.js"
import { protect } from "../middleware/authMiddleware.js";
const patientRoute = express.Router();



//http://localhost:8000/api-docs swagger UI 

//register patient using POST metod and documenting the api using swagger

/**
 * @swagger
 * /api/patient/registerPatient:
 *   post:
 *     summary: Register a new patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient registered successfully
 *       400:
 *         description: Patient already exists
 */
patientRoute.post("/registerPatient", registerPatient);


//login patient using POST metod and documenting the api using swagger
/**
 * @swagger
 * /api/patient/loginPatient:
 *   post:
 *     summary: login patient
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient login successfully
 *       400:
 *         description: Invalid patient data
 */
patientRoute.post("/loginPatient", loginPatient);


// get patient information using GET method
/**
 * @swagger
 * /api/patient/getPatient:
 *   get:
 *     summary: Retrieve the authenticated patient's information
 *     description: This endpoint allows an authenticated patient to fetch their personal details. Only patients can access this route.
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved patient information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "67e2b5ee33e1bbcec5c3ba02"
 *                 name:
 *                   type: string
 *                   example: "Sami"
 *                 email:
 *                   type: string
 *                   example: "sami1gmail.com"
 *       403:
 *         description: Access denied, only patients can access this route
 *       401:
 *         description: Unauthorized, token is missing or invalid
 */
patientRoute.get("/getPatient", protect, getPatient);

//post: for inserting the data into te database
/**
 * @swagger
 * /api/patient/createPatient:
 *   post:
 *     summary: Create a new patient
 *     description: This endpoint creates a new patient record in the database.
 *     tags: [Patients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *               bloodType:
 *                 type: string
 *               phone:
 *                 type: string   
 *               email:
 *                 type: string
 *               address:
 *                 type: string        
 *               password:
 *                 type: string
 *               registeredDate:
 *                 type: string   
 *     responses:
 *       200:
 *         description: Patient created successfully
 *       400:
 *         description: Patient already exists
 *       500:
 *         description: Internal Server Error
 */
patientRoute.post("/createPatient", createPatient);

//get: for retreive the data from the databsae and display in the browser
/**
 * @swagger
 * /api/patient/getAllPatients:
 *   get:
 *     summary: Get all patients
 *     description: Retrieve a list of all registered patients.
 *     tags: [Patients]
 *     responses:
 *       200:
 *         description: A list of patients
 *       404:
 *         description: No patients found
 *       500:
 *         description: Internal Server Error
 */
patientRoute.get("/getAllPatients", getAllPatients);

//put: for update patients
/**
 * @swagger
 * /api/patient/updatePatient/{id}:
 *   put:
 *     summary: Update patient information
 *     description: Update details of an existing patient by ID.
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the patient to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Patient updated successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal Server Error
 */
patientRoute.put("/updatePatient/:id", updatePatient );

//delete: for delete patients
/**
 * @swagger
 * /api/patient/deletePatient/{id}:
 *   delete:
 *     summary: Delete a patient
 *     description: Remove a patient from the database by ID.
 *     tags: [Patients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the patient to delete
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Patient deleted successfully
 *       404:
 *         description: Patient not found
 *       500:
 *         description: Internal Server Error
 */
patientRoute.delete("/deletePatient/:id", deletePatient );

//route for searching about patients
/**
 * @swagger
 * /api/patient/searchPatients:
 *   get:
 *     summary: Search for patients
 *     description: Retrieve a paginated list of patients based on search criteria (name, email, or national ID).
 *     tags: [Patients]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: The name of the patient to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: email
 *         required: false
 *         description: The email of the patient to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: nationalId
 *         required: false
 *         description: The national ID of the patient to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number for pagination (default is 1)
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of results per page (default is 10)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A paginated list of patients
 *       404:
 *         description: No patients found
 *       500:
 *         description: Internal Server Error
 */
patientRoute.get("/searchPatients", protect, searchPatients);





export default patientRoute;