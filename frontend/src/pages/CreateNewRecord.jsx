import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function CreateNewRecord() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    email: "",
    phoneNumber: "",
    diagnosis: "",
    prescriptions: "",
    notes: "",
    hospital: "",
    visitDate: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.gender.trim()) newErrors.gender = "Gender is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required.";
    if (!formData.hospital.trim()) newErrors.hospital = "Hospital is required.";
    if (!formData.visitDate.trim()) newErrors.visitDate = "Visit date is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setMessage("Please correct the errors in the form.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized. Please log in.");
      navigate("/login");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/record/createRecord",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Record created:", response.data);
      setMessage("Medical record created successfully!");

      setFormData({
        fullName: "",
        age: "",
        gender: "",
        email: "",
        phoneNumber: "",
        diagnosis: "",
        prescriptions: "",
        notes: "",
        hospital: "",
        visitDate: "",
      });
      setErrors({});
      navigate("/dashboard");

    } catch (error) {
      console.error("Error creating record:", error.response?.data || error.message);
      setMessage("Failed to create record. Please try again.");
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg space-y-4 border">
        <Button onClick={handleBack} className="bg-sky-500 hover:bg-sky-700 text-white">
          Back
        </Button>
        <h2 className="text-2xl font-bold text-center text-sky-500">Create a Medical Record</h2>

        {["fullName", "age", "gender", "email", "phoneNumber", "diagnosis", "prescriptions", "notes", "hospital", "visitDate"].map((field) => (
          <div key={field}>
            <Label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
            <Input
              type={field === "age" ? "number" : field === "visitDate" ? "date" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${field}`}
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}

        <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-700">
          Create Record
        </Button>

        {message && <p className="text-center text-sm text-gray-700 mt-2">{message}</p>}
      </form>
    </div>
  );
}
