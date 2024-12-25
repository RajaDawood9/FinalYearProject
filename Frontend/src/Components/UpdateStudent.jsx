import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../Api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const UpdateStudent = () => {
  const { id } = useParams(); // Get the student ID from the URL
  const navigate = useNavigate();
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    email: "",
    reg_no: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the student data when the component is mounted
  useEffect(() => {
    const fetchStudent = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("Authorization token missing");
        setLoading(false);
        return;
      }
      try {
        const response = await axiosInstance.get(`/api/studentid/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudent(response.data.student);
        setLoading(false);
      } catch (err) {
        setError("Error fetching student data");
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { first_name, last_name, email, reg_no } = student;

    if (!first_name || !last_name || !email || !reg_no) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/api/update-student/${id}`,
        student,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      // Redirect to the student list after successful update
      if (response.status === 200) {
        toast.success("Student updated successfully!");

        setTimeout(() => {
          navigate("/admin");
        }, 1000);
      }
    } catch (err) {
      setError("Error updating student");
      toast.error("Error updating student!");
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Update Student</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={student.first_name}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={student.last_name}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Registration Number
          </label>
          <input
            type="text"
            name="reg_no"
            value={student.reg_no}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Update Student
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default UpdateStudent;
