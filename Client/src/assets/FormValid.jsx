import React, { useState } from "react";
import { toast } from "sonner";

const FormValid = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    const isDisabled = !email.includes('@') || pass.length < 6

    const onFormValid = () => {

        if(!email){
            toast.error('Plear Enter E-mail');
            return false;
        }

        if(!pass){
            toast.error("Please Enter Password");
            return false;
        }

        if (!email.includes('@')) {
            toast.error('InValid Email');
            return false;
        }

        else if (pass.length < 6) {
            toast.error("Password must be 6 or more than 6");
            return false;
        }

        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (onFormValid()) {
            localStorage.setItem('logs', JSON.stringify(email, pass));
            toast.success('Form submitted succesfully ✅')
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Login
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
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
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            type="password"
                            placeholder="Enter your password"
                            className=" text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {/* Error message placeholder */}

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 ${isDisabled ? "bg-red-600 text-amber-50" : ""}`}
                        disabled={isDisabled}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormValid;
