// backend/routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  readAllUsers,
  readSingleUser,
  deleteSingleUser,
  updateUserUsingQueryParams,
} = require("../Controllers/userController.js");
const loginLimiter = require("../middlewares/rateLimit.js");
const {
  createStudent,
  getAllStudents,
  createCourse,
  getAllCourses,
  updateStudent,
  updateCourse,
  adminPayments,
  getPaymentsSummary,
  deleteStudent,
  deleteCourse,
  getCourseById,
  getStudentById,
} = require("../Controllers/adminController.js");
const {
  studentEnrollCourse,
  enrollInCourse,
  makePayment,
  getEnrolledStudents,
} = require("../Controllers/studentControllers.js");
const { authenticateAdmin } = require("../middlewares/Authnticate.js");
const { authenticateStudent } = require("../middlewares/stdAuthenticate.js");

router.post("/signup", signup);

router.post("/login", loginLimiter, login);
router.get("/alluser", readAllUsers);
router.get("/singleuser/:email", readSingleUser);
router.delete("/deleteuser", deleteSingleUser);
router.put("/updatesingle", updateUserUsingQueryParams);
router.post("/add", authenticateAdmin, createStudent);
// For Student Routes
router.get("/getallStudents", authenticateAdmin, getAllStudents);
router.put("/update-student/:id", authenticateAdmin, updateStudent);
router.delete("/student/:id", authenticateAdmin, deleteStudent);
router.get("/studentid/:id", authenticateAdmin, getStudentById);
// For Course Routes
router.get("/getAllCourses", authenticateAdmin, getAllCourses);
router.post("/addcourse", authenticateAdmin, createCourse);
router.delete("/course/:id", authenticateAdmin, deleteCourse);
router.put("/update-course/:id", authenticateAdmin, updateCourse);
router.get("/courseid/:id", authenticateAdmin, getCourseById);
// For admin and student Routes
router.post("/payments", authenticateAdmin, adminPayments);
router.get("/summary", authenticateAdmin, getPaymentsSummary);
router.get("/student/course", authenticateStudent, studentEnrollCourse);
router.post("/enroll", authenticateStudent, enrollInCourse); // Enroll in a course
router.get("/getenrollStudent/:course_id", getEnrolledStudents);

module.exports = router;
