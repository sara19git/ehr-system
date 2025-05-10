import { useState } from "react";
import { Link } from "react-router-dom";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <nav className="bg-white shadow-md py-3 px-6 flex justify-between items-center fixed top-0 right-0 left-0 z-50">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/medical-record.png"
            alt="Afia DZ Logo"
            className="h-10 w-10 object-contain"
          />
          <span className="text-2xl font-bold text-sky-500">Afia DZ</span>
        </Link>

        {/*  Hamburger Menu- only for small screens   */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isOpen
                    ? "M6 18L18 6M6 6l12 12" // X icon
                    : "M4 6h16M4 12h16M4 18h16" // Hamburger icon
                }
              />
            </svg>
          </button>
        </div>

        {/*  Links' list in large screens */}
        <div className="hidden md:flex gap-4 items-center">
          <Link
            to="/admin/register"
            className="text-gray-500 hover:text-gray-700 font-medium"
          >
            Admin Dashboard
          </Link>

          <Link
            to="/register"
            className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-6 border-1 shadow-md rounded"
          >
            Doctor
          </Link>

          <Link
            to="/patient/register"
            className="bg-sky-500 hover:bg-sky-700 text-white py-2 px-6 border-1 shadow-md rounded"
          >
            Patient
          </Link>
        </div>
      </nav>

      {/*   Drop down menu  in small screens  */}
      {isOpen && (
        <div className="md:hidden absolute  right-6 bg-white shadow-lg rounded-lg py-2 px-4 w-60 z-40">
          <Link
            to="/admin/register"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 py-2 hover:text-sky-500"
          >
            Admin Dashboard
          </Link>

          <Link
            to="/register"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 py-2 hover:text-sky-500 "
          >
            Doctor
          </Link>

          <Link
            to="/patient/register"
            onClick={() => setIsOpen(false)}
            className="block text-gray-700 py-2 hover:text-sky-500"
          >
            Patient
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
