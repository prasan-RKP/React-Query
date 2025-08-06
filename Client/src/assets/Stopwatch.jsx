import React, { useRef, useState } from "react";

const Stopwatch = () => {



    /*
    concept: 1 -> a 'ref' will be needed to store the current state of time 
    concept: 2-> have knowledge of 'setInterval', 'clearInterval' 
    concept: 3-> a variable to check it is running or not by boolean value.

    */

    const [time, setTime] = useState(0);
    const timeRef = useRef(null);
    const [isRunning, setIsRunning] = useState(false);

    const formatTime = (timeInText) => {
        const minute = Math.floor(timeInText / 60);
        const sec = timeInText % 60;

        const paddedMin = String(minute).padStart(2, "0");
        const paddedSec = String(sec).padStart(2, "0");

        return `${paddedMin}:${paddedSec}`;
    };

    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            timeRef.current = setInterval(() => {
                setTime(prev => prev + 1);
            }, 1000)
        }
    }

    const handlePause = () => {
        setIsRunning(false);
        clearInterval(timeRef.current);
    }

    const handleRestart = () => {
        setIsRunning(false);
        clearInterval(timeRef.current);
        setTime(0);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {/* Timer Display */}
            <div className="text-5xl font-bold text-gray-800 mb-6">{formatTime(time)}</div>

            {/* Buttons */}
            <div className="flex space-x-4">
                <button onClick={handleStart} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition">
                    Start
                </button>
                <button onClick={handlePause} className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                    Pause
                </button>
                <button onClick={handleRestart} className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Stopwatch;
