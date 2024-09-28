import React, { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import DashboardTable from '../components/Table'
import { useAdminAuth } from '../context/AdminAuthContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [meetings, setMeetings] = useState([]);
    const {Admin} = useAdminAuth()
    const fetchMeetings = async () => {
        try {
            const res = await fetch("http://localhost:1042/admin/get-appointment", {
                method: "GET",
            });
            const data = await res.json();

            if (Array.isArray(data)) {
                setMeetings(data); // If data is already an array
            } else {
                setMeetings([data]); // Convert to array if it's a single object or not an array
            }

        } catch (error) {
            console.error("Error fetching meetings:", error);
        }
    };

    useEffect(() => {
        fetchMeetings();
    }, []);
if(!Admin){
    return (
        <div className='flex h-[100vh] text-white bg-gray-900 justify-center items-center flex-col gap-4'>
        You are not the admin!!!!
        <Link to={"/register-admin"} className='bg-green-900 rounded-xl p-3 text-white'>Register</Link>
        </div>
    )
}
    return (
        
        <div className='bg-[#131619] min-h-screen text-white'>
            <div className=''>
                <div className='bg-[#1D2129] h-14 md:px-3 px-1 flex flex-row items-center justify-between'>
                    <h1>Logo</h1>
                    <div>
                        <div className='bg-red-700 h-8 w-8 rounded-full'></div>
                        <h3 className='text-xs'>Admin</h3>
                    </div>
                </div>
            </div>
            <div className='p-7 md:p-12'>
                <div>
                    <h1 className='text-3xl'>Welcome, Admin</h1>
                    <span className='text-gray-600 text-[14px]'>Start your day by managing new appointments</span>
                </div>
            </div>
            
            <Cards />
            {meetings?.map((meeting)=>(
 <DashboardTable meeting={meeting} />
            ))}
            {/* Pass meetings to the table component */}
        </div>
    )
}

export default Dashboard;
