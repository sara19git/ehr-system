// for define te routes and mapping them to the appropriate method
import express from "express"
import { getAllDoctors , createDoctor , updateDoctor, deleteDoctor, registerDoctor, loginDoctor, getDoctor, searchDoctors} from "../controller/doctorController.js"
import { protect } from "../middleware/authMiddleware.js";

const doctorRoute = express.Router();


//register doctor using POST metod
doctorRoute.post("/registerDoctor", registerDoctor);
//login doctor using POST metod
doctorRoute.post("/loginDoctor", loginDoctor);
// get doctor information using GET method
doctorRoute.get("/getDoctor", protect, getDoctor);

//post: for inserting the data into te database
doctorRoute.post("/createDoctor", createDoctor);


//get: for retreive the data from the databsae and display in the browser
doctorRoute.get("/getAllDoctors", getAllDoctors);

//put: for update patients
doctorRoute.put("/updateDoctor/:id", updateDoctor );

//delete: for delete patients
doctorRoute.delete("/deleteDoctor/:id", deleteDoctor );

//route for search about doctor
doctorRoute.get("/searchDoctors", protect, searchDoctors);

export default doctorRoute;
