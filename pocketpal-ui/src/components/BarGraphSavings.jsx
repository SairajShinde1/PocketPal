import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  Title,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  Title
);

const BarGraphSavings = ({ transactionData }) => {
  const monthlyData = transactionData.reduce((acc, transaction) => {
    const month = transaction.date.substring(0, 7);
    if (!acc[month]) {
      acc[month] = 0;
    }

    if (transaction.transactionType === "Expense") {
      acc[month] += transaction.amount;
    }

    return acc;
  }, {});
  const monthlyIncomeData = transactionData.reduce((acc, transaction) => {
    const month = transaction.date.substring(0, 7);

    if (!acc[month]) {
      acc[month] = 0;
    }

    if (transaction.transactionType === "Income") {
      acc[month] += transaction.amount;
    }

    return acc;
  }, {});
  // console.log(monthlyData);

  const [goalsData, setGoalsData] = useState({});

  useEffect(() => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    axios
      .get(`${BASE_URL}/api/pocketpal/get-goal`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        // console.log(result.data.goals);
        setGoalsData(result.data.goals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(goalsData);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const goalsArray = months.map((month) => {
    const goalEntry = Array.isArray(goalsData)
      ? goalsData.find((g) => g.month === month)
      : null;
    return goalEntry ? goalEntry.goal : 0;
  });

  // console.log(goalsArray);

  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Savings",
        data: [
          monthlyIncomeData["2025-01"] - monthlyData["2025-01"],
          monthlyIncomeData["2025-02"] - monthlyData["2025-02"],
          monthlyIncomeData["2025-03"] - monthlyData["2025-03"],
          monthlyIncomeData["2025-04"] - monthlyData["2025-04"],
          monthlyIncomeData["2025-05"] - monthlyData["2025-05"],
          monthlyIncomeData["2025-06"] - monthlyData["2025-06"],
          monthlyIncomeData["2025-07"] - monthlyData["2025-07"],
          monthlyIncomeData["2025-08"] - monthlyData["2025-08"],
          monthlyIncomeData["2025-09"] - monthlyData["2025-09"],
          monthlyIncomeData["2025-10"] - monthlyData["2025-10"],
          monthlyIncomeData["2025-11"] - monthlyData["2025-11"],
          monthlyIncomeData["2025-12"] - monthlyData["2025-12"],
        ],
        backgroundColor: ["blue"],
      },
      {
        label: "Goal",
        data: goalsArray,
        backgroundColor: ["green"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Monthly Savings",
        font: {
          size: 20,
          weight: "bold",
        },
        color: "rgb(5 150 105)",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      legend: {
        labels: {
          color: "white",
        },
      },
    },

    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
  };

  return (
    <div className="w-[98%] h-[98%]">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarGraphSavings;
