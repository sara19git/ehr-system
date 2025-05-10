import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Patient from "../model/patientModel.js";
import Doctor from "../model/doctorModel.js";
import Admin from "../model/adminModel.js";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from the headers
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Search for the user from the database (Even Doctor, Patient or admin)
            let user = await Patient.findById(decoded.id).select("-password") ||
                       await Doctor.findById(decoded.id).select("-password") ||
                       await Admin.findById(decoded.id).select("-password");

            if (!user) {
                res.status(401);
                throw new Error("Not authorized, user not found");
            }

            req.user = user; // تخزين بيانات المستخدم في الطلب
            next();
        } catch (error) {
            next(new Error("Not authorized, token failed"));
        }
    } else {
        next(new Error("Not authorized, no token"));
    }
});


export const checkDoctor = asyncHandler(async(req, res, next) => {
    if (!req.user || req.user.role !== "doctor") {
        return res.status(403).json({ message: "Access denied, only doctors can perform this action" });
    }
    next();
});

export const checkPatient = (req, res, next) => {
    if (req.user && req.user.role === "patient") {
      next();
    } else {
      res.status(403).json({ message: "Access denied: patients only" });
    }
  };


  export const protectAdmin = asyncHandler(async (req, res, next) => {
    let token;
  
    if (
      req.headers.authorization && 
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];
  
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await Admin.findById(decoded.id).select("-password");
  
        if (!admin) {
          return res.status(401).json({ message: "Admin not found" });
        }
  
        req.admin = admin;
        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Not authorized, token failed" });
      }
    } else {
      res.status(401).json({ message: "Not authorized, no token" });
    }
  });
  