import React, { useState, useEffect } from "react";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ShowCourses = () => {
  // State variables to handle courses, loading, and error
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authorization token missing");
      return;
    }
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/api/getAllCourses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        setCourses(response.data.courses);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const onDeleteCourse = async (courseId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authorization token missing");
      return;
    }

    try {
      await axiosInstance.delete(`/api/course/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove the course from the local state if deletion is successful
      setCourses(courses.filter((course) => course.id !== courseId));
      toast.success("Course deleted successfully!");
    } catch (err) {
      toast.error("Error deleting");
      setError("Failed to delete course");
      console.error(err);
    }
  };
  const onUpdateCourse = (courseId) => {
    console.log("kg");

    navigate(`/update-course/${courseId}`); // Navigate to update form for the selected course
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Course List</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Course Name</th>
              <th className="px-4 py-2 border-b">Description</th>
              <th className="px-4 py-2 border-b">Fee</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-4 py-2 border-b">{course.name}</td>
                  <td className="px-4 py-2 border-b">{course.description}</td>
                  <td className="px-4 py-2 border-b">{course.fee}</td>
                  <td className="px-4 py-2 border-b">
                    {/* Update and Delete buttons */}
                    <button
                      onClick={() => onUpdateCourse(course.id)}
                      className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded-md mr-2"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => onDeleteCourse(course.id)}
                      className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded-md "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="px-4 py-2 text-center">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      <Toaster />
    </div>
  );
};

export default ShowCourses;
