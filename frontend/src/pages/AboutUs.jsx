import Navbar from "./Navbar";

export default function AboutUs() {
  return (
    <div>
      <Navbar />
      <div className="p-8 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-sky-500 mt-20 mb-6 text-center">About Us</h1>
        <p className="max-w-3xl mx-auto text-gray-700 text-lg leading-7">
          Our platform was built with the aim of making medical Record management easier and more secure.
          We believe that digital health records should be accessible, reliable, and safe for both doctors and patients and all parties and health institutions.
          <br /><br />
          With this platform, medical professionals can create, update, and view patient records in one place,
          while patients can trust that their personal health data is handled with care and privacy.
          <br /><br />
          This platform is part of a broader initiative to build a national medical information system that bridges the gap
          between patients and healthcare providers using modern web technologies.
        </p>
      </div>
      
    </div>
  );
}
