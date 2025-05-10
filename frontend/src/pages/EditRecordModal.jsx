import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function EditRecordModal({ isOpen, onClose, record, onUpdate }) {
    const [formData, setFormData] = useState({
        diagnosis: record?.diagnosis || "",
        prescriptions: record?.prescriptions || "",
        notes: record?.notes || "",
        hospital: record?.hospital || "",
        visitDate: record?.visitDate?.slice(0, 10) || "",
      });
      

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/record/updateRecord/${record._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      onUpdate(response.data); // callback to parent
      onClose();
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update record.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-sky-500">Edit Medical Record</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700">Diagnosis</Label>
            <Input
              type="text"
              name="diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">Prescriptions</Label>
            <Input
              type="text"
              name="prescriptions"
              value={formData.prescriptions}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">Notes</Label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">Hospital</Label>
            <Input
              type="text"
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <Label className="block text-sm font-medium text-gray-700">Visit Date</Label>
            <Input
              type="date"
              name="visitDate"
              value={formData.visitDate}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-500"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
