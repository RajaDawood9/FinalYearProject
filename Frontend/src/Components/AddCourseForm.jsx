import React, { useState } from "react";
import axiosInstance from "../Api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AddCourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [fee, setFee] = useState(""); // Added fee state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!courseName || !description || !fee) {
      setErrorMessage("All fields are required");
      return;
    }

    // Ensuring fee is a valid number
    if (isNaN(fee) || fee <= 0) {
      setErrorMessage("Fee must be a positive number");
      return;
    }

    const token = localStorage.getItem("authToken");
    console.log(token);
    if (!token) {
      setError("Authorization token missing");
      return;
    }

    const courseData = {
      name: courseName,
      description,
      fee: parseFloat(fee), // Converting fee to a number
    };

    try {
      const response = await axiosInstance.post(
        "/api/addcourse", // Backend API URL
        courseData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Course Added successfully");
        setSuccessMessage("Course added successfully!");
        setCourseName("");
        setDescription("");
        setFee("");
        setErrorMessage("");
      } else {
        setError(response.data.message || "Failed to add student");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      toast.error("Failed to add course");
      setErrorMessage(error.response?.data?.message || "Failed to add course");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        <div>
          <label
            htmlFor="courseName"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label
            htmlFor="fee"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Course Fee
          </label>
          <input
            type="number"
            id="fee"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Add Course
          </button>
        </div>
      </form>

      {/* Display error or success message */}
      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
      <Toaster />
    </div>
  );
};

export default AddCourseForm;
