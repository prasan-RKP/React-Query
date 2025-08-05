import React, { useState } from 'react'

const SwitchTheme = () => {

    const [theme, setTheme] = useState(false)

    const switchIt = () => {
      setTheme(!theme)
    }

  return (
    
    <div >
        <div className='flex items-center justify-center mt-6'>
      <button onClick={switchIt} className={`text-center  p-2 rounded-md ${theme ? "bg-white": "bg-black"}`}>Toggle Me</button>
      </div>
    </div>
  )
}

export default SwitchTheme
