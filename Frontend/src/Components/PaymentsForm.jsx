import React, { useState } from "react";
import axiosInstance from "../Api/axiosInstance";
import toast, { Toaster } from "react-hot-toast";

const PaymentsForm = () => {
  const [enrollmentId, setEnrollmentId] = useState("");
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("paid");
  const [paymentDate, setPaymentDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const paymentData = {
      enrollment_id: enrollmentId,
      amount_paid: amountPaid,
      payment_status: paymentStatus,
      payment_date: paymentDate,
    };

    try {
      const token = localStorage.getItem("authToken");
      const response = await axiosInstance.post("/api/payments", paymentData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      alert("Payment Created Successfully");
      console.log(response.data);
    } catch (err) {
      console.error("Error creating payment:", err);
      alert("Error creating payment.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2 text-left"
            htmlFor="enrollmentId"
          >
            Enrollment ID
          </label>
          <input
            type="number"
            id="enrollmentId"
            value={enrollmentId}
            onChange={(e) => setEnrollmentId(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2 text-left"
            htmlFor="amountPaid"
          >
            Amount Paid
          </label>
          <input
            type="number"
            id="amountPaid"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2 text-left"
            htmlFor="paymentStatus"
          >
            Payment Status
          </label>
          <select
            id="paymentStatus"
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-2 text-left"
            htmlFor="paymentDate"
          >
            Payment Date
          </label>
          <input
            type="date"
            id="paymentDate"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Create Payment
        </button>
      </form>
      <Toaster />
    </div>
  );
};

export default PaymentsForm;