import express from "express";
import authRouter from "./routers/auth.router.js";
import messageRoutes from "./routers/message.route.js";
import dotenv from "dotenv";
import { ConnectDb } from "./utils/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./utils/socket.js";

dotenv.config();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


app.use("/api/auth", authRouter);
app.use("/api/messages", messageRoutes);

server.listen(port, () => {
  console.log(`App was running successfully at ${port}`);
  ConnectDb();
});
