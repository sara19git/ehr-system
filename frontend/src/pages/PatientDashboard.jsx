import PatientNavbar from "../components/PatientNavbar";

export default function PatientDashboard() {
  return (
    <div>
      <PatientNavbar />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-sky-500 text-center">Welcome to Patient Dashboard</h2>
        {/* محتوى لوحة التحكم */}
      </div>
    </div>
  );
}