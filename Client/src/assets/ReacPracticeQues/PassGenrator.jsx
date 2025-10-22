import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner';

const PassGenrator = () => {

  const [isCopy, setIsCopy] = useState(false);
  const [password, setPassword] = useState("");
  const [passLength, setPassLength] = useState(8);

  // for test cases
  const [isUpperCase, setIsUpperCase] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSymbol, setIsSymbol] = useState(false);
  const inpRef = useRef();



  const generatePassword = () => {
  let base = 'qwertyuiopasdfghjklmnbvcxz'; // lowercase
  let mixStr = base;

  if (isUpperCase) {
    mixStr += 'QWERTYUIOPASDFGHJKLZXCVBNM';
  }

  if (isNumber) {
    mixStr += '1234567890';
  }

  if (isSymbol) {
    mixStr += '`!@#$%^&*():"<>?/';
  }

  let pass = '';
  for (let i = 0; i < passLength; i++) {
    let randIdx = Math.floor(Math.random() * mixStr.length);
    pass += mixStr[randIdx];
  }

  setPassword(pass);
  return pass;
};


  const handleCopy = () => {
    if (inpRef.current) {
      navigator.clipboard.writeText(inpRef.current.value)
        .then(() => {
          setIsCopy(true);
          toast.success("copied successfully ✅");
        })
        .catch((err) => {
          setIsCopy(false);
          toast.error("Copy failed ❌");
        })
    }
  }

  useEffect(() => {
    generatePassword();
  }, [passLength, isNumber, isSymbol, isUpperCase]);

  return (
    <div style={{ marginTop: "20px" }}>
      <div class="max-w-md mx-auto p-6 bg-base-200 rounded-lg shadow-md space-y-6">
        {/* <!-- Password Input with Copy Button --> */}
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text font-semibold">Generated Password</span>
          </div>
          <div class="relative">
            <input
              ref={inpRef}
              value={password}
              type="text"
              placeholder="Your password will appear here"
              class="input input-bordered w-full pr-16"
              readonly />
            <button
              onClick={handleCopy}
              class="btn btn-primary absolute top-0 right-0 rounded-l-none">
              {isCopy ? "Copied" : "Copy"}
            </button>
          </div>
        </label>

        {/* <!-- Length Slider --> */}
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">Password Length</span>
            <span class="label-text-alt">16</span>
            {/* <!-- You can bind this to slider value --> */}
          </label>
          <input type="range" min="4" max="24" onChange={(e) => setPassLength(e.target.value)} value={passLength} class="range range-primary" />
        </div>

        {/* <!-- Character Options --> */}
        <div class="grid grid-cols-2 gap-4">
          <label class="cursor-pointer label">
            <span class="label-text">Include Uppercase</span>
            <input
              type="checkbox"
              checked={isUpperCase}
              onChange={() => setIsUpperCase(prev => !prev)}
              class="checkbox checkbox-primary" />
          </label>
          <label class="cursor-pointer label">
            <span class="label-text">Include Numbers</span>
            <input
              type="checkbox"
              checked={isNumber}
              onChange={() => setIsNumber(prev => !prev)}
              class="checkbox checkbox-primary" />
          </label>
          <label class="cursor-pointer label">
            <span class="label-text">Include Symbols</span>
            <input
              type="checkbox"
              checked={isSymbol}
              onChange={() => setIsSymbol(prev => !prev)}
              class="checkbox checkbox-primary" />
          </label>
        </div>

        {/* <!-- Generate Button --> */}
        <button class="btn btn-accent w-full mt-4">Generate Password</button>
      </div>

    </div>
  )
}

export default PassGenrator
