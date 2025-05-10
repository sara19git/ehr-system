import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import DoctorRegister from "./pages/DoctorRegister";
import DoctorLogin from "./pages/DoctorLogin";
import PatientRegister from "./pages/PatientRegister";
import PatientLogin from "./pages/PatientLogin";
import Navbar from "./pages/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import DoctorDashboard from "./pages/DoctorDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import CreateNewRecord from "./pages/CreateNewRecord";
import LandingPage from "./pages/LandingPage";
import AboutUs from "./pages/AboutUs"; 
import { Toaster } from "@/components/ui/sonner";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard"


import { useEffect } from "react";


function LayoutWithNavbar() {
  const location = useLocation();

  const hideNavbarPaths = ["/dashboard", "/patient/dashboard", "/createnewrecord", "/admin/dashboard"];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
     <Toaster position="top-right" richColors/>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<DoctorRegister />} />
        <Route path="/login" element={<DoctorLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/patient/login" element={<PatientLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/createnewrecord"
         element={
         <PrivateRoute allowedUserType="doctor">
           <CreateNewRecord />
         </PrivateRoute>
         } 
        />
        <Route path="/about" element={<AboutUs />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedUserType="doctor">
              <DoctorDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patient/dashboard"
          element={
            <PrivateRoute allowedUserType="patient">
              <PatientDashboard />
            </PrivateRoute>
          }
        />

        <Route path="/admin/dashboard" 
        element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          } 
        />
        
        
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <LayoutWithNavbar />
    </Router>
  );
}

export default App;
