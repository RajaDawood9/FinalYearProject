const pool = require("../config/pgdb");

const adminPayments = async (req, res) => {
  const { enrollment_id, amount_paid, payment_status, payment_date } = req.body;

  const query = `
      INSERT INTO payments (enrollment_id, amount_paid, payment_status, payment_date)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
  const values = [enrollment_id, amount_paid, payment_status, payment_date];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating payment:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getPaymentsSummary = async (req, res) => {
  try {
    const query = `
        SELECT 
          TO_CHAR(payment_date, 'YYYY-MM-DD') AS date,
          SUM(amount_paid) AS total_paid
        FROM payments
        GROUP BY date
        ORDER BY date DESC;
      `;

    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching payment summary:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createStudent = async (req, res) => {
  const { first_name, last_name, email, reg_no } = req.body;
  if (!first_name || !last_name || !email || !reg_no) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const checkQuery = "SELECT * FROM students WHERE email = $1 OR reg_no = $2";
  const checkValues = [email, reg_no];

  try {
    const existingStudent = await pool.query(checkQuery, checkValues);
    if (existingStudent.rows.length > 0) {
      return res.status(400).json({
        message: "Student with this email or roll number already exists.",
      });
    }

    const insertQuery = `
        INSERT INTO students (first_name, last_name, email, reg_no)
        VALUES ($1, $2, $3, $4) RETURNING *;
      `;
    const result = await pool.query(insertQuery, [
      first_name,
      last_name,
      email,
      reg_no,
    ]);
    res.status(201).json({ student: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create student." });
  }
};

const getAllStudents = async (req, res) => {
  const getQuery = "SELECT * FROM students";

  try {
    const result = await pool.query(getQuery);
    res.status(200).json({ students: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve students." });
  }
};

const createCourse = async (req, res) => {
  const { name, description, fee } = req.body;
  if (!name || !description || !fee) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const insertQuery = `
      INSERT INTO courses (name, description, fee)
      VALUES ($1, $2, $3) RETURNING *;
    `;
  try {
    const result = await pool.query(insertQuery, [name, description, fee]);
    res.status(201).json({ course: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create course." });
  }
};

const getAllCourses = async (req, res) => {
  const selectQuery = `
      SELECT * FROM courses; 
    `;

  try {
    const result = await pool.query(selectQuery);
    res.status(200).json({ courses: result.rows });
  } catch (err) {
    res.status(500).json({ message: "Failed to retrieve courses." });
  }
};
const getCourseById = async (req, res) => {
  const { id } = req.params;

  const query = `
      SELECT * FROM courses WHERE id = $1;
    `;
  const values = [id];

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json({ course: result.rows[0] });
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ message: "Failed to fetch course." });
  }
};
const getStudentById = async (req, res) => {
  const { id } = req.params;

  const query = `
      SELECT * FROM students WHERE id = $1;
    `;
  const values = [id];

  try {
    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ student: result.rows[0] });
  } catch (err) {
    console.error("Error fetching student:", err);
    res.status(500).json({ message: "Failed to fetch student." });
  }
};
const updateStudent = async (req, res) => {
  const { id } = req.params; // Get student id from URL params
  const { first_name, last_name, email, reg_no } = req.body; // Get new student details from request body

  if (!first_name || !last_name || !email || !reg_no) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const checkQuery =
    "SELECT * FROM students WHERE (email = $1 OR reg_no = $2) AND id != $3";
  const checkValues = [email, reg_no, id];

  try {
    const existingStudent = await pool.query(checkQuery, checkValues);
    if (existingStudent.rows.length > 0) {
      return res.status(400).json({
        message: "Student with this email or roll number already exists.",
      });
    }

    const updateQuery = `
        UPDATE students
        SET first_name = $1, last_name = $2, email = $3, reg_no = $4
        WHERE id = $5
        RETURNING *;
      `;
    const values = [first_name, last_name, email, reg_no, id];
    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(500).json({ message: "Failed to update student." });
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description, fee } = req.body;

  if (!name || !description || !fee) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const updateQuery = `
      UPDATE courses
      SET name = $1, description = $2, fee = $3
      WHERE id = $4
      RETURNING *;
    `;
  const values = [name, description, fee, id];

  try {
    const result = await pool.query(updateQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res
      .status(200)
      .json({ message: "Course updated successfully", course: result.rows[0] });
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ message: "Failed to update course." });
  }
};

const deleteStudent = async (req, res) => {
  const { id } = req.params;

  const deleteQuery = `
      DELETE FROM students
      WHERE id = $1
      RETURNING *;
    `;
  const values = [id];

  try {
    const result = await pool.query(deleteQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student deleted successfully",
      student: result.rows[0],
    });
  } catch (err) {
    console.error("Error deleting student:", err);
    res.status(500).json({ message: "Failed to delete student." });
  }
};

const deleteCourse = async (req, res) => {
  const { id } = req.params;

  const deleteQuery = `
      DELETE FROM courses
      WHERE id = $1
      RETURNING *;
    `;
  const values = [id];

  try {
    const result = await pool.query(deleteQuery, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Course not found" });
    }

    res
      .status(200)
      .json({ message: "Course deleted successfully", course: result.rows[0] });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ message: "Failed to delete course." });
  }
};

module.exports = {
  createStudent,
  createCourse,
  getAllStudents,
  getAllCourses,
  adminPayments,
  getPaymentsSummary,
  updateStudent,
  updateCourse,
  deleteStudent,
  deleteCourse,
  getCourseById,
  getStudentById,
};
