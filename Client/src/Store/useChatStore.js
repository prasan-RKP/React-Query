import { create } from "zustand";
import { toast } from "sonner";
import { messageAxios } from "../lib/messageAxios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  users: [],
  messages: [],
  isUserLoading: false,
  selectedUser: null,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await messageAxios.get("/fetchUser");
      set({ users: res.data });
    } catch (error) {
      console.log("Error in getUsers", error);
      toast.error("Users not Found");
    } finally {
      set({ isUserLoading: false });
    }
  },

  // check here
  setSelectedUser: (selectedUser) => {
    console.log("userId value", selectedUser);
    set({ selectedUser });
  },

  // Important  method do practice (4 times at least )
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await messageAxios.post(
        `/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getMessages: async (id) => {
    set({ isMessagesLoading: true });

    try {
      const res = await messageAxios.get(`/${id}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("not getting messages from server");
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // subscribeToMessages

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      
      if(newMessage.senderId !== selectedUser._id) return ;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unSubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('newMessage');
  },
}));

//useAuthStore().get().socket;