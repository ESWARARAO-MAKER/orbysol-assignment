import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import dataRoute from './routes/dataRoute.js'
const app = express();
dotenv.config();
const port = process.env.PORT || 4000;


const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected!");
});

//middlewares
app.use(cors())
app.use(express.json());

app.use("/api/data", dataRoute)

app.listen(port, () => {
  connect();
  console.log("Connected to backend.");
});