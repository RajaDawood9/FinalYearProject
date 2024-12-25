import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import "./App.css";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import Admin from "./Components/Admin";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Student from "./Components/Student";
import Contact from "./Components/Contact";
import About from "./Components/About";
import UpdateCourseForm from "./Components/UpdateCourseForm";
import UpdateStudent from "./Components/UpdateStudent";
function App() {
  const [userRole, setUserRole] = useState(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken.role; // Return role from token if available
    }
    return null;
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role); // Set user role if token exists
    }
  }, []);
  return (
    <>
      <div>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={<Login setUserRole={setUserRole} />}
            />
            <Route exact path="/signup" element={<Signup />} />
            <Route
              path="/admin"
              element={
                userRole === "admin" ? <Admin /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/update-course/:id"
              element={
                userRole === "admin" ? (
                  <UpdateCourseForm />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            <Route
              path="/student"
              element={
                userRole === "student" ? <Student /> : <Navigate to="/login" />
              }
            />
            <Route
              path="/update-student/:id"
              element={
                userRole === "admin" ? (
                  <UpdateStudent />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
