import React, { useState, useEffect } from "react";
import axiosInstance from "../Api/axiosInstance";
import { useNavigate, useParams } from "react-router-dom"; // We'll use useParams to get the course id
import toast, { Toaster } from "react-hot-toast";

const UpdateCourseForm = () => {
  const [course, setCourse] = useState({ name: "", description: "", fee: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // This will be the id of the course to update
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authorization token missing");
      return;
    }

    const fetchCourse = async () => {
      try {
        const response = await axiosInstance.get(`/api/courseid/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(response.data.course);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch course data");
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authorization token missing");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/api/update-course/${id}`,
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("course updated successfully");
        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
    } catch (err) {
      setError("Failed to update course");
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {error && (
        <div className="bg-red-100 text-red-600 p-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <h2 className="text-xl font-semibold mb-4">Update Course</h2>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Course Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={course.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={course.description}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label
              htmlFor="fee"
              className="block text-sm font-medium text-gray-700"
            >
              Course Fee
            </label>
            <input
              type="number"
              id="fee"
              name="fee"
              value={course.fee}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>

          <div className="mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Update Course
            </button>
          </div>
        </form>
      )}
      <Toaster />
    </div>
  );
};

export default UpdateCourseForm;
