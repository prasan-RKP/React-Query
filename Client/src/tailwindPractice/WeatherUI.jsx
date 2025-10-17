import React from 'react'
import { IoSettings } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import {ReactTyped} from 'react-typed';


const WeatherUI = () => {
  return (
    <div className='h-auto mx-auto w-auto bg-[#0B0B2A]'>
      <header className='flex items-center justify-between w-full px-[100px] pt-4 pb-6'>
        <div className='flex justify-center gap-2.5'>
          <img className='w-12 h-12' src="/flower.png" alt="flower" />
          <p className='text-2xl font-medium pt-1'>Weather Now</p>
        </div>

        <div className='flex justify-center items-center gap-2.5 bg-slate-700 p-3 rounded-2xl'>
          <IoSettings className='h-6 w-6 ' />
          <p className='text-lg font-medium'>Units</p>
          <FaAngleDown className='h-5 w-5' />
        </div>
      </header>

      {/*  */}
     <section className='flex justify-center items-center mt-9 mb-6'>
      <p className='text-4xl font-medium'>
        How's The&nbsp;
        <ReactTyped
          strings={["Sky Looking Today.", "Weather Feeling Today.", "Day Shaping Up."]}
          typeSpeed={70}     // typing speed
          backSpeed={50}     // deleting speed
          loop               // repeat forever
        />
      </p>
    </section>

      {/*  */}
      <section className='flex justify-center items-center gap-3.5 pt-6'>
        <div>
          <input
            className='pl-3 h-[48px] w-[380px] rounded-xl bg-gray-700 border-gray-700 font-medium'
            type="text"
            placeholder='🔍 Search for place..'

          />
        </div>

        <div className='bg-gray-700 p-3 px-6 rounded-2xl'>
          <button className='text-xl '>
            Search
          </button>
        </div>
      </section>


      {/* Grid section */}
      <div className='grid grid-flow-row grid-rows-3 grid-cols-3 gap-2 justify-center mt-6 mx-auto px-20 pb-9 '>
        {/* Top-left box 03 */}
        <div className="col-span-2 row-span-1 h-36 bg-gradient-to-r from-[#4B63D9] to-[#6A5BE2]  flex justify-between items-center text-white  font-bold border border-gray-400 rounded-xl overflow-y-auto">
          <div className='pl-5 flex  flex-col gap-1.5'>
            <p className='text-lg'>Berlin, Germany</p>
            <p className='text-xs'>Tuesday, Aug 5, 2025</p>
          </div>

          <div className='flex justify-center items-center gap-[35px]'>
            <img src="/flower.png" className='w-10 h-10' alt="" />
            <p className='text-6xl pr-7'>20</p>
          </div>
        </div>

        {/* Right column full-height box 01 */}
        <div className="row-span-3 h-full bg-[#2e2e67] rounded-xl text-2xl font-bold border border-black">
          <div className="flex flex-col gap-2.5 h-full">

            {/* Header Section */}
            <section className="flex justify-between text-center gap-2.5 px-7 py-6">
              <p className="text-lg">Hourly Forecast</p>
              <select className="text-sm bg-gray-800 p-2.5 rounded-lg border border-gray-500">
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </section>

            {/* Scrollable Forecast Section */}
            <div className="overflow-y-auto px-2 pb-4 flex-1 max-h-[300px]">
              {/* 👆 flex-1 lets it expand, max-h ensures scroll works */}
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex justify-center items-center gap-2.5 mb-2">
                  <div className="flex justify-between items-center w-full mx-5 px-3 border-gray-500 h-10 bg-violet-500 rounded-xl">
                    <div className="flex justify-center items-center gap-2">
                      <img src="/flower.png" className="h-4 w-4" alt="" />
                      <p className="text-sm">{i + 1} PM</p>
                    </div>
                    <p className="text-sm">{20 + i}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Middle-left box 02 */}
        <div className="col-span-2 h-36  flex justify-center items-center text-white  font-bold">
          {/* Inner grid of 4 boxes */}
          <div className="grid grid-cols-4 gap-2 w-full h-full p-2 ">
            <div className=" flex flex-col justify-center gap-2.5 border-white rounded-lg pl-5 bg-[#24244D]">
              <p>Feels Like</p>
              <p>18%</p>
            </div>
            <div className=" flex flex-col justify-center gap-2.5 border-white rounded-lg pl-5 bg-[#24244D]">
              <p>Humdity</p>
              <p>48%</p>
            </div>
            <div className=" flex flex-col justify-center gap-2.5 border-white rounded-lg pl-5 bg-[#24244D]">
              <p>Wind</p>
              <p>14 Km/h</p>
            </div>
            <div className=" flex flex-col justify-center gap-2.5 border-white rounded-lg pl-5 bg-[#24244D]">
              <p>Precipitation</p>
              <p>0 mm</p>
            </div>
          </div>
        </div>


        {/* Bottom-left box 03 */}

        <div className="col-span-2 h-36  flex justify-center items-center  font-bold">
          <div className='grid grid-cols-7 gap-2.5 w-full h-full p-2 '>
            {/* code for Each Box */}
            {Array(7).fill().map((_, i) => (
              <div className='bg-[#24244D] flex flex-col rounded-xl items-center justify-center gap-2.5 py-2'>
                <p>Tue</p>
                <img src="/flower.png" className='h-5 w-5' alt="" />
                <div className='flex justify-between items-center px-3 w-full'>
                  <p className='text-sm'>20</p>
                  <p className='text-sm'>14</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* the right sidebig container */}



    </div>
  )
}

export default WeatherUI
