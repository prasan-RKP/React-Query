import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "sonner";
import {io} from 'socket.io-client';

const BASE_URL = "http://localhost:5004";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isSigningIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  bioUpdating: false,
  onlineUsers: [],
  socket: null,

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/login", data);
      set({ authUser: res.data });
      toast.success("Congrats!! LoggedIn SuccessFully");
      get().connectSocket();
    } catch (error) {
      console.log("useAuthStore LogIn Error", error.response.data.message);
      toast.error(error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isLoggingIn: false });
    }
  },

  signUp: async (data) => {
    // console.log('useAuthStore value',data);
    set({ isSigningIn: true });
    try {
      const res = await axiosInstance.post("/signup", data);
      set({ authUser: res.data });
      toast.success("Congrats!! Welcome to Chatty 💬");
      get().connectSocket();
    } catch (error) {
      console.log("useAuthstore SignUp error", error.response.data.message);
      set({ authUser: null });
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    try {
      const { authUser, socket } = get();
  
      if (socket) {
        socket.emit("userDisconnected", authUser?._id); // 🔥 Notify server user is offline
        socket.disconnect();
      }
  
      await axiosInstance.post("/logout");
      set({ authUser: null, socket: null });
  
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error("Internal Server Error");
    }
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in UseAuthStore checkAuth", error);
      set({ authUser: null });
      // toast.error(error.response.data.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Eror in updateProfile in authStore.js", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  setBio: async (data) => {
    set({bioUpdating: true})
    try {
      const res = await axiosInstance.put("/addbio", data);
      set({authUser: res.data});
      toast.info('Bio updated Successfully');
    } catch (error) {
      console.log("Eror in setBio in authStore.js", error);
      toast.error(error.response.data.message);
    }
    finally{
      set({bioUpdating: false})
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket) return;
  
    const newSocket = io(BASE_URL, {
      query: { userId: authUser._id },
      autoConnect: false,  // Prevent auto connection
      reconnection: false, // Stop auto reconnection
      forceNew: true,      // Force a new connection
    });
  
    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on('getOnlineUsers', (userIds)=> {
      console.log("All userIds ",userIds);
      set({onlineUsers: userIds});
    })
  
    // Stop reconnection when the server is shutting down
    newSocket.on("forceDisconnect", () => {
      console.log("Server is shutting down.");
      newSocket.disconnect();
      set({ socket: null }); // Ensure no reconnection
    });

    
  },

  disconnectSocket: () => {
   if(get().socket.connected) return get().socket.disconnect();
  }

}));
