import React, { useEffect, useMemo, useState } from "react";

const SearchFilter = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userNames, setUserNames] = useState([]);



    // Filter logic (optional, you can modify later)
    const filteredItems = userNames.filter((user) =>
        user?.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        fetch('https://dummyjson.com/users')
            .then(res => res.json())
            .then((data) => setUserNames(data?.users))
            .catch(err => console.log('Err', err))
    }, [])

    //console.log("Users names", userNames.map((user)=> console.log(user?.firstName)));

    /*

    ---- Debounce concept -----
    step:-1 for the first the 'timer' value is undefined you can type anyWord
    step:2 -> for the second we 'clearTimeOut' of the previous  'timer' value.
    step:3 -> set the new value of the 'timer' by 'setTimeout' method (the 'setTimeout' will hold the value as per delay, then after it will execute)
    step4: write fn(...args) inside the  'setTimeout' function
    */

    const deboune = (fn, delay) => {
        let timer;

        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                fn(...args)
            }, delay)
        }
    }

    // creating a debounce fucntion for updating the searchTerm
    const debounceSearch = useMemo(()=> {
        return deboune((value)=> {
            setSearchTerm(value)
        }, 500)
    }, [])

    /* doubt cleared here
    step-1) (value)=> {
            setSearchTerm(value)
        } -> This is teh fucntion wepass , and 500ms is our delay

    */

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search..."
                    
                    onChange={(e) => debounceSearch(e.target.value)}
                    className="w-full text-black border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                {/* List */}
                <ul className="divide-y divide-gray-200">
                    {filteredItems.map((item, index) => (
                        <li
                            key={index}
                            className="py-3 px-2 hover:bg-gray-100 rounded cursor-pointer text-gray-700"
                        >
                            {item.firstName}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchFilter;
