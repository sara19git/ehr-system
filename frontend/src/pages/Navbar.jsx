import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center">
      <h1 className="text-xl font-bold text-sky-500">Medical Record</h1>
      <div className="flex gap-4">
        <Link to="/register" className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-6 border-1 shadow-md rounded">
          Doctor 
        </Link>
        
        <Link to="/patient/register" className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-6 border-1 shadow-md rounded">
        Patient
        </Link>
        
        
      </div>
    </nav>
  );
}

export default Navbar;
