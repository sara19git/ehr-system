// for define te routes and mapping them to the appropriate method
import express from "express"
import { getAllDoctors , createDoctor , updateDoctor, deleteDoctor, registerDoctor, loginDoctor, getDoctor, searchDoctors} from "../controller/doctorController.js"
import { protect } from "../middleware/authMiddleware.js";

const doctorRoute = express.Router();


//register doctor using POST method

/**
 * @swagger
 * /api/doctor/registerDoctor:
 *   post:
 *     summary: Register a new doctor
 *     tags: [Doctors]
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
 *         description: Doctor registered successfully
 *       400:
 *         description: Doctor already exists
 */
doctorRoute.post("/registerDoctor", registerDoctor);

//login doctor using POST metod

/**
 * @swagger
 * /api/doctor/loginDoctor:
 *   post:
 *     summary: login doctor
 *     tags: [Doctors]
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
 *         description: Doctor login successfully
 *       400:
 *         description: Invalid doctor data
 */
doctorRoute.post("/loginDoctor", loginDoctor);

// get doctor information using GET method

/**
 * @swagger
 * /api/doctor/getDoctor:
 *   get:
 *     summary: Retrieve the authenticated doctor's information
 *     description: This endpoint allows an authenticated doctor to fetch their personal details. Only Doctors can access this route.
 *     tags: [Doctors]
 *     security:
 *       - BearerAuth: [eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTVkMGYyYjYwZWY4OGUxN2VhNDliYyIsImlhdCI6MTc0MzExNTIzOSwiZXhwIjoxNzQ1NzA3MjM5fQ.36laYK2PI1lZ1F7nIDlVpLx33SXqqC7PYJbnSlk6ARA]
 *     responses:
 *       200:
 *         description: Successfully retrieved Doctor information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "67e5d0f2b60ef88e17ea49bc"
 *                 name:
 *                   type: string
 *                   example: "Dr. Amin"
 *                 email:
 *                   type: string
 *                   example: "amin36@gmail.com"
 *       403:
 *         description: Access denied, only doctors can access this route
 *       401:
 *         description: Unauthorized, token is missing or invalid
 */
doctorRoute.get("/getDoctor", protect, getDoctor);

//post: for inserting the data into te database

/**
 * @swagger
 * /api/doctor/createDoctor:
 *   post:
 *     summary: Create a new doctor
 *     description: This endpoint creates a new doctor record in the database.
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               licenseNumber:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               hospital:
 *                 type: string  
 *               registeredDate:
 *                 type: string  
 *               password:
 *                 type: string
 *               role:
 *                 type: string        
 *                 
 *     responses:
 *       200:
 *         description: Doctor created successfully
 *       400:
 *         description: Doctor already exists
 *       500:
 *         description: Internal Server Error
 */
doctorRoute.post("/createDoctor", createDoctor);


//get: for retreive the data from the databsae and display in the browser

/**
 * @swagger
 * /api/doctor/getAllDoctors:
 *   get:
 *     summary: Get all doctors
 *     description: Retrieve a list of all registered doctors.
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: A list of doctors
 *       404:
 *         description: No doctors found
 *       500:
 *         description: Internal Server Error
 */
doctorRoute.get("/getAllDoctors", getAllDoctors);

//put: for update Doctors

/**
 * @swagger
 * /api/doctor/updateDoctor/{id}:
 *   put:
 *     summary: Update doctor information
 *     description: Update details of an existing doctor by ID.
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the doctor to update
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
 *         description: Doctor updated successfully
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Internal Server Error
 */
doctorRoute.put("/updateDoctor/:id", updateDoctor );

//delete: for delete Doctors

/**
 * @swagger
 * /api/doctor/deleteDoctor/{id}:
 *   delete:
 *     summary: Delete a Doctor
 *     description: Remove a Doctor from the database by ID.
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the Doctor to delete
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Internal Server Error
 */
doctorRoute.delete("/deleteDoctor/:id", deleteDoctor );

//route for search about doctor

/**
 * @swagger
 * /api/doctor/searchDoctors:
 *   get:
 *     summary: Search for doctors
 *     description: Retrieve a paginated list of doctors based on search criteria (name, specialization).
 *     tags: [Doctors]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: The name of the doctor to search for
 *         schema:
 *           type: string
 *       - in: query
 *         name: specialization
 *         required: false
 *         description: The specialization of the doctor to search for
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
 *         description: A paginated list of doctors
 *       404:
 *         description: No doctors found
 *       500:
 *         description: Internal Server Error
 */
doctorRoute.get("/searchDoctors", protect, searchDoctors);

export default doctorRoute;
