import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


export default function PatientLogin () {

const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const [message, setMessage] = useState("");
const [errors, setErrors] = useState({});  
const navigate = useNavigate();

const validate = () => {
  const newErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = "Please enter your email.";
  }

  if (!formData.password.trim()) {
    newErrors.password = "Please enter your password.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};



const handleChange = (e) => {
  setFormData({ 
    ...formData, 
    [e.target.name]: e.target.value 
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validate()) {
    setMessage("Please correct errors in the form.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/api/patient/loginPatient",
      formData
    );

    const { token } = response.data;

    // to store token in LocalStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userType", "patient");

    setMessage("Login successful!");
    console.log("Token:", token);

    setErrors({});

    navigate("/patient/dashboard");

  } catch (error) {
    setMessage("Login failed. Check your credentials.");
    console.error("Login error:", error);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen px-4 w-00 h-96 ">
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4 border-1 ">
        <h2 className="text-2xl font-bold text-center text-sky-500 ">Patient Log In</h2>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            name="email"
            id="email" 
            type="email" 
            placeholder="Enter your email" 
            value={formData.email}
            onChange={handleChange}/>
            {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
          id="password" 
          type="password" 
          name="password"
          placeholder="Create your password"
          value={formData.password}
          onChange={handleChange} />
          {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-700">
          Login
        </Button>

        {message && (
          <p className="text-center text-sm text-gray-600 mt-2">{message}</p>
        )}

        </form>

    </div>
  );
};


