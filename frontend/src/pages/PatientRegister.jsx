import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function PatientRegister() {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Name required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Please select your role";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {

    try {
      const response = await axios.post(
        "http://localhost:8000/api/patient/registerPatient",
        formData
      );

      const { token } = response.data;

      // to store token in LocalStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userType", "patient");


      setMessage("Registration successful");
      console.log("Server response:", response.data);
      console.log("Token:", token);

      // Optional: reset the form
      setFormData({
        fullName: "",
        email: "",
        password: "",
        role: "",
      });

      setErrors({});
      navigate("/patient/dashboard");

    } catch (error) {
      setMessage("Registration failed");
      console.error("Error during registration:", error);
    }

  }else {
    setMessage("Please correct errors in the form.");
  }
  };



  return (
    <div className="flex items-center justify-center min-h-screen px-4 w-00 h-96">
      <form  
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4 border-1">
        <h2 className="text-2xl font-bold text-center text-sky-500 ">Patient Sign Up</h2>

        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input 
            type="text"
            name="fullName"
            id="name"
            placeholder="Enter your full name" 
            value={formData.fullName}
            onChange={handleChange}/>
            {errors.fullName && <span className="text-red-500 text-sm mt-1">{errors.fullName}</span>}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            name="email"
            id="email"
            type="email"
            placeholder="Enter your email" 
            value={formData.email}
            onChange={handleChange}/>
            {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password" 
            placeholder="Create your password" 
            value={formData.password}
            onChange={handleChange}/>
            {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
        </div>

        

        <div>
          <Label htmlFor="email">Role</Label>
          <Input 
            name="role"
            id="role"
            type="text"
            placeholder="Doctor or patient" 
            value={formData.role}
            onChange={handleChange}/>
            {errors.role && <span className="text-red-500 text-sm mt-1">{errors.role}</span>}
        </div>
        
        <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-700">
          Register
        </Button>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
        )}

        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account? <Link className="text-sky-500" to="/patient/login">Login</Link>
        </p>

      </form>
    </div>
  );
}
