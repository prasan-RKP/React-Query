// Chat.jsx
import React, { useState } from 'react';
import { X, User, ToggleLeft, ToggleRight, Send, Image } from 'lucide-react';

const users = [
  { name: 'Alice', status: 'online', profilePic: 'https://images.pexels.com/photos/1104007/pexels-photo-1104007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  // Add more users as neede{ name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },d
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { name: 'Bob', status: 'offline', profilePic: 'https://images.pexels.com/photos/1427288/pexels-photo-1427288.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

const Chat = () => {
  const [showOnline, setShowOnline] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = showOnline ? users.filter(user => user.status === 'online') : users;

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
      <aside className="bg-gray-950 text-gray-100 p-5 h-full w-72 shadow-xl overflow-y-auto rounded-r-xl">
        <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
          <h2 className="text-lg font-semibold">Users</h2>
          <button 
            onClick={() => setShowOnline(!showOnline)} 
            className={`text-gray-300 hover:text-white p-3 rounded-lg transition ${showOnline ? 'bg-green-500' : 'bg-gray-700'}`}
          >
            {showOnline ? <ToggleLeft size={32} /> : <ToggleRight size={32} />}
          </button>
        </div>
        <ul>
          {filteredUsers.map((user, index) => (
            <li 
              key={index} 
              className="flex items-center mb-4 p-3 rounded-lg hover:bg-gray-800 transition cursor-pointer"
              onClick={() => setSelectedUser(user)}
            >
              <img src={user.profilePic} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
              <span className="ml-4 text-base font-medium flex items-center">
                {user.name}
                <span className={`ml-2 w-4 h-4 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              </span>
            </li>
          ))}
        </ul>
      </aside>
      
      <div className="flex flex-col flex-grow">
        {selectedUser && (
          <header className="bg-gray-900 text-gray-100 p-5 flex items-center justify-between shadow-md border-b border-gray-700">
            <div className="flex items-center">
              <img src={selectedUser.profilePic} alt={selectedUser.name} className="w-16 h-16 rounded-full object-cover mr-4" />
              <h1 className="text-xl font-semibold flex items-center">
                {selectedUser.name} 
                <span className={`ml-2 w-4 h-4 rounded-full ${selectedUser.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
              </h1>
            </div>
            <button className="text-gray-400 hover:text-red-500" onClick={() => setSelectedUser(null)}>
              <X size={24} />
            </button>
          </header>
        )}
        <main className="flex-grow p-5 overflow-y-auto bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
          {/* Chat messages will go here */}
        </main>
        <footer className="bg-gray-900 p-5 flex items-center shadow-md border-t border-gray-700">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="ml-4 text-blue-400 hover:text-blue-600 transition">
            <Image size={24} />
          </button>
          <button className="ml-4 text-green-400 hover:text-green-600 transition">
            <Send size={24} />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
