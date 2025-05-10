import { Link, useLocation,  useNavigate } from "react-router-dom"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { FaBars, FaHome, FaUserInjured, FaUserMd, FaFileMedical, FaCog, FaSignOutAlt } from "react-icons/fa"
import { useState } from "react"

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard", icon: <FaHome /> },
  { name: "Manage Patients", path: "/admin/patients", icon: <FaUserInjured /> },
  { name: "Manage Doctors", path: "/admin/doctors", icon: <FaUserMd /> },
  { name: "Medical Records", path: "/admin/records", icon: <FaFileMedical /> },
  { name: "Settings", path: "/admin/settings", icon: <FaCog /> },
]

export default function Sidebar() {
  const [open, setOpen] = useState(false)
  const location = useLocation();
  const navigate = useNavigate();

  /*const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.href = "/"
  }*/

  return (
    <>
      {/* Hamburger button for mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger>
            <FaBars size={24} />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-white shadow-lg">
            <SidebarContent closeMenu={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Full sidebar for desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen bg-white shadow-md p-4 fixed">
        <div>
            <h2 className="text-sky-500 font-bold text-2xl mb-2 flex items-center gap-2">
              <img
                src="/medical-record.png"
                alt="Afia DZ Logo"
                className="h-8 w-8 object-contain"
              />
            <span className=" text-sky-500">Afia DZ</span>
            </h2>
          </div>
        <SidebarContent />
      </aside>
    </>
  )
}

function SidebarContent({ closeMenu }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("token");
        navigate("/admin/login");
      }
    };

  return (
    <nav className="flex flex-col gap-4">
      {navItems.map((item, i) => (
        <Link
          key={i}
          to={item.path}
          onClick={closeMenu}
          className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-sky-100 text-gray-700 ${
            location.pathname === item.path ? "bg-sky-200 font-semibold" : ""
          }`}
        >
          {item.icon}
          {item.name}
        </Link>
      ))}
      <button
        onClick={() => {
            if (closeMenu) closeMenu();
            setTimeout(handleLogout, 100);
          }}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-100 text-red-500 "
      >
        <FaSignOutAlt />
        Logout
      </button>
    </nav>
  )
}
