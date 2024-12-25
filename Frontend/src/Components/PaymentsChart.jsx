import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axiosInstance from "../Api/axiosInstance";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PaymentsChart = () => {
  const [paymentData, setPaymentData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setError("Authorization token missing");
      return;
    }
    const fetchCourses = async () => {
      try {
        const response = await axiosInstance.get("/api/summary", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);

        setPaymentData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const chartData = {
    labels: paymentData.map((payment) => payment.date),
    datasets: [
      {
        label: "Total Payments",
        data: paymentData.map((payment) => payment.total_paid),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Payments Overview",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Amount: $${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <div className="w-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default PaymentsChart;
