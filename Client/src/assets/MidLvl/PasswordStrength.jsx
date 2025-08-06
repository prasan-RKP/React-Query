import React, { useState } from "react";

const PasswordStrength = () => {

  /*
1)Minimum 8 chars.

2)At least 1 number + 1 special char (!@#$%^&*).

3)how strength (Weak/Medium/Strong) as color (Red/Yellow/Green).
  */


  // concept:1 -> if you want to match a single char available on string use '.test' for whole value use 'includes

  const [text, setText] = useState("");
  const [color, setColor] = useState({colr: 'bg-slate-800', txt: 'Da EssenZa'})

  const colorPallete = (value) => {
    const numberChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const symbolChars = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "-", "="];
    const vars = value.split('');

    console.log(vars)

    const hasSpecialChar = vars.some((char)=> symbolChars.includes(char));
    const hasNums = vars.some((num)=>numberChars.includes(num));

    if(text.length >= 5 && hasNums && hasSpecialChar){
      setColor({colr:'bg-green-600', txt: 'Strong Password ✅'});
    }

    else if((text.length >=5)&&(hasNums || hasSpecialChar)){
      setColor({colr: 'bg-yellow-600', txt: "Mid range Password ☹️"});
    }

    else if(text.length >= 5){
      setColor({colr:'bg-orange-800', txt: "Weak Password ❗"});
    }
    else{
      setColor({colr: 'bg-red-500', txt: "Too Weak Password ❌"});
    }

  }

  const handleOnChange = (e) => {
    const value = e.target.value;
    setText(value);

    colorPallete(value)

  }




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
          className={`p-4 rounded-lg ${color.colr} text-gray-400 font-medium shadow-md }`}
        >
          {color.txt}
        </div>

      </div>
    </div>
  );
};

export default PasswordStrength;
