import React, { useEffect, useState } from "react";
import { useChatStore } from "../Store/useChatStore";
import { useAuthStore } from "../Store/useAuthStore";
import ChatSidebar from "../Components/ChatSidebar";
import ChatHeader from "../Components/ChatHeader";
import ChatMessage from "../Components/ChatMessage";
import MessageSkeleton from "../assets/MessageSkeleton";
import { MessageSquare } from "lucide-react";

const Chat = () => {
  const { users, selectedUser, setSelectedUser, messages, getMessages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();
  const [showOnline, setShowOnline] = useState(false);

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id);
  }, [selectedUser?._id, getMessages]);

  if (isMessagesLoading) return <MessageSkeleton />;

  return (
    <div className="flex h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
      {/* Sidebar */}
      <ChatSidebar
        users={users}
        showOnline={showOnline}
        setShowOnline={setShowOnline}
        setSelectedUser={setSelectedUser}
      />

      {/* Chat Section */}
      <div className="flex flex-col flex-grow">
        {selectedUser ? (
          <>
            <ChatHeader selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

            {/* Messages Container */}
            <main className="flex-grow p-5 overflow-y-auto bg-gradient-to-r from-gray-900 to-gray-800 text-gray-100">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message._id}
                    className={`chat ${
                      message.senderId === authUser._id ? "chat-end" : "chat-start"
                    }`}
                  >
                    {/* Sender's Profile Image (For Received Messages) */}
                    {message.senderId !== authUser._id && (
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={selectedUser.profilePic || "/avatar.png"}
                            alt="Receiver's profile pic"
                          />
                        </div>
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div className="chat-bubble bg-gray-700 text-white">
                      {message.text && <p>{message.text}</p>}
                      {message.image && (
                        <img
                          src={message.image}
                          alt="Attachment"
                          className="sm:max-w-[200px] rounded-md mb-2"
                        />
                      )}
                    </div>

                    {/* Sender's Profile Image (For Sent Messages) */}
                    {message.senderId === authUser._id && (
                      <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                          <img
                            src={authUser.profilePic || "/avatar.png"}
                            alt="Sender's profile pic"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                    <MessageSquare className="w-8 h-8 text-primary" />
                  </div>
                </div>
              )}
            </main>

            {/* Message Input */}
            <ChatMessage />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-400 text-lg">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
