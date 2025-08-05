import React from "react";
import { X } from "lucide-react";
import { useChatStore } from "../Store/useChatStore";
import { useAuthStore } from "../Store/useAuthStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  console.log("Selected userID", selectedUser);

  return (
    <header className="bg-gray-900 text-gray-100 p-5 flex items-center justify-between shadow-md border-b border-gray-700">
      <div className="flex items-center">
        <img
          src={selectedUser.profilePic}
          alt={selectedUser.username}
          className="w-16 h-16 rounded-full object-cover mr-4"
        />
        <h1 className="text-xl font-semibold flex items-center">
          {selectedUser.username}
          <span
            className={`ml-2 w-4 h-4 rounded-full ${
              onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"
            }`}
          ></span>
        </h1>
      </div>
      <button
        className="text-gray-400 hover:text-red-500"
        onClick={() => setSelectedUser(null)}
      >
        <X size={24} />
      </button>
    </header>
  );
};

export default ChatHeader;
