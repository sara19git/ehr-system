import { FaUserCircle } from "react-icons/fa"
import { useLocation } from "react-router-dom"

export default function AdminNavbar() {
  const location = useLocation()

  // the title of the page as the path
  const getTitle = () => {
    if (location.pathname.includes("/dashboard")) return "Dashboard"
    if (location.pathname.includes("/patients")) return "Manage Patients"
    if (location.pathname.includes("/doctors")) return "Manage Doctors"
    if (location.pathname.includes("/records")) return "Medical Records"
    if (location.pathname.includes("/settings")) return "Settings"
    return "Admin Panel"
  }

  return (
    <header className="fixed top-0 left-0 w-full md:ml-64 h-14 bg-white shadow-sm border-b flex items-center justify-between px-4 z-40">
      <h1 className="text-lg font-semibold text-sky-600">{getTitle()}</h1>
      <div className="flex items-center gap-2">
        <FaUserCircle size={22} className="text-gray-600" />
        <span className="text-sm text-gray-700">Admin</span>
      </div>
    </header>
  )
}
