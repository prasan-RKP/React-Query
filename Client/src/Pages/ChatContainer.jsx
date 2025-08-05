import React, { useEffect, useRef } from "react";
import { useAuthStore } from "../Store/useAuthStore";
import { useChatStore } from "../Store/useChatStore";
import { MessageSquare } from "lucide-react";
import ChatHeader from "../Components/ChatHeader";
import ClipLoader from "react-spinners/ClipLoader";
import ChatMessage from "../Components/ChatMessage";
import ChatSidebar from "../Components/ChatSidebar";

const ChatContainer = () => {
  const {
    messages,
    isMessagesLoading,
    selectedUser,
    getMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  console.log("messageEnd ref value is", messageEndRef);

  // useEffect - 1
  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unSubscribeFromMessages();
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unSubscribeFromMessages,
  ]);

  // useEffect- 2 for scroll down effect
  useEffect(()=> {
  if(messageEndRef.current && messages) {
    messageEndRef.current.scrollIntoView({behavior: "smooth"});
  }
  },[messages]);

  if (isMessagesLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="white" size={78} />
      </div>
    );

  return (
    <div className="flex h-screen w-full bg-gray-900">
      {/* Sidebar */}
      <ChatSidebar />

      {/* Main Chat Section */}
      <div className="flex flex-col flex-1 h-full">
        {/* Show ChatHeader only when a user is selected */}
        {selectedUser && <ChatHeader />}

        {/* Chat Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-slate-900">
          {selectedUser ? (
            messages.length > 0 ? (
              messages.map((message) => (
                <div
                ref={messageEndRef}
                  key={message._id}
                  className={`chat ${
                    message.senderId === authUser._id
                      ? "chat-end"
                      : "chat-start"
                  }`}
                >
                  {/* Sender Profile Pic (Only for received messages) */}
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

                  {/* Sender Profile Pic (Only for sent messages) */}
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
              <p className="text-gray-400 text-center mt-5">
                No messages yet. Start the conversation!
              </p>
            )
          ) : (
            <div className="flex items-center justify-center h-full">
              <div
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center 
                justify-center animate-bounce"
              >
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </div>
          )}
        </div>

        {/* Always show ChatMessage at the bottom */}
        <ChatMessage />
      </div>
    </div>
  );
};

export default ChatContainer;
