import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoute from "../Server/src/Routes/auth.route.js";
import meessageRoute from '../Server/src/Routes/message.route.js'
import mongoose from "mongoose";
import { io, app, server } from "./src/lib/socket.js";
dotenv.config();


const PORT = process.env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/auth", authRoute);
app.use("/messages",meessageRoute)

server.listen(PORT, () => {
  console.log(`my server is running on PORT ${PORT} `);
});

mongoose
  .connect("mongodb://127.0.0.1:27017/JourneyDB")
  .then(() => console.log("successfully connected to mongoDB ✅"))
  .catch((err) =>
    console.log("❌ Error in mongooose connection in index.js file", err)
  );
