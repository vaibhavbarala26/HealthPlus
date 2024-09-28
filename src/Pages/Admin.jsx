import { React, useState } from 'react';
import img from '../assets/doctor3.jpg'; // Replace with your actual image path
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const Admin = () => {
  const {login} = useAdminAuth()
  const [isClicked, setIsClicked] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [name , setName] = useState("")
  const [phone , setPhone] = useState("")
  const click = (e) => {
    e.preventDefault();
    setIsClicked(!isClicked);
  };
  const navigate = useNavigate()
  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field if current one is filled
      if (e.target.nextSibling && value !== "") {
        e.target.nextSibling.focus();
      }
    } else {
      e.target.value = ""; // Clear if not a valid number
    }
  };
  const handleSubmit = async()=>{
    const password = otp.join('');
    const resp = await fetch("http://localhost:1042/admin/admin" ,{
      method:"POST",
      credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({name , phone , password}),
    })
    if(resp.ok){
      alert("admin logged in successfully")
      login({name , phone})
      navigate("/Dashboard")
   
    }
  }

  return (
    <div className="p-2 sm:px-8 min-h-screen flex items-center justify-center bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl rounded-lg overflow-hidden shadow-lg items-center">
        {/* Left Form Section */}
        
        <div className="p-8 md:p-12 text-white">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Hi there, ...</h1>
            
          </div>
          <form className="space-y-6" onSubmit={click}>
            <div>
              <label className="block text-gray-400">Full name</label>
              <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                <span className="p-2">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {/* SVG content */}
                  </svg>
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e)=>(setName(e.target.value))}
                  placeholder="Adrian Hajdin"
                  className="bg-transparent flex-1 py-2 px-4 focus:outline-none text-gray-300"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-400">Phone number</label>
              <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                <span className="p-2">
                  <svg className="w-6 h-6 text-gray-400" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {/* SVG content */}
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="+00 0342 0453 34"
                  value={phone}
                  onChange={(e)=>(setPhone(e.target.value))}
                  className="bg-transparent flex-1 py-2 px-4 focus:outline-none text-gray-300"
                />
              </div>
            </div>
            <div>
              <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition-colors">
                Get Started
              </button>
            </div>
          </form>

          {/* OTP Modal */}
          {isClicked ? (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative w-full max-w-md">
                <button onClick={click} className="absolute top-2 right-2 text-gray-400 hover:text-white">
                  &times;
                </button>
                <h2 className="text-white text-xl mb-4">Enter Pincode</h2>
                <p className="text-gray-400 mb-6">
                  Please enter the Admin Pincode
                </p>

                <div className="flex space-x-2 justify-center mb-4">
                  {otp.map((value, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      className="w-12 h-12 text-center text-xl text-white bg-gray-700 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                      value={value}
                      onChange={(e) => handleOtpChange(e, index)}
                      onFocus={(e) => e.target.select()} // Auto-select input content on focus
                    />
                  ))}
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" onClick={handleSubmit}>
                  Verify
                </button>
              </div>
            </div>
          ) : null}

          <div className="flex flex-row w-[100%]  items-center justify-center">
            <p className="mt-8 text-gray-600 text-center">@carepulse copyright</p>
           
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:block">
          <img src={img} alt="Healthcare professionals" className="md:h-[95vh] h-0 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default Admin;
