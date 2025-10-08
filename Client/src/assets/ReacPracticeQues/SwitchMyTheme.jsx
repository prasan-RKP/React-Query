import React, { useState } from 'react'

const SwitchMyTheme = () => {

    const [color, setColor] = useState(false);


    const switchTheme = () => {
            setColor(!color)
            document.body.style.backgroundColor = color ? "white" : "black"
    }
    

  return (
    <div>
        <div className={`flex items-center justify-center `}>
           <button onClick={switchTheme}  className={`text-center p-2 items-center rounded-md bg-black text-white mt-12`}>Switch It</button>
        </div>
    </div>
  )
}

export default SwitchMyTheme
