import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import FormInput from "../components/FormInput";

export default function AdminLogin () {

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
    toast.warning("Please correct errors in the form.");
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost:8000/api/admin/loginAdmin",
      formData
    );

    const { token } = response.data;

    // to store token in LocalStorage
    localStorage.setItem("token", token);
    localStorage.setItem("userType", "doctor");

    toast.success("Login successful!");
    console.log("Token:", token);

    setErrors({});

    navigate("/admin/dashboard");

  } catch (error) {
    toast.error("Login failed. Check your credentials.");
    console.error("Login error:", error);
  }
};

  return (
    <div className="flex items-center justify-center min-h-screen px-4 w-00 h-96 ">
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-4 border-1 ">
        <h2 className="text-2xl font-bold text-center text-sky-500 ">Admin Log In</h2>
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

        <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-700">
          Login
        </Button>

        

        </form>

    </div>
  );
};


