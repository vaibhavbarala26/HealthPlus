import React from 'react'
import cal from "../assets/calender.svg"
import clock from "../assets/clock.svg"
import alert from "../assets/alert.svg"
import "../App.css"
const Cards = () => {
  return (
    <div className='grid grid-flow-row grid-cols-1 px-8 md:grid-cols-3 gap-5'>
        <div className='  px-4 py-5 rounded-lg gradient'>
            <div className='flex flex-row gap-1 items-center '>
                <img src={cal} alt="" className='h-5' />
                <span>91</span>
            </div>
            <div>
                <span>Total number of schduled appointments</span>
            </div>
        </div>
        <div className='  px-4 py-5 rounded-lg gradient'>
            <div className='flex flex-row gap-1 items-center'>
            <img src={clock} alt="" className='h-5' />
                <span>32</span>
            </div>
            <div>
                <span>Total number of pending appointments</span>
            </div>
        </div>
        <div className='  px-4 py-5 rounded-lg gradient'>
            <div className='flex flex-row gap-1 items-center'>
            <img src={alert} alt="" className='h-5' />
                <span>56</span>
            </div>
            <div>
                <span>Total number of canceled appointments</span>
            </div>
        </div>
    </div>
  )
}

export default Cards
