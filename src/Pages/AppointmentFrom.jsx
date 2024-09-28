import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useAuth } from '../context/authContext';
import { Link, useNavigate } from 'react-router-dom';

// Custom Option component to include doctor images
const DoctorOption = ({ data, innerProps }) => (
  <div {...innerProps} className="flex items-center p-2 cursor-pointer hover:bg-gray-700">
    {/* Doctor Image */}
    <img
      src={data.imageUrl}
      alt={data.name}
      className="w-8 h-8 rounded-full mr-3"
    />
    {/* Doctor Name and Specialization */}
    <div>
      <p className="text-white font-semibold">{data.name}</p>
      <p className="text-gray-400 text-sm">{data.specialization}</p>
    </div>
  </div>
);

const AppointmentForm = () => {
  const {user} = useAuth()
  console.log(user)
  const [doctor, setDoctor] = useState(null); // Store selected doctor
  const [Doctordata, setDoctorData] = useState([]); // Array of doctor data
  const [reason, setReason] = useState(''); // Reason for the appointment
  const [comments, setComments] = useState(''); // Additional comments
  const [Date, setAppointmentDate] = useState(''); // Appointment date
  const [Time, setTime] = useState(''); // Appointment time

  // Fetch doctor data on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:1042/doctors");
        if (!response.ok) throw new Error("Failed to fetch doctors");

        const data = await response.json();
        setDoctorData(Array.isArray(data) ? data : Object.values(data));
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctors();
  }, []);

  // Custom styles for react-select using Tailwind classes
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'rgb(55, 65, 81)', // Tailwind color: bg-gray-700
      borderColor: 'rgb(113, 128, 150)', // Tailwind color: border-gray-600
      boxShadow: 'none',
      '&:hover': {
        borderColor: 'rgb(156, 163, 175)', // Tailwind color: border-gray-400
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'rgb(74, 85, 104)' : 'rgb(55, 65, 81)', // Tailwind colors
      color: 'white',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgb(55, 65, 81)', // Tailwind color: bg-gray-700
    }),
  };

  // Map doctor data to be used in react-select
  const doctorOptions = Doctordata[0]?.map((doc) => ({
    value: doc.id,
    label: `${doc.name} - ${doc.specialization}`, // Display doctor name and specialization
    imageUrl: doc.photo, // Assuming your data includes image URLs
    name: doc.name,
    specialization: doc.specialization,
  }));
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      doctor,
      reason,
      comments,
      Date,
      Time, // Include appointment time
    });
    const DoctorName = doctor.name
    const PateintName = user.name
    const PateintNumber = user.phone
    const res = await fetch("http://localhost:1042/user/appoint-user", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({PateintName , PateintNumber , DoctorName, reason, comments, Date, Time }) // Send time data
    })
   if(res.ok){
    alert("appointment successfull")
    navigate(`/success/${DoctorName}?${Date}#${Time}`)
    
   }
  };
  if(!user){
    return (
      <>
      <div className='flex h-[100vh] text-white bg-gray-900 justify-center items-center flex-col gap-4'>
        Please Register!!!!!!!!!!!!!!!
        <Link to={"/register"} className='bg-green-900 rounded-xl p-3 text-white'>Register</Link>
        </div></>
    )
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center p-4">
      <div className="rounded-lg shadow-lg gap-10 w-full md:w-[80%] flex flex-col md:flex-row items-center justify-between p-6">
        {/* Form Section */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold mb-4">Hey there 👋</h1>
          <p className="mb-6">Request a new appointment in 10 seconds</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Doctor Select with react-select */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="doctor">Doctor</label>
              <Select
                id="doctor"
                value={doctor}
                onChange={setDoctor}
                options={doctorOptions}
                placeholder="-- Select Doctor --"
                styles={customStyles}
                components={{ Option: DoctorOption }} // Use custom Option component
                className="text-sm"
              />
            </div>

            {/* Reason for Appointment */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="reason">Reason for appointment</label>
              <input
                type="text"
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="ex: Annual check-up"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white text-sm"
              />
            </div>

            {/* Additional Comments */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="comments">Additional comments/notes</label>
              <input
                type="text"
                id="comments"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="ex: Prefer afternoon appointments"
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white text-sm"
              />
            </div>

            {/* Appointment Date */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="Date">Expected appointment date</label>
              <input
                type="date"
                id="Date"
                value={Date}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white text-sm"
              />
            </div>

            {/* Appointment Time */}
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="Time">Expected appointment time</label>
              <input
                type="time"
                id="Time"
                value={Time}
                onChange={(e) => setTime(e.target.value)}
                className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white text-sm"
                required // Optional: You can make it required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition"
            >
              Submit and continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
