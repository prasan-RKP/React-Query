import React, { useState } from "react";

const PasswordStrength = () => {

  /*
1)Minimum 8 chars.

2)At least 1 number + 1 special char (!@#$%^&*).

3)how strength (Weak/Medium/Strong) as color (Red/Yellow/Green).
  */

  const [color, setColor] = useState('slate-700');
  const [text, setText] = useState('');


  const onFormValid = (value) => {

    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);

    if ((value.length >= 7) && hasNumber && hasSpecialChar) {
      setColor('green-500');
    }

    else if ((value.length >= 7) && (hasNumber || hasSpecialChar)) {
      setColor('amber-500');
    }

    else if (value.length > 7) {
      setColor('red-300')
    }
    else {
      setColor('red-600');
    }
  }


  const handleOnChange = (e) => {
    const value = e.target.value;
    setText(value);
    onFormValid(value);
  }

  // concept:1 -> if you want to match a single char available on string use '.test' for whole value use 'includes


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Input Field */}
      <input
        onChange={(e) => handleOnChange(e)}
        type="text"
        placeholder="Type something..."
        className="w-full max-w-md px-4 py-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-800"
      />

      {/* Status Signals */}
      <div className="w-full max-w-md space-y-4">

        <div
          className={`p-4 rounded-lg bg-${color} text-gray-400 font-medium shadow-md }`}
        >
          {
            color === 'green-500' ? "Strong Password ✅" : color === 'amber-500' ? "Medium Range Password" : color === 'red-300' ? "Weak password" : color === 'red-600' ? "Too weak Password" : "Da EssenZa"
          }
        </div>

      </div>
    </div>
  );
};

export default PasswordStrength;
