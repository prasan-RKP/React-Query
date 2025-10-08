import React, { useState } from "react";
import { toast } from "sonner";

const MyFormValid = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const formValid = () => {

        if (!userName) {
            toast.error('username required');
            return false;
        }

        else if (userName.length < 5) {
            toast.error('username must be atleast 6 character');
            return false;
        }

        else if (!email) {
            toast.error('E-mail required');
            return false;
        }

        else if (!emailPattern.test(email)) {
            toast.error("Please Enter a valid E-mail");
            return false;
        }

        else if (!password) {
            toast.error('Password required');
            return false;
        }

        else if (password.length < 5) { // 3 > 5
            toast.error('password length must be at least 6 character long');
            return false;
        }

        return true;
    }

    const handldeOnSubmit = (e) => {

        e.preventDefault();

        if (formValid()) {
            console.log(`username:${userName}, Email:${email}, password:${password}`);

            setEmail('');
            setUserName('');
            setPassword('');
        }

    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Login
                </h2>
                <form onSubmit={handldeOnSubmit} className="space-y-5">

                    {/* UserName Fiels */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Enter your username"
                            className=" text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

                    </div>

                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className=" text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            className=" text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {/* Error message placeholder */}

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 "bg-red-600 `}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default MyFormValid;
