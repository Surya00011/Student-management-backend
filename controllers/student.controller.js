import {
  addStudent as addStudentService,
  getAllStudents as getAllStudentsService,
  updateStudent as updateStudentService,
  deleteStudent as deleteStudentService,
} from "../services/student.service.js";

//Create a new student
export const addStudent = async (req, res) => {
  const { id, name, age, class: studentClass, parentContact } = req.body;

  if (!id || !name || !age || !studentClass || !parentContact) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const savedStudent = await addStudentService({
      id,
      name,
      age,
      class: studentClass,
      parentContact,
      createdBy: req.user.uid, 
    });

    return res.status(201).json({
      message: "Student added successfully",
      student: savedStudent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to add student",
      error: error.message,
    });
  }
};

// Fetch all students for the current authenticated user
export const getAllStudents = async (req, res) => {
  try {
    const students = await getAllStudentsService(req.user.uid); 
    return res.status(200).json({
      message: "Students fetched successfully",
      students,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to fetch students",
      error: error.message,
    });
  }
};

// Update a student only if it belongs to the user 
export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, age, class: studentClass, parentContact } = req.body;

 

  try {
    const updatedStudent = await updateStudentService(id, req.user.uid, {
      name,
      age,
      class: studentClass,
      parentContact,
    });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found or not yours" });
    }

    return res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to update student",
      error: error.message,
    });
  }
};

// Delete a student only if it belongs to the user
export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedStudent = await deleteStudentService(id, req.user.uid); 
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found or not yours" });
    }
    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      message: "Failed to delete student",
      error: error.message,
    });
  }
};
