const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const pool = require("../config/pgdb");
require("dotenv").config();

const signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(422).json({ error: "Plz Filled All Record" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      password: hashedPassword,
      role: role,
    });

    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    if (user.role === "admin") {
      // Admin specific logic (if needed)
      return res.status(200).json({
        message: "Admin logged in successfully",
        token: generateToken(user),
        username: user.name,
      });
    }

    if (user.role === "student") {
      const query = `SELECT * FROM students WHERE email = $1`;
      const result = await pool.query(query, [email]);

      if (result.rows.length === 0) {
        return res.status(400).json({ error: "Student not found" });
      }

      const student = result.rows[0];
      const token = generateToken(user);

      res.cookie("student_id", student.id, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // Cookie expires in 1 day
      });
      return res.status(200).json({
        message: "Student logged in successfully",
        token: token,
        username: user.name,
      });
    }

    return res
      .status(400)
      .json({ message: "Invalid role assigned to the user" });
    // res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Internal server Error " });
  }
};

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d", // Token expires in 1 day
    }
  );
};

const readAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal server Error " });
  }
};

const readSingleUser = async (req, res) => {
  const email = req.params.email;
  console.log(email);
  try {
    const user = await User.findOne({ email });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

const updateUserUsingQueryParams = async (req, res) => {
  const { id, name, email } = req.query;

  if (!id) {
    return res.status(400).json({ error: "User ID is required" });
  }

  if (!name && !email) {
    return res.status(400).json({
      error: "At least one field (name or email) must be provided for update",
    });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSingleUser = async (req, res) => {
  const { id } = req.query;
  console.log(id);

  try {
    const deletedUser = await User.deleteOne({ _id: id });

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully", deletedUser });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err });
  }
};

module.exports = {
  signup,
  login,
  readAllUsers,
  readSingleUser,
  deleteSingleUser,
  updateUserUsingQueryParams,
};
