import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const ControlInput = () => {

    const [input, setInput] = useState('');
    const [res, setRes] = useState('');
    let isANumber = /^\d+$/;


    const sumOfInput = () => {
        if ((!input) || !isANumber.test(input)) {
            toast.error('Input should be a Number');
            return false;
        }

        else {
            let numberArr = input.split('');
            let result = numberArr.reduce((prev, curr) => Number(prev) + Number(curr), 0);
            setRes(result);
        }
    }

    //console.log(Number(res));



    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-lg"
        >
            <h2 className="text-2xl font-bold text-center mb-4 text-primary">Add a Number</h2>

            <div className="flex gap-4 items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter a number"
                    className="input input-bordered w-full"
                />
                <button onClick={sumOfInput} className="btn btn-primary">Add</button>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center text-lg font-semibold text-success"
            >
                {res ? Number(res): ""}
            </motion.div>
        </motion.div>
    )
}

export default ControlInput
