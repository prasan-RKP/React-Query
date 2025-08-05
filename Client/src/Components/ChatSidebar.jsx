import React, { useEffect, useState } from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useChatStore } from "../Store/useChatStore";
import { useAuthStore } from "../Store/useAuthStore";
import ChatSidebarSkeleton from "../Skeletons/ChatSidebarSkeleton";

const ChatSidebar = () => {
  const [showOnline, setShowIOnline] = useState(false);
  const { isUserLoading, getUsers, users, selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  // Filtered users to be findOut

  // Q.1) Qustion is How to know that Among all the the registered-Users  which is users is online ?

  const filteredUsers = showOnline
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

    if(isUserLoading) return (<ChatSidebarSkeleton />)

  return (
    <aside className="bg-gray-950 text-gray-100 p-5 h-full w-72 shadow-xl overflow-y-auto rounded-r-xl">
      <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
        <h2 className="text-lg font-semibold">Users</h2>
        <button
          onClick={() => setShowIOnline(!showOnline)}
          className={`text-gray-300 hover:text-white p-3 rounded-lg transition ${
            showOnline ? "bg-green-500" : "bg-gray-700"
          }`}
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
            <img
              src={user.profilePic}
              alt={user.username}
              className="w-16 h-16 rounded-full object-cover"
            />
            <span className="ml-4 text-base font-medium flex items-center">
              {user.username}
              <span
                className={`ml-2 w-4 h-4 rounded-full ${
                  onlineUsers.includes(user._id) ? "bg-green-500": "bg-gray-500"
                }`}
              ></span>
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatSidebar;
