import React from 'react'
import { IoSettings } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import {ReactTyped} from 'react-typed';


const WeatherUI = () => {
  return (
    <div className='h-auto mx-auto w-auto bg-[#0B0B2A]'>
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
     <section className='flex flex-row justify-center items-center mt-9 mb-6  '>
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
      <section className='flex flex-col sm:flex-row justify-center items-center gap-3.5 pt-6  '>
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
       <div
  className="
    grid 
    grid-flow-col             /* 👈 Default: mobile — flow items in columns */
    grid-rows-1 grid-cols-1   /* 👈 For small screens: single row + single column */
    sm:grid-flow-row          /* 👈 ≥640px: change flow to rows (normal grid behavior) */
    sm:grid-rows-3 sm:grid-cols-3  /* 👈 ≥640px: 3 rows × 3 columns layout */
    gap-2                     /* 👈 Spacing between grid items */
    justify-center            /* 👈 Center content horizontally */
    mt-6 mx-auto px-6 sm:px-20 pb-9 /* 👈 Smaller padding on mobile, larger on sm+ */
  "
>

  {/* 🌤 Top-left box 01 */}
  <div className="
      col-span-2 row-span-1   /* 👈 On desktop, spans 2 columns */
      h-36 
      bg-gradient-to-r from-[#4B63D9] to-[#6A5BE2]
      flex justify-between items-center text-white font-bold
      border border-gray-400 rounded-xl
      overflow-y-auto
      p-4 sm:p-5              /* 👈 Add smaller padding for mobile */
      w-full                  /* 👈 Full width on mobile */
    ">
    
    <div className="pl-2 sm:pl-5 flex flex-col gap-1.5">
      <p className="text-base sm:text-lg">Berlin, Germany</p>
      <p className="text-xs">Tuesday, Aug 5, 2025</p>
    </div>

    <div className="flex justify-center items-center gap-5 sm:gap-[35px]">
      <img src="/flower.png" className="w-8 h-8 sm:w-10 sm:h-10" alt="" />
      <p className="text-4xl sm:text-6xl pr-4 sm:pr-7">20</p>
    </div>
  </div>

  {/* 📊 Right column full-height box 02 */}
  <div className="
      row-span-3 
      h-auto sm:h-full        /* 👈 Let it auto-size on mobile, full height on sm+ */
      bg-[#2e2e67]
      rounded-xl text-white text-2xl font-bold 
      border border-black
      w-full
    ">
    <div className="flex flex-col gap-2.5 h-full">

      {/* Header Section */}
      <section className="flex flex-col sm:flex-row justify-between text-center gap-2.5 px-5 sm:px-7 py-4 sm:py-6">
        <p className="text-base sm:text-lg">Hourly Forecast</p>
        <select className="text-sm bg-gray-800 p-2 sm:p-2.5 rounded-lg border border-gray-500">
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
          <option value="night">Night</option>
        </select>
      </section>

      {/* Scrollable Forecast Section */}
      <div className="overflow-y-auto px-2 pb-4 flex-1 max-h-[300px]">
        {/* 👆 Scrolls when overflow exceeds height */}
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

  {/* 🌡️ Middle-left box 03 */}
  <div className="
      col-span-2
      h-36 
      flex justify-center items-center text-white font-bold
      w-full
    ">
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full h-full p-2">
      {/* 👆 2 columns on mobile, 4 columns on sm+ */}
      <div className="flex flex-col justify-center gap-2.5 rounded-lg pl-4 sm:pl-5 bg-[#24244D]">
        <p>Feels Like</p><p>18%</p>
      </div>
      <div className="flex flex-col justify-center gap-2.5 rounded-lg pl-4 sm:pl-5 bg-[#24244D]">
        <p>Humidity</p><p>48%</p>
      </div>
      <div className="flex flex-col justify-center gap-2.5 rounded-lg pl-4 sm:pl-5 bg-[#24244D]">
        <p>Wind</p><p>14 Km/h</p>
      </div>
      <div className="flex flex-col justify-center gap-2.5 rounded-lg pl-4 sm:pl-5 bg-[#24244D]">
        <p>Precipitation</p><p>0 mm</p>
      </div>
    </div>
  </div>

  {/* 🌧️ Bottom-left box 04 */}
  <div className="
      col-span-2 
      h-auto sm:h-36 
      flex justify-center items-center font-bold
      w-full
    ">
    <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5 w-full h-full p-2">
      {/* 👆 3 columns on mobile, 7 columns on sm+ */}
      {Array(7).fill().map((_, i) => (
        <div
          key={i}
          className="bg-[#24244D] flex flex-col rounded-xl items-center justify-center gap-2.5 py-2 text-white"
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



      {/* the right sidebig container */}



    </div>
  )
}

export default WeatherUI
