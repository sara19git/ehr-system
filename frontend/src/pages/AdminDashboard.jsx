import { useEffect, useState } from 'react'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { FaUserInjured, FaUserMd, FaFileMedical } from 'react-icons/fa'
import Sidebar from "../components/Sidebar"
import AdminNavbar from "../components/AdminNavbar"
import AlgeriaMap from '../components/AlgeriaMap';


export default function AdminDashboard() {
  const [stats, setStats] = useState(null)

  const COLORS = ["#03A791", "#4ED7F1", "#FFB22C", "#EF88AD", "#A0C878"];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:8000/api/admin/statistics', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        setStats(data)
      } catch (err) {
        console.error('Error fetching statistics', err)
      }
    }

    fetchStats()
  }, [])

  if (!stats) return <p>Loading...</p>

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 md:ml-64">
        <AdminNavbar />
    <main className="p-6 mt-15 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">Overview</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 mb-8 ">
        <StatCard 
        label="Total Patients" 
        value={stats.totalPatients}
        icon={<FaUserInjured size={24} className="text-white" />}
        iconBg="bg-green-400" 
        cardColor="bg-green-100"
       />

        <StatCard 
        label="Total Doctors" 
        value={stats.totalDoctors} 
        icon={<FaUserMd size={24} className="text-white" />}
        iconBg="bg-blue-400"
        cardColor="bg-blue-100"
        />

        <StatCard 
        label="Total Records" 
        value={stats.totalRecords}
        icon={<FaFileMedical size={24} className="text-white" />}
        iconBg="bg-pink-400" 
        cardColor="bg-pink-100"
       />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* Bar Chart for Top Diagnoses */}
      <div className="bg-white p-4 rounded-xl shadow-lg ">
        <h3 className="text-xl font-semibold mb-4">Top 5 Most Diagnosed Diseases</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.topDiagnoses.map(d => ({ name: d._id, count: d.count }))}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count">
              {stats.topDiagnoses.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <AlgeriaMap />
      </div>
    </main>
    </div>
   </div>
  )
}

function StatCard({ label, value, icon, iconBg, cardColor, width = "w-full", height = "h-32" }) {
  return (
    <div className={`rounded-xl shadow ${cardColor} ${width} ${height} p-4 flex items-center gap-4`}>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  )
}
