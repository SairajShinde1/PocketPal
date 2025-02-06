import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PieChart = ({ transactionData }) => {
  const expenseData = transactionData.reduce((acc, transaction) => {
    const category = transaction.category;

    if (transaction.transactionType === "Expense") {
      if (!acc[category]) {
        acc[category] = 0;
      }

      acc[category] += transaction.amount;
    }

    return acc;
  }, {});

  // console.log(expenseData);

  const labels = Object.keys(expenseData);
  const data = Object.values(expenseData);

  const chartdata = {
    labels: labels,
    datasets: [
      {
        label: "Expense",
        data: data,
        backgroundColor: [
          "red",
          "yellow",
          "pink",
          "blue",
          "green",
          "orange",
          "purple",
          "cyan",
          "magenta",
          "lime",
          "teal",
          "indigo",
          "brown",
          "gold",
          "violet",
          "navy",
          "coral",
          "salmon",
          "turquoise",
          "lavender",
          "maroon",
          "olive",
          "skyblue",
          "peru",
          "chartreuse",
        ],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Category-wise Expense",
        font: {
          size: 15,
          weight: "bold",
        },
        color: "rgb(5 150 105)",
        padding: {
          top: 0,
          bottom: 10,
        },
        position: "top",
      },
      legend: {
        position: "left",
        labels: {
          color: "white",
          borderWidth: 0,
          font: {
            size: 12,
          },
          boxWidth: 22,
        },
      },
    },
    layout: {
      padding: {
        top: 0,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
  };
  return (
    <div className="w-[98%] h-[98%]">
      <Pie data={chartdata} options={options} />
    </div>
  );
};

export default PieChart;
