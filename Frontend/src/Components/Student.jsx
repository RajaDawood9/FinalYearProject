import React, { useState, useEffect } from "react";
import axiosInstance from "../Api/axiosInstance";

const Student = () => {
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const availableCourses = await axiosInstance.get(
          "/api/student/course",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setCourses(availableCourses.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
        setIsAuthenticated(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle course enrollment
  const enrollInCourse = async (courseId) => {
    if (!isAuthenticated) {
      alert("You must be logged in to enroll in a course.");
      return;
    }

    const token = localStorage.getItem("authToken");
    try {
      const response = await axiosInstance.post(
        "/api/enroll",
        { course_id: courseId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setEnrolledCourses((prevCourses) => [
          ...prevCourses,
          response.data.enrollment,
        ]);
        setCourses(courses.filter((course) => course.id !== courseId));
      } else if (response.status === 200) {
        setEnrolledCourses((prevCourses) => [
          ...prevCourses,
          response.data.enrollment, // Newly enrolled course
        ]);
        setCourses(courses.filter((course) => course.id !== courseId));
      }
    } catch (err) {
      console.error("Error enrolling in course:", err);
      alert("Failed to enroll in the course. Please try again.");
    }
  };

  // Fetch enrolled students when a course is clicked
  const fetchEnrolledStudents = async (courseId) => {
    try {
      const response = await axiosInstance.get(
        `/api/getenrollStudent/${courseId}`
      );
      console.log(response);

      if (response.status === 200) {
        setEnrolledStudents(response.data.enrollments || []);
        setTotalFee(response.data.totalFee || 0);
      }
    } catch (err) {
      console.error("Error fetching enrolled students:", err);
      alert("Failed to fetch enrolled students. Please try again.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Student Dashboard</h1>

      {Array.isArray(enrolledStudents) && enrolledStudents.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Enrolled Students</h2>
          <div>
            {enrolledStudents.map((student) => (
              <div
                key={student.student_id}
                className="border p-4 mb-4 rounded-md"
              >
                <h3 className="text-xl font-semibold">
                  {student.student_name}
                </h3>
                <p>Course: {student.course_name}</p>
                <p>Status: {student.status}</p>
                <p>Enrollment Date: {student.enrollment_date}</p>
                <p>Fee: ${student.fee}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Total Fees: ${totalFee}</h3>
          </div>
        </div>
      )}

      <div className="mb-8 d-flex gap-2">
        <h2 className="text-2xl font-semibold mb-4">Enrolled Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="">
            {enrolledCourses.map((course) => (
              <div key={course.id} className="border p-4 mb-4 rounded-md">
                <h3 className="text-xl font-semibold">
                  Student ID {course.id}
                </h3>
                <p>Status :{course.status}</p>
                <p>Status :{course.enrollment_date}</p>
                <button
                  onClick={() => fetchEnrolledStudents(course.course_id)}
                  className="mt-2 px-4 py-2 bg-green-500 text-white rounded"
                >
                  View Enrolled Students
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No enrolled courses found. Please enroll in courses.</p>
        )}
      </div>

      <div className="mb-8 ">
        <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
        {courses.length > 0 ? (
          <div style={{ display: "flex", gap: "2rem" }}>
            {courses.map((course) => (
              <div key={course.id} className=" border p-4 mb-4 rounded-md">
                <h3 className="text-xl font-semibold">{course.name}</h3>
                <p>{course.description}</p>
                <p>Fee: ${course.fee}</p>
                <button
                  onClick={() => enrollInCourse(course.id)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Enroll Now
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No available courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Student;