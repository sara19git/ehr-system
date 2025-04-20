import { useNavigate } from "react-router-dom";

export default function PatientNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  return (
    <nav className="bg-white text-sky-500 px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">Patient Dashboard</h1>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer">
        Logout
      </button>
    </nav>
  );
}
