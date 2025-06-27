import express from "express";
import {
  addStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller.js";
import { verifyFirebaseToken } from "../middlewares/fireBaseAuth.js";
const router = express.Router();

//CURD routes for student management

//protecting routes with Firebase authentication middleware
router.use(verifyFirebaseToken);
router.post("/add", addStudent);
router.get("/getAllStudents", getAllStudents);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);

export default router;
