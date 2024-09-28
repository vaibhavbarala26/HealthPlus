import React, { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ConfirmationScreen = () => {
  const {user} = useAuth()
  const [nameDoc , setNameDoc] = useState("")
  const [dateDoc , setDate] = useState("")
  const [timeDoc , setTime] = useState("")
  const location = useLocation();
  const { pathname, search, hash } = location;
useEffect(()=>{
 // Extracting name from pathname
 const name = pathname.split('/').pop().replace(/Dr\. /, ''); // "Sophia Martinez"

 // Extracting date from query string
 const queryParams = new URLSearchParams(search);
 const date = queryParams.get('date') || search.replace('?', ''); // Use a key or the whole query string

 // Extracting time from hash
 const time = hash.replace('#', ''); // "01:24"
// Step 1: Decode the URL-encoded string
const decodedName = decodeURIComponent(name);

// Step 2: Remove special characters and numerics
const cleanName = decodedName.replace(/[^a-zA-Z\s]/g, '').trim();
setNameDoc(cleanName);
setDate(date)
setTime(time)
} , [nameDoc , dateDoc , timeDoc])
 
if(!user){
  return( <>
    <div className='flex h-[100vh] text-white bg-gray-900 justify-center items-center flex-col gap-4'>
        Please Register!!!!!!!!!!!!!!!
        <Link to={"/register"} className='bg-green-900 rounded-xl p-3 text-white'>Register</Link>
        </div>
  </>)
}
  
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-center flex flex-col items-center justify-center md:w-[50%]">
        <FaCheckCircle className="text-green-500 text-6xl mb-4" />
        <h1 className="text-white text-2xl md:text-3xl font-semibold mb-2">
          Your <span className="text-green-400">appointment request</span> has been successfully submitted!
        </h1>
        <p className="text-gray-400 mb-8">
          We'll be in touch shortly to confirm.
        </p>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-gray-300 text-lg mb-4">Requested appointment details:</h2>
          <div className="flex justify-center items-center space-x-4">
            <div className="flex items-center space-x-2">
              <img
                src="https://via.placeholder.com/40" // Placeholder image, replace with actual image URL
                alt="Doctor Avatar"
                className="rounded-full"
              />
              <span className="text-white">Dr. {nameDoc}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-white">{dateDoc} - {timeDoc}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationScreen;
