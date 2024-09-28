import { React, useState } from 'react';
import img from '../assets/illustration.png'; // Replace with your actual image path
import { Link , useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Register = () => {
  const {login} = useAuth()
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    otp: ''
  });

  const click = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("http://localhost:1042/user/otp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData), // Convert formData to JSON
      });
  
      if (response.ok) {
        console.log("Form submitted successfully");
        login(formData)
        // Handle successful form submission, e.g., show success message
      } else {
        console.error("Form submission failed");
        // Handle form submission failure, e.g., show error message
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    setIsClicked(!isClicked);

  };

  const handlesumbit = async (e) => {
    e.preventDefault();
    
    // Combine OTP into formData
    const otpString = otp.join('');
    const updatedFormData = { ...formData, otp: otpString };
    setFormData(updatedFormData);
  
    try {
      const response = await fetch("http://localhost:1042/user/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFormData), // Convert formData to JSON
      });
  
      if (response.ok) {
        console.log("Form submitted successfully");
        navigate("/user-details")
        // Handle successful form submission, e.g., show success message
      } else {
        console.error("Form submission failed");
        // Handle form submission failure, e.g., show error message
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-2 sm:px-8 min-h-screen flex items-center justify-center bg-gray-900">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center max-w-6xl rounded-lg overflow-hidden shadow-lg">
        {/* Left Form Section */}
        <div className="p-8 md:p-12 text-white">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Hi there, ...</h1>
            <p className="text-gray-400">Get Started with Appointments.</p>
          </div>
          <form className="space-y-6" onSubmit={click}>
            <div>
              <label className="block text-gray-400">Full name</label>
              <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                <span className="p-2">
                  <svg className="w-6 h-6 text-gray-400" fill="#fffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {/* SVG content */}
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Adrian Hajdin"
                  className="bg-transparent flex-1 py-2 px-4 focus:outline-none text-gray-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400">Email address</label>
              <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                <span className="p-2">
                  <svg className="w-6 h-6 text-gray-400" fill="#fffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {/* SVG content */}
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="adrian@jsmastery.pr"
                  className="bg-transparent flex-1 py-2 px-4 focus:outline-none text-gray-300"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400">Phone number</label>
              <div className="flex items-center bg-gray-700 rounded-lg mt-2">
                <span className="p-2">
                  <svg className="w-6 h-6 text-gray-400" fill="#fffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    {/* SVG content */}
                  </svg>
                </span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+00 0342 0453 34"
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
                <h2 className="text-white text-xl mb-4">Verify OTP</h2>
                <p className="text-gray-400 mb-6">
                  Please enter the OTP sent to your registered mobile number.
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

                <button
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={handlesumbit}
                >
                  Verify
                </button>
              </div>
            </div>
          ) : null}

          <div className="flex flex-row items-center justify-between">
            <p className="mt-8 text-gray-600 text-center">@carepulse copyright</p>
            <Link to={"/register-admin"}>
              <span className="mt-8 text-green-900 cursor-pointer">Admin</span>
            </Link>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="md:block">
          <img src={img} alt="Healthcare professionals" className="md:h-[95vh] h-0" />
        </div>
      </div>
    </div>
  );
};

export default Register;
