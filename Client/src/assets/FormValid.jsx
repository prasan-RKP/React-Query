import React, { useState } from "react";
import { toast } from "sonner";

const FormValid = () => {

    const [email, setEmail] = useState("");
    const [pass, setPass] = useState('');

    const isDisabled = !email.includes('@') || pass.length < 5;

    const onValidForm = () => {
       if(!email.includes('@')){
        toast.error("Invalid E-mail '@' required");
        return false;
       }

       else if(pass.length < 5){
        toast.error('The must be 6 or more that 5');
        return false;
       }

       return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(onValidForm()){
            localStorage.setItem("cred", JSON.stringify(email, pass));
            setEmail("");
            setPass("");
            toast.success("Successfully loggedIn");
        }
    }

    // learning:1 -> use of 'controlled component'.
    // learning2 -> be clear of greater than and less than.
    // learning3 -> button 'disable' concept.

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
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {/* Error message placeholder */}

                    </div>

                    {/* Password Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            onChange={(e) => setPass(e.target.value)}
                            type="password"
                            value={pass}
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                        {/* Error message placeholder */}

                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-200 ${isDisabled ? 'bg-red-500': ""}`}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormValid;
