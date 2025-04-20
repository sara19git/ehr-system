import { useNavigate } from "react-router-dom";

export default function DoctorNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/login");
  };

  const handleCreateRecord = () => {
    navigate("/createnewrecord"); 
  };

  return (
    <nav className="bg-white text-sky-500 px-6 py-4 flex justify-between items-center shadow-md">
      
      <h1 className="text-lg font-bold"></h1>
      <div className="flex justify-between items-center gap-4 ">
      <button
          onClick={handleCreateRecord}
          className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition cursor-pointer">
          Create New Record
        </button>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition cursor-pointer">
        Logout
      </button>
      </div>
      
    </nav>
  );
}
