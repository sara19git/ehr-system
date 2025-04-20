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

import { useEffect } from "react";


function LayoutWithNavbar() {
  const location = useLocation();

  // مسارات لا نريد فيها عرض Navbar العامة
  const hideNavbarPaths = ["/dashboard", "/patient/dashboard", "/createnewrecord"];

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/register" element={<DoctorRegister />} />
        <Route path="/login" element={<DoctorLogin />} />
        <Route path="/patient/register" element={<PatientRegister />} />
        <Route path="/patient/login" element={<PatientLogin />} />

        <Route path="/createnewrecord" element={<CreateNewRecord />} />


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
