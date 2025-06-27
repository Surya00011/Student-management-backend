import Student from "../models/student.model.js";

// Add new student to the database
export const addStudent = async (studentData) => {
  try {
    const student = new Student(studentData);
    await student.save();
    return student;
  } catch (error) {
    throw new Error("Error adding student: " + error.message);
  }
};

// Fetch all students belonging to a specific user 
export const getAllStudents = async (uid) => {
  try {
    const students = await Student.find({ createdBy: uid });
    return students;
  } catch (error) {
    throw new Error("Error fetching students: " + error.message);
  }
};

// Update a student only if it belongs to the user 
export const updateStudent = async (id, uid, studentData) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { _id: id, createdBy: uid }, 
      studentData,
      {
        new: true,
        runValidators: true,
      }
    );
    return updatedStudent;
  } catch (error) {
    throw new Error("Error updating student: " + error.message);
  }
};

// Delete a student only if it belongs to the user
export const deleteStudent = async (id, uid) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ _id: id, createdBy: uid });
    return deletedStudent;
  } catch (error) {
    throw new Error("Error deleting student: " + error.message);
  }
};
