import { useState } from "react";
import axios from "axios";
import { Link, useNavigate  } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FormInput from "../components/FormInput";


export default function DoctorRegister() {
  ;

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
        "http://localhost:8000/api/doctor/registerDoctor",
        formData
      );

      const { token } = response.data;

      // to store token in LocalStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userType", "doctor");

      toast.success("Registration successful!");

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
      navigate("/dashboard");

    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error("Error during registration:", error);
    }

  }else {
    toast.warning("Please correct errors in the form.");

  }
  };



  return (
    <div className="flex items-center justify-center min-h-screen px-4 w-00 h-96 mt-10">
      <form  
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4 border-1">
        <h2 className="text-2xl font-bold text-center text-sky-500 ">Doctor Sign Up</h2>

        <div>
          <FormInput
            label="Full Name"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            error={errors.fullName}
          />
        </div>

        <div>
          <FormInput
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
        </div>

        <div>
          <FormInput
            label="Password"
            name="password"
            type="password"
            placeholder="Create your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
        </div>

        

        <div>
         <FormInput
            label="Role"
            name="role"
            placeholder="Doctor or patient"
            value={formData.role}
            onChange={handleChange}
            error={errors.role}
          />
        </div>
        
        <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-700">
          Register
        </Button>

        

        <p className="text-center text-sm text-gray-600 mt-3">
          Already have an account? <Link className="text-sky-500" to="/login">Login</Link>
        </p>

      </form>
    </div>
  );
}
