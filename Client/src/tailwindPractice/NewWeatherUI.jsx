import React from 'react'
import { IoSettings } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import {ReactTyped} from 'react-typed';


const NewWeatherUI = () => {
  return (
    <div className='min-h-screen mx-auto w-full bg-[#0B0B2A]'>
      <header className='flex flex-col sm:flex-row items-center justify-between w-full px-4 sm:px-8 lg:px-[100px] pt-4 pb-6 gap-4 sm:gap-0'>

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
     <section className='flex flex-row justify-center items-center mt-9 mb-6 px-4'>
      <p className='text-2xl sm:text-3xl lg:text-4xl font-medium text-center'>
        How's The&nbsp;
        <ReactTyped
          strings={["Sky Looking Today.", "Weather Feeling Today.", "Day Shaping Up."]}
          typeSpeed={70}
          backSpeed={50}
          loop
        />
      </p>
    </section>

      {/*  */}
      <section className='flex flex-col sm:flex-row justify-center items-center gap-3.5 pt-6 px-4'>
        <div className='w-full sm:w-auto'>
          <input
            className='pl-3 h-[48px] w-full sm:w-[380px] rounded-xl bg-gray-700 border-gray-700 font-medium'
            type="text"
            placeholder='🔍 Search for place..'
          />
        </div>

        <div className='bg-gray-700 p-3 px-6 rounded-2xl w-full sm:w-auto'>
          <button className='text-xl w-full sm:w-auto'>
            Search
          </button>
        </div>
      </section>


      {/* Grid section */}
      <div className="
        grid 
        grid-cols-1
        lg:grid-cols-3
        lg:grid-rows-3
        gap-4
        justify-center
        mt-6 mx-auto px-4 sm:px-6 lg:px-20 pb-9
      ">

        {/* Top-left box 01 */}
        <div className="
          lg:col-span-2 lg:row-span-1
          h-36 
          bg-gradient-to-r from-[#4B63D9] to-[#6A5BE2]
          flex justify-between items-center text-white font-bold
          border border-gray-400 rounded-xl
          p-4 sm:p-5
          w-full
        ">
          
          <div className="pl-2 sm:pl-5 flex flex-col gap-1.5">
            <p className="text-base sm:text-lg">Berlin, Germany</p>
            <p className="text-xs">Tuesday, Aug 5, 2025</p>
          </div>

          <div className="flex justify-center items-center gap-3 sm:gap-[35px]">
            <img src="/flower.png" className="w-8 h-8 sm:w-10 sm:h-10" alt="" />
            <p className="text-4xl sm:text-6xl pr-2 sm:pr-7">20</p>
          </div>
        </div>

        {/* Right column full-height box 02 */}
        <div className="
          lg:row-span-3 
          h-auto
          bg-[#2e2e67]
          rounded-xl text-white text-2xl font-bold 
          border border-black
          w-full
        ">
          <div className="flex flex-col gap-2.5 h-full">

            {/* Header Section */}
            <section className="flex flex-col sm:flex-row justify-between items-center gap-2.5 px-5 sm:px-7 py-4 sm:py-6">
              <p className="text-base sm:text-lg">Hourly Forecast</p>
              <select className="text-sm bg-gray-800 p-2 sm:p-2.5 rounded-lg border border-gray-500 w-full sm:w-auto">
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </section>

            {/* Scrollable Forecast Section */}
            <div className="overflow-y-auto px-2 pb-4 flex-1 max-h-[300px] lg:max-h-[500px]">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex justify-center items-center gap-2.5 mb-2">
                  <div className="flex justify-between items-center w-full mx-2 sm:mx-5 px-3 border-gray-500 h-10 bg-violet-500 rounded-xl">
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

        {/* Middle-left box 03 */}
        <div className="
          lg:col-span-2
          h-auto sm:h-36 
          flex justify-center items-center text-white font-bold
          w-full
        ">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full h-full p-2">
            <div className="flex flex-col justify-center gap-2.5 rounded-lg pl-4 sm:pl-5 bg-[#24244D] py-4">
              <p className="text-sm sm:text-base">Feels Like</p>
              <p className="text-lg sm:text-xl">18%</p>
            </div>
            <div className="flex flex-col justify-center gap-2.5 rounded-lg pl-4 sm:pl-5 bg-[#24244D] py-4">
              <p className="text-sm sm:text-base">Humidity</p>
              <p className="text-lg sm:text-xl">48%</p>
            </div>
            <div className="flex flex-col justify-center gap-2.5 rounded-lg pl-4 sm:pl-5 bg-[#24244D] py-4">
              <p className="text-sm sm:text-base">Wind</p>
              <p className="text-lg sm:text-xl">14 Km/h</p>
            </div>
            <div className="flex flex-col justify-center gap-2.5 rounded-lg pl-4 sm:pl-5 bg-[#24244D] py-4">
              <p className="text-sm sm:text-base">Precipitation</p>
              <p className="text-lg sm:text-xl">0 mm</p>
            </div>
          </div>
        </div>

        {/* Bottom-left box 04 */}
        <div className="
          lg:col-span-2 
          h-auto
          flex justify-center items-center font-bold
          w-full
        ">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5 w-full h-full p-2">
            {Array(7).fill().map((_, i) => (
              <div
                key={i}
                className="bg-[#24244D] flex flex-col rounded-xl items-center justify-center gap-2.5 py-4 text-white min-h-[120px]"
              >
                <p className="text-sm sm:text-base">Tue</p>
                <img src="/flower.png" className="h-5 w-5" alt="" />
                <div className="flex justify-between items-center px-3 w-full">
                  <p className="text-xs sm:text-sm">20</p>
                  <p className="text-xs sm:text-sm">14</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}

export default NewWeatherUI