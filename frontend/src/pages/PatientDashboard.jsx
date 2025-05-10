import axios from "axios";
import { useEffect, useState } from "react";
import PatientNavbar from "../components/PatientNavbar";

export default function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("general");
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("https://via.placeholder.com/100");

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [historyError, setHistoryError] = useState("");



  useEffect(() => {
    const fetchPatientData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        const [recordRes, historyRes] = await Promise.all([
          axios.get("http://localhost:8000/api/record/patientRecord", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/record/patient/history", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
  
        setPatient(recordRes.data);
        setMedicalHistory(historyRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load patient record.");
        setHistoryError("Failed to load medical history.");
      }
    };
  
    fetchPatientData();
  }, []);
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };
  


  return (
      <>
        <PatientNavbar />
    
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow py-8 px-4 sm:px-8 mt-10 border">
    
          
          {!patient ? (
            <div className="text-center text-gray-500 mt-10">
              {error || "Loading..."}
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-4 pt-5">
                  <div className="relative">
                    <img
                      src={imageUrl}
                      alt="Patient"
                      className="w-24 h-24 rounded-full object-cover border bg-gray-300"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute top-0 left-0 w-24 h-24 opacity-0 cursor-pointer"
                      title="Upload image"
                    />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Patient Fullname</p>
                    <h2 className="text-2xl font-bold text-black">{patient.fullName}</h2>
                  </div>
                </div>

              {/* Tabs */}
              <div className="flex gap-4 mt-6 border-b overflow-x-auto">
                <button
                  onClick={() => setActiveTab("general")}
                  className={`py-2 px-4 font-medium ${
                    activeTab === "general"
                      ? "border-b-2 border-sky-500 text-sky-500"
                      : "text-gray-500"
                  }`}
                >
                  General Information
                </button>
                <button
                  onClick={() => setActiveTab("medical")}
                  className={`py-2 px-4 font-medium ${
                    activeTab === "medical"
                      ? "border-b-2 border-sky-500 text-sky-500"
                      : "text-gray-500"
                  }`}
                >
                  Medical History
                </button>
              </div>
    
              {/* Content */}
              <div className="mt-6">
                {activeTab === "general" && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                    <div>
                      <span className="font-semibold">Full Name:</span> {patient.fullName}
                    </div>
                    <div>
                      <span className="font-semibold">Age:</span> {patient.age}
                    </div>
                    <div>
                      <span className="font-semibold">Gender:</span> {patient.gender}
                    </div>
                    <div>
                      <span className="font-semibold">Phone Number:</span> {patient.phoneNumber}
                    </div>
                    <div>
                      <span className="font-semibold">Email:</span> {patient.email}
                    </div>
                    <div>
                      <span className="font-semibold">Registered on:</span>{" "}
                      {patient.createdAt?.slice(0, 10)}
                    </div>
                  </div>
                )}
    
                {activeTab === "medical" && (
              <>
                {medicalHistory.length === 0 ? (
                  <div className="text-center text-gray-400 mt-10">
                    {historyError || "No medical records found."}
                  </div>
                ) : (
                  <div className="overflow-x-auto mt-6">
                    <table className="min-w-full border text-sm text-gray-700">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-2 border">Visit Date</th>
                          <th className="px-4 py-2 border">Diagnosis</th>
                          <th className="px-4 py-2 border">Prescriptions</th>
                          <th className="px-4 py-2 border">Note</th>
                          <th className="px-4 py-2 border">Hospital</th>
                          <th className="px-4 py-2 border">Doctor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicalHistory.map((record) => (
                          <tr key={record._id}>
                            <td className="px-4 py-2 border">{record.visitDate}</td>
                            <td className="px-4 py-2 border">{record.diagnosis}</td>
                            <td className="px-4 py-2 border">{record.prescriptions}</td>
                            <td className="px-4 py-2 border">{record.notes}</td>
                            <td className="px-4 py-2 border">{record.hospital}</td>
                            <td className="px-4 py-2 border">{record.doctor_id?.fullName}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

              </div>
            </>
          )}
        </div>
      </>
    );
    
}