import React from "react";
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

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
  Title
);

const BarGraph = ({ transactionData }) => {
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
        label: "Expense",
        data: [
          monthlyData["2025-01"],
          monthlyData["2025-02"],
          monthlyData["2025-03"],
          monthlyData["2025-04"],
          monthlyData["2025-05"],
          monthlyData["2025-06"],
          monthlyData["2025-07"],
          monthlyData["2025-08"],
          monthlyData["2025-09"],
          monthlyData["2025-10"],
          monthlyData["2025-11"],
          monthlyData["2025-12"],
        ],
        backgroundColor: ["red"],
      },
      {
        label: "Income",
        data: [
          monthlyIncomeData["2025-01"],
          monthlyIncomeData["2025-02"],
          monthlyIncomeData["2025-03"],
          monthlyIncomeData["2025-04"],
          monthlyIncomeData["2025-05"],
          monthlyIncomeData["2025-06"],
          monthlyIncomeData["2025-07"],
          monthlyIncomeData["2025-08"],
          monthlyIncomeData["2025-09"],
          monthlyIncomeData["2025-10"],
          monthlyIncomeData["2025-11"],
          monthlyIncomeData["2025-12"],
        ],
        backgroundColor: ["green"],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Monthly Income vs Expense",
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

export default BarGraph;
