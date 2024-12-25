import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../Api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const AddStudentForm = () => {
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [reg_no, setRegistration] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("authToken"); // Assuming the token is stored in localStorage
    console.log(token);
    if (!token) {
      setError("Authorization token missing");
      return;
    }

    const studentData = {
      first_name,
      last_name,
      email,
      reg_no,
    };

    try {
      setLoading(true);
      setError(null);

     
      const response = await axiosInstance.post(
        "/api/add", // Backend API URL
        studentData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Handle successful submission
        toast.success("Student added successfully");
        setFirst(""); // Reset form fields
        setLast("");
        setEmail("");
        setRegistration("");
      } else {
        setError(response.data.message || "Failed to add student");
      }
    } catch (error) {
      console.error("Request failed:", error);
      toast.error("student not added ");
      setError("An error occurred while adding the student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4"
      >
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md">{error}</div>
        )}

        <div>
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            value={first_name}
            onChange={(e) => setFirst(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            value={last_name}
            onChange={(e) => setLast(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="registration"
            className="block text-sm font-medium text-gray-700 text-left"
          >
            Registration Number
          </label>
          <input
            type="text"
            id="registration"
            value={reg_no}
            onChange={(e) => setRegistration(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mt-4">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Student"}
          </button>
        </div>
      </form>
      <Toaster />
    </>
  );
};

export default AddStudentForm;
