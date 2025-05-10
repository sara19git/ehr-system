import DoctorNavbar from "../components/DoctorNavbar";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import EditRecordModal from "./EditRecordModal";


export default function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isEditOpen, setEditOpen] = useState(false);


  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found. Please log in again.");
        return;
      }

      const response = await axios.get("http://localhost:8000/api/record/getAllRecords", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRecords(response.data);
      setError(null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching records:", error);
      setError("Failed to fetch records.");
      setLoading(false);
    }
  };

  // handle edit records click 
  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setEditOpen(true);
  };

  //after updtae, edit records
  const handleUpdateRecord = (updatedRecord) => {
    setRecords((prev) =>
      prev.map((rec) => (rec._id === updatedRecord._id ? updatedRecord : rec))
    );
  };

  return (
    <div>
      <DoctorNavbar />
      <div className="p-6  overflow-x-auto">
        <h2 className="text-xl font-bold text-gray-500">Patient's Medical Records List</h2>

        {loading ? (
      <p className="text-center text-gray-500 mt-4">Loading...</p>
    ) : error ? (
      <p className="text-center text-red-500 mt-4">{error}</p>
    ) : records.length === 0 ? (
      <div className="text-center text-gray-500 mt-6">
        No medical records found. Please create a new patient record.
      </div>
    ) : (
      <>
        {/* Table for medium and large screens */}
        <div className="hidden md:block overflow-x-auto mt-4 shadow-md rounded">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead className="bg-gray-100 text-gray-500 text-left">
              <tr>
                <th className="py-2 px-4">Full Name</th>
                <th className="py-2 px-4">Age</th>
                <th className="py-2 px-4">Gender</th>
                <th className="py-2 px-4">Contacts</th>
                <th className="py-2 px-4">Diagnosis</th>
                <th className="py-2 px-4">Medications Prescribed</th>
                <th className="py-2 px-4">Doctor's Notes</th>
                <th className="py-2 px-4">Hospital</th>
                <th className="py-2 px-4">Visit Date</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id} className="border-t border-gray-200">
                  <td className="py-2 px-4">{record.fullName}</td>
                  <td className="py-2 px-4">{record.age}</td>
                  <td className="py-2 px-4">{record.gender}</td>
                  <td className="py-2 px-4">{record.email}<br />{record.phoneNumber}</td>
                  <td className="py-2 px-4">{record.diagnosis}</td>
                  <td className="py-2 px-4">{record.prescriptions}</td>
                  <td className="py-2 px-4">{record.notes}</td>
                  <td className="py-2 px-4">{record.hospital}</td>
                  <td className="py-2 px-4">{record.visitDate?.slice(0, 10)}</td>
                  <td className="py-2 px-4 relative">
                    <button
                      className="text-gray-500 font-bold hover:bg-gray-100 rounded-lg px-3 py-1 cursor-pointer"
                      onClick={() =>
                        setOpenDropdownId(openDropdownId === record._id ? null : record._id)
                      }
                    >
                      ...
                    </button>

                    {openDropdownId === record._id && (
                      <div className="fixed right-10 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                        <ul className="py-1">
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">View Details</li>
                          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleEditClick(record)}>Edit Record</li>
                          <li className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer">Delete</li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards for small screens */}
        <div className="block md:hidden space-y-4 mt-6">
          {records.map((record) => (
            <div key={record._id} className="bg-white shadow rounded-lg p-4 text-sm">
              <p><strong>Full Name:</strong> {record.fullName}</p>
              <p><strong>Age:</strong> {record.age}</p>
              <p><strong>Gender:</strong> {record.gender}</p>
              <p><strong>Email:</strong> {record.email}</p>
              <p><strong>Phone:</strong> {record.phoneNumber}</p>
              <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p><strong>Medications Prescribed:</strong> {record.prescriptions}</p>
              <p><strong>Doctor's Notes:</strong> {record.notes}</p>
              <p><strong>Hospital:</strong> {record.hospital}</p>
              <p><strong>Visit Date:</strong> {record.visitDate?.slice(0, 10)}</p>
              <button
                onClick={() => handleEditClick(record)}
                className="mt-2 text-blue-500 underline"
              >
                Edit Record
              </button>
            </div>
          ))}
        </div>
      </>
    )}
  </div>

  <EditRecordModal
    isOpen={isEditOpen}
    onClose={() => setEditOpen(false)}
    record={selectedRecord}
    onUpdate={handleUpdateRecord}
  />
</div>
  );
}
