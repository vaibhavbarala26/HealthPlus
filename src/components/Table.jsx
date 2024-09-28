import React, { useState } from "react";
import clock from "../assets/clock.svg"; // Pending icon
import alert from "../assets/alert.svg"; // Cancelled icon
import tick from "../assets/tick.svg"; // Scheduled icon

const DashboardTable = ({meeting}) => {
  const [cancel, setCancel] = useState(false);
  const [appoint , setAppoint] = useState(false);
  const [Reason , setReason] = useState("")
  console.log(meeting)
  const cancelAppointment = () => {
    setCancel(!cancel);

    console.log(cancel);
  };
  const setAppointment = ()=>{

    setAppoint(!appoint);
  }

  
  const getStatusComponent = (Status) => {
    if (Status === "Success") return (
      <span className="flex items-center bg-green-500 rounded-full p-1 px-2">
        <img src={tick} alt="Scheduled" className="w-5 h-4 mr-2" />
        <span className="text-[13px] text-green-800">{Status}</span>
      </span>
    );
    if (Status === "Pending") return (
      <span className="flex items-center bg-blue-500 rounded-full p-1 px-2">
        <img src={clock} alt="Pending" className="w-5 h-4 mr-2" />
        <span className="text-blue-800 text-[13px]">{Status}</span>
      </span>
    );
    if (Status === "Cancelled") return (
      <span className="flex items-center bg-red-500 rounded-full p-1 px-2">
        <img src={alert} alt="Cancelled" className="w-5 h-4 mr-2" />
        <span className="text-red-800 text-[13px]">{Status}</span>
      </span>
    );
    return <span>{Status}</span>;
  };
  console.log(meeting)
  const handleCancel = async () => {
    try {
      const response = await fetch("http://localhost:1042/admin/cancel", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          PateintName: meeting.PateintName,
          PateintNumber: meeting.PateintNumber,
          DoctorName: meeting.DoctorName,
          Date: meeting.Date,
          Time: meeting.Time,
          Reason:Reason
        })
      });
      if (response.ok) {
        alert("Appointment canceled successfully");
        setCancel(false); // Close modal only after success
      } else {
        alert("Failed to cancel the appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while canceling the appointment");
    }
  };
  
  const handelappoint = async () => {
    try {
      const response = await fetch("http://localhost:1042/admin/appoint", {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          PateintName: meeting.PateintName,
          PateintNumber: meeting.PateintNumber,
          DoctorName: meeting.DoctorName,
          Date: meeting.Date,
          Time: meeting.Time,
          Reason: Reason
        })
      });
      if (response.ok) {
        alert("Appointment scheduled successfully");
        setAppoint(false); // Close modal only after success
      } else {
        alert("Failed to schedule the appointment");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while scheduling the appointment");
    }
  };
  
  return (
    <>
      {cancel && (
        <div className="fixed inset-0 flex items-center justify-center bg-slate-900 bg-opacity-80">
          <div className="bg-slate-800 text-white w-full max-w-md md:max-w-lg p-5 rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-[20px]">Cancel Appointment</h1>
                <span className="text-gray-400 text-[10px]">Are you sure you want to cancel the meeting?</span>
              </div>
              <div
                className="cursor-pointer text-lg font-bold"
                onClick={() => setCancel(false)}
              >
                X
              </div>
            </div>
            <div className="mb-4">
              <h2 className="mb-2">Reason for Cancellation</h2>
              <textarea
                name=""
                id=""
                value={Reason}
                onChange={(e)=>(setReason(e.target.value))}
                cols={40}
                rows={3}
                className="bg-slate-700 w-full p-2 rounded-md"
              ></textarea>
            </div>
            <div className="text-center">
              <button className="bg-red-600 w-full md:w-[88%] rounded-md p-2 text-white" onClick={handleCancel} >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}
      {appoint && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Schedule Appointment</h2>
              <button
                onClick={() => setAppoint(false)} // Close modal on click
                className="text-gray-400 hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-400 mb-4">Please fill in the following details to schedule</p>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Doctor</label>
              <div className="relative">
                <input
                  type="text"
                  value={meeting.DoctorName}
                  readOnly
                  className="bg-gray-700 w-full p-3 rounded-lg text-gray-300"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Reason for meeting</label>
              <input
                type="text"
                placeholder="ex: Annual monthly check-up"
                className="bg-gray-700 w-full p-3 rounded-lg text-gray-300"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-400 mb-2">Expected meeting date</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Select your meeting date"
                  className="bg-gray-700 w-full p-3 px-9 rounded-lg text-gray-300"
                />
                <div className="absolute inset-y-0 left-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>

            <button className="bg-green-600 w-full p-3 rounded-lg text-white" onClick={handelappoint}>
              Schedule meeting
            </button>
          </div>
        </div>
      )}
      <div className="text-white p-6 rounded-lg">
        
        <table className="min-w-full table-auto">
          <thead className="border-b border-gray-700">
            <tr>
              <th className="py-2 px-4 text-left">Patient</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left lg:w-32">Status</th> {/* Adjusted width here */}
              <th className="py-2 px-4 text-left">Doctor</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            
              <tr key={1} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-2 px-4 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-700 mr-3 flex items-center justify-center">
                    <img src={meeting?.avatar} alt="avatar" className="w-full h-full rounded-full" />
                  </div>
                  {meeting.PateintName}
                </td>
                <td className="py-2 px-4">{meeting.Date}</td>
                <td className="py-2 px-4 items-center md:w-36">{getStatusComponent(meeting.Status)}</td> {/* Adjusted width here */}
                <td className="py-2 px-4">{meeting.DoctorName}</td>
                <td className="py-2 px-4">
                {meeting.Status === "Pending" && (
  <div>
    <button className="text-green-400 hover:underline mr-2" onClick={setAppoint}>
      Schedule
    </button>
    <button className="text-red-400 hover:underline" onClick={cancelAppointment}>
      Cancel
    </button>
  </div>
)}

                  
                </td>
              </tr>
          
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DashboardTable;
