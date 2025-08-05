import React from "react";
import { ToggleLeft } from "lucide-react";

const ChatSidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonUsers = Array(8).fill(null);

  return (
    <aside className="bg-gray-950 text-gray-100 p-5 h-full w-72 shadow-xl overflow-y-auto rounded-r-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 border-b border-gray-700 pb-2">
        <h2 className="text-lg font-semibold">Users</h2>
        <button className="text-gray-300 hover:text-white p-3 rounded-lg transition bg-gray-700">
          <ToggleLeft size={32} />
        </button>
      </div>
      {/* Skeleton Users */}
      <ul>
        {skeletonUsers.map((_, index) => (
          <li
            key={index}
            className="flex items-center mb-4 p-3 rounded-lg bg-gray-800 animate-pulse"
          >
            {/* Avatar Skeleton */}
            <div className="w-16 h-16 rounded-full bg-gray-700" />
            {/* User Info Skeleton */}
            <div className="ml-4 flex-1">
              <div className="h-4 w-32 bg-gray-700 rounded mb-2" />
              <div className="h-3 w-16 bg-gray-700 rounded" />
            </div>
            {/* Status Indicator Skeleton */}
            <div className="ml-2 w-4 h-4 rounded-full bg-gray-700" />
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default ChatSidebarSkeleton;
