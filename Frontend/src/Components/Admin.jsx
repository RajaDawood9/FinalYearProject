import React, { useState } from "react";
import AddStudentForm from "./AddStudentForm";
import AddCourseForm from "./AddCourseForm";
import ShowStudents from "./ShowStudents";
import ShowCourses from "./ShowCourses";
import PaymentsForm from "./PaymentsForm";
import PaymentsChart from "./PaymentsChart"; // Import PaymentsChart
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [selectedForm, setSelectedForm] = useState("");
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <div className="p-4 text-xl font-semibold">Admin Panel</div>
          <div className="mt-10">
            {/* Buttons for navigation */}
            <button
              onClick={() => setSelectedForm("student")}
              className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
                selectedForm === "student" ? "bg-gray-700" : ""
              }`}
            >
              Add Student
            </button>
            <button
              onClick={() => setSelectedForm("course")}
              className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
                selectedForm === "course" ? "bg-gray-700" : ""
              }`}
            >
              Add Course
            </button>
            <button
              onClick={() => setSelectedForm("payments")}
              className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
                selectedForm === "payments" ? "bg-gray-700" : ""
              }`}
            >
              Manage Payments
            </button>
            <button
              onClick={() => setSelectedForm("paymentsChart")}
              className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
                selectedForm === "paymentsChart" ? "bg-gray-700" : ""
              }`}
            >
              Payments Overview
            </button>
            <button
              onClick={() => setSelectedForm("showstudents")}
              className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
                selectedForm === "showstudents" ? "bg-gray-700" : ""
              }`}
            >
              Show Students
            </button>
            <button
              onClick={() => setSelectedForm("showcourses")}
              className={`w-full py-2 px-4 text-left hover:bg-gray-700 ${
                selectedForm === "showcourses" ? "bg-gray-700" : ""
              }`}
            >
              Show Courses
            </button>
          </div>

          {/* Logout Button */}
          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full py-2 px-4 text-left hover:bg-red-600 mt-10 bg-red-500"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-10 bg-gray-100">
          <h2 className="text-2xl font-semibold mb-6">
            {selectedForm === "student"
              ? "Add Student"
              : selectedForm === "course"
              ? "Add Course"
              : selectedForm === "showstudents"
              ? "Students List"
              : selectedForm === "showcourses"
              ? "Courses List"
              : selectedForm === "payments"
              ? "Payments Form"
              : selectedForm === "paymentsChart"
              ? "Payments Overview"
              : ""}
          </h2>
          {/* Conditional rendering based on selected form */}
          {selectedForm === "student" && <AddStudentForm />}
          {selectedForm === "course" && <AddCourseForm />}
          {selectedForm === "showstudents" && (
            <ShowStudents students={students} />
          )}
          {selectedForm === "showcourses" && <ShowCourses courses={courses} />}
          {selectedForm === "payments" && <PaymentsForm />}
          {selectedForm === "paymentsChart" && <PaymentsChart />}{" "}
          {/* Show PaymentsChart */}
        </div>
      </div>
    </div>
  );
};

export default Admin;
