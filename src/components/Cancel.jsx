import React from 'react'

const Cancel = () => {
  return (
    <div>
        <div className='bg-slate-900 text-white w-[50%] h-[250px] px-5 rounded-lg py-4'>
            <div>
            <div className='flex flex-row justify-between'>
                <div>
                    <h1 className='text-[20px]'>Cancel Appointment</h1>
                    <span className='text-gray-400 text-[10px]'>Are you sure you want to cancel the appointment </span>
                </div>
                <div className='cursor-pointer'>X</div>
                </div>
                <div className='mt-3'>
                    <h1>Reason for Cancelation</h1>
                    <textarea name="" id="" cols={40} rows={3} className='bg-slate-800'></textarea>
                </div>
                <div className='mt-3'>
                <button className='bg-red-600 w-[88%] rounded-md'>Cancel Appointment</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cancel
