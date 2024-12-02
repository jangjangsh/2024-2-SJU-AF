import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/ask-sejong");

const database = mongoose.connection;

database.on("error", (err) => {
  console.log("Database Error!", err);
});

database.once("open", () => {
  console.log("DB Connected");
});
