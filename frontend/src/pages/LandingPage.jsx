import Navbar from "./Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";



export default function LandingPage (){
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-12 py-10 md:py-20 mt-20">
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-6  text-black leading-snug">
            We Help you Store <br /> Your Medical <br /> Information securely
          </h1>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            Manage Your Patients' Medical Records Effortlessly <br />
            A simple and secure way to store, track, and manage <br /> medical records from anywhere.
          </p>
        </div>
        <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center ">
          <div className="bg-sky-500 rounded-full w-100 h-100 sm:w-72 sm:h-72 md:w-100 md:h-100 flex items-end justify-center overflow-hidden ">
            <img
              src="/photo.png"
              alt="Doctor Illustration"
              className="h-full object-cover "
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-12 py-10 md:py-20 bg-sky-100">
      <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center ">
        <div className="bg-sky-500 rounded-full w-62 h-62 sm:w-72 sm:h-72 md:w-70 md:h-70 flex items-end justify-center overflow-hidden ">
          <img
            src="/photo1.png"
            alt="Group of Doctors Illustration"
            className=" h-full object-cover  "
          />
        </div>
      </div>
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-black">About us</h2>
          <p className="text-gray-500 text-base md:text-lg leading-relaxed">
            We are a team committed to modernizing healthcare by providing a secure and accessible platform
            for storing and managing medical records. Our goal is to empower both doctors and patients with
            the tools they need to access and share medical data efficiently, anytime and anywhere. This platform
            is a step toward building a national digital record system that improves the quality and continuity of care.
          </p>
          <Link to="/about">
            <Button className="bg-sky-500 hover:bg-sky-700 text-white px-6 rounded">
              See More
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-8 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-sky-500 font-bold text-lg mb-2 flex items-center gap-3">
              <img
                src="/medical-record.png"
                alt="Afia DZ Logo"
                className="h-8 w-8 object-contain"
              />
            <span className=" text-sky-500">Afia DZ</span>
            </h3>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Quick links</h4>
            <ul className="text-gray-200 space-y-1">
              <li><Link to="/about" className="hover:text-gray-500">About Us</Link></li>
              <li><Link to="/register" className="hover:text-gray-500">Doctor</Link></li>
              <li><Link to="/patient/register" className="hover:text-gray-500">Patient</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Contact</h4>
            <ul className="text-gray-200 space-y-1">
              <li className="hover:text-gray-500">📞 +213000-000-000</li>
              <li className="hover:text-gray-500">📧 info@gmail.com</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}