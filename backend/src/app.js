import express from "express";
import path from "path";
import logger from "morgan";
import chatRouter from "./routes/chatRouter";
import pythonProcess from "./runModel";

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/api/chat", chatRouter(pythonProcess));

export default app;
