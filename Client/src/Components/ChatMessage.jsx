import React, { useRef, useState } from "react";
import { Send, Image, X } from "lucide-react";
import { useChatStore } from "../Store/useChatStore";
import { toast } from "sonner";

const ChatMessage = () => {
  const fileInputref = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [text, setText] = useState("");

  const { selectedUser, setSelectedUser, sendMessage } = useChatStore();

  const onSendMessage = async(e) => {
     e.preventDefault();

    if(!text.trim() && !imagePreview) return ;

    try {
      await sendMessage({
           text: text.trim(),
           image: imagePreview
      });

      setText("");
      setImagePreview(null);
      if(fileInputref.current) return fileInputref.current.value = "";
    } catch (error) {
        console.log("Error in frontend side of ChatMessage", error);
        toast.error("Internal Server Error");
    }

  };

  const handleImageChange = (e) => {

    const file = e.target.files[0];
    if (!file) return "";

    if (!file.type.startsWith("image/")) {
      toast.error("please select an Image 📷");
      return;
    }

    const reader = new FileReader(file);
    reader.onloadend = () => {
       setImagePreview(reader.result);
      
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputref.current) fileInputref.current.value = "";
  };

  return (
    <form action="" onSubmit={onSendMessage}>
      <div>
        {/* Image Preview Section */}
        {imagePreview && (
          <div className="mb-3 flex items-center ml-4 gap-2">
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                type="button"
              >
                <X className="size-3" />
              </button>
            </div>
          </div>
        )}

        {/* Input Section */}
        <footer className="bg-gray-900 p-5 flex items-center shadow-md border-t border-gray-700">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-3 border border-gray-600 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!selectedUser}
          />

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputref}
            onChange={handleImageChange}
            className="hidden"
            disabled={!selectedUser}
          />

          {/* Image Upload Button */}
          <button
            onClick={() => fileInputref.current?.click()}
            className="ml-4 text-blue-400 hover:text-blue-600 transition"
            type="button"
          >
            <Image size={24} />
          </button>

          {/* Send Button */}
          <button
            className="ml-4 text-green-400 hover:text-green-600 transition"
            type="submit"
          >
            <Send size={24} />
          </button>
        </footer>
      </div>
    </form>
  );
};

export default ChatMessage;
