const pool = require("../config/pgdb");

const studentEnrollCourse = async (req, res) => {
  const student_id = req.cookies.student_id;

  if (!student_id) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  //   const query = `
  //       SELECT courses.id, courses.name, courses.description, courses.fee
  //       FROM enrollments
  //       JOIN courses ON enrollments.course_id = courses.id
  //       WHERE enrollments.student_id = $1;
  //     `;
  try {
    // const result = await pool.query(query, [student_id]);
    // res.json(result.rows);
    const query = `
    SELECT id, name, description, fee FROM courses;
  `;
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const enrollInCourse = async (req, res) => {
  const student_id = req.cookies.student_id;
  console.log(student_id);
  const { course_id } = req.body;

  if (!student_id) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (!course_id) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  const checkEnrollmentQuery = `
      SELECT * FROM enrollments
      WHERE student_id = $1 AND course_id = $2;
    `;
  try {
    const checkResult = await pool.query(checkEnrollmentQuery, [
      student_id,
      course_id,
    ]);

    if (checkResult.rows.length > 0) {
      return res.status(200).json({
        message: "You are already enrolled in this course",
        enrollment: checkResult.rows[0],
      });
    }
    const enrollQuery = `
        INSERT INTO enrollments (student_id, course_id)
        VALUES ($1, $2)
        RETURNING *;
      `;
    const result = await pool.query(enrollQuery, [student_id, course_id]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error enrolling in course:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getEnrolledStudents = async (req, res) => {
  const course_id = req.params.course_id;
  console.log(course_id);

  if (!course_id) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  try {
    const query = `
        SELECT 
          courses.id AS course_id,
          courses.name AS course_name,
          enrollments.enrollment_date,
          enrollments.status,
          courses.fee
        FROM enrollments
        JOIN courses ON enrollments.course_id = courses.id
        WHERE courses.id = $1;
      `;

    const result = await pool.query(query, [course_id]);

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No enrollments found for this course" });
    }
    const totalFee = result.rows.reduce((acc, row) => acc + row.fee, 0);

    const enrollments = result.rows.map((row) => ({
      course_id: row.course_id,
      course_name: row.course_name,
      enrollment_date: row.enrollment_date,
      status: row.status,
      fee: row.fee,
    }));

    res.status(200).json({ enrollments, totalFee });
  } catch (err) {
    console.error("Error fetching enrollments and total fee:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  studentEnrollCourse,
  enrollInCourse,
  getEnrolledStudents,
};
