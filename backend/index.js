import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import patientRoute from "./routes/patientRoute.js";
import doctorRoute from "./routes/doctorRoute.js";
import adminRoute from "./routes/adminRoute.js";
import recordRoute from "./routes/recordRoute.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import swaggerDocs from "./config/swagger.js";



//Inialize express app
const app = express();

//Middleware for parsing JSON Request
app.use(bodyParser.json());

app.use(cors());

swaggerDocs(app);

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGURL = process.env.MONGO_URL ;

// Connect express app with mongoDB DataBase Using mongoose 
mongoose.connect(MONGURL).then(()=>{
    console.log("DataBases is connectd successfully!")
    app.listen(PORT, ()=>{
        console.log("Server is running on PORT :", PORT);
    })
}).catch((error)=>{
    console.error("Database connection error:", error);
    process.exit(1);
    
});

// using the routes
app.use("/api/patient", patientRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/admin", adminRoute);
app.use("/api/record", recordRoute);


app.use(errorHandler);
