import React, { useEffect, useState } from 'react'
import ConditionChild from './ConditionChild';

const ConditionParent = () => {

    const [count, setCount] = useState(0);

    useEffect(()=> {
       if(count > 3){
        console.log("UnMounted");
       }
       else{
        console.log("Mounted");
       }
    },[count])

    return (
        <div>
            <p className='text-center text-2xl'>I am from parent</p>
            <button
            onClick={()=> setCount(prev => prev + 1)}
            className='text-center p-2.5 bg-black text-white rounded-md'>IncreMent</button>
            {count < 3 ? <ConditionChild />: ""};
        </div>
    )
}

export default ConditionParent
