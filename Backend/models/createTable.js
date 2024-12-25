const pool = require("../config/pgdb");

const createTables = async () => {
  const createStudentsTable = `
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,               -- Auto-incrementing unique ID for each student
  first_name VARCHAR(100) NOT NULL,     -- First name of the student
  last_name VARCHAR(100) NOT NULL,      -- Last name of the student
  reg_no VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,   -- Email address of the student (must be unique)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp of when the student was created
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp of when the student record was last updated
);
`;

  const createCoursesTable = `
    CREATE TABLE IF NOT EXISTS courses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      description TEXT,
      fee DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createEnrollmentsTable = `
    CREATE TABLE IF NOT EXISTS enrollments (
      id SERIAL PRIMARY KEY,
      student_id INT REFERENCES students(id) ON DELETE CASCADE,
      course_id INT REFERENCES courses(id) ON DELETE CASCADE,
      enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status VARCHAR(50) DEFAULT 'pending'
    );
  `;

  const createPaymentsTable = `
    CREATE TABLE IF NOT EXISTS payments (
      id SERIAL PRIMARY KEY,
      enrollment_id INT REFERENCES enrollments(id),
      amount_paid DECIMAL(10, 2),
      payment_status VARCHAR(50) DEFAULT 'unpaid',
      payment_date TIMESTAMP
    );
  `;

  try {
    await pool.query(createStudentsTable);
    await pool.query(createCoursesTable);
    await pool.query(createEnrollmentsTable);
    await pool.query(createPaymentsTable);
    console.log("Tables created or already exist.");
  } catch (err) {
    console.error("Error creating tables: ", err);
  }
};

module.exports = { createTables };
