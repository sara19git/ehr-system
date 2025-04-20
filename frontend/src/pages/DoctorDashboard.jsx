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


export default function DoctorDashboard() {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false); 

  const [openDropdownId, setOpenDropdownId] = useState(null);


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

  return (
    <div>
      <DoctorNavbar />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-500">Patient List</h2>

        {loading ? (
          <p className="text-center text-gray-500 mt-4">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-4">{error}</p>
        ) : records.length === 0 ? (
          <div className="text-center text-gray-500 mt-6">
            No medical records found. Please create a new patient record.
          </div>
        ) : (
          <table className="min-w-full bg-white shadow-md rounded overflow-hidden mt-4">
            <thead className="bg-gray-100 text-gray-500 text-left">
              <tr>
                <th className="py-2 px-4">Full Name</th>
                <th className="py-2 px-4">Age</th>
                <th className="py-2 px-4">Gender</th>
                <th className="py-2 px-4">Contacts</th>
                
                <th className="py-2 px-4">Diagnosis</th>
                <th className="py-2 px-4">Prescriptions</th>
                <th className="py-2 px-4">Notes</th>
                <th className="py-2 px-4">Hospital</th>
                <th className="py-2 px-4">Visit Date</th>
                <th className="py-2 px-4">More</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record._id} className="border-t border-gray-200">
                  <td className="py-2 px-4">{record.fullName}</td>
                  <td className="py-2 px-4">{record.age}</td>
                  <td className="py-2 px-4">{record.gender}</td>
                  <td className="py-2 px-4">{record.email} <br /> {record.phoneNumber} </td>
                  
                  <td className="py-2 px-4">{record.diagnosis}</td>
                  <td className="py-2 px-4">
                    {record.prescriptions}
                  </td>
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
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                              View Details
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                              Edit Record
                            </li>
                            <li className="px-4 py-2 hover:bg-gray-100 text-red-500 cursor-pointer">
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
