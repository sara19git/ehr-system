import express from "express"
import { getAllAdmins , createAdmin, updateAdmin, deleteAdmin, registerAdmin, loginAdmin, getAdmin } from "../controller/adminController.js"
import { protect } from "../middleware/authMiddleware.js";

const adminRoute = express.Router();

//register admin using POST metod
adminRoute.post("/registerAdmin", registerAdmin);
//login admin using POST metod
adminRoute.post("/loginAdmin", loginAdmin);
// get admin information using GET method
adminRoute.get("/getAdmin", protect, getAdmin);



adminRoute.post("/createAdmin", createAdmin);

adminRoute.get("/getAllAdmins", getAllAdmins);

adminRoute.put("/updateAdmin/:id", updateAdmin);

adminRoute.delete("/deleteAdmin/:id", deleteAdmin);


export default adminRoute;