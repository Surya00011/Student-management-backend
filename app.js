import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/DbConnection.js";
import studentRoutes from "./routes/student.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/students", studentRoutes);

connectDB();

const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
