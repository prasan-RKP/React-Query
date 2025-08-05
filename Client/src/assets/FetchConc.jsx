import React, { useEffect, useState } from 'react'

const FetchConc = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const load = async () => {
            fetch('https://dummyjson.com/users')
                .then(res => res.json())
                .then((data)=> setUsers(data.users))
                .catch((err)=> console.log(err))
        }
        load();
    }, []);

    // learn 1:- missed the dependecy array.
    // leran 2:- forgot how to show the results.

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">User List</h2>
            <ul className="divide-y divide-gray-200">
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <li
                            key={user?.id}
                            className="py-3 px-2 hover:bg-gray-100 rounded cursor-pointer"
                        >
                            <p className="text-lg text-gray-700">{user.firstName}</p>
                            <p className="text-lg text-gray-700">{user.lastName}</p>
                            <p className="text-lg text-gray-700">{user.email}</p>
                            <p className="text-lg text-gray-700">{user.bloodGroup}</p>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500 text-center">No users available</p>
                )}
            </ul>
        </div>
    );
}

export default FetchConc
