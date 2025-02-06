import React, { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BarGraph from "../components/BarGraph";
import PieChart from "../components/PieChart";
import Amount from "../components/Amount";
import { useNavigate } from "react-router-dom";
import RecentTransactionTable from "../components/RecentTransactionTable";
import BarGraphSavings from "../components/BarGraphSavings";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const { selectedBarGraph, setSelectedBarGraph } = useContext(AppContext);
  const [transactionData, setTransactionData] = useState([]);
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/pocketpal/get-transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        // console.log(result.data.transactions);
        setTransactionData(result.data.transactions);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <h1 className="text-2xl text-center text-emerald-600 ">Dashboard</h1>

      <div className="flex-grow flex flex-col lg:flex-row gap-6 mt-3 px-6 overflow-hidden">
        <div className="w-full sm:w-[48%] lg:w-[32%] flex flex-col">
          <div
            onClick={() => {
              navigate("/bargraph", { state: transactionData });
              setSelectedBarGraph("expense");
            }}
            className="w-full h-[240px] cursor-pointer"
          >
            <BarGraph transactionData={transactionData} />
          </div>

          <div
            onClick={() => navigate("/piechart", { state: transactionData })}
            className=" w-full h-[230px] cursor-pointer"
          >
            <PieChart transactionData={transactionData} />
          </div>
        </div>

        <div id="amount" className="w-full sm:w-[48%] lg:w-[32%]  text-center">
          <div>
            <Amount transactionData={transactionData} />
          </div>
          <div
            onClick={() => {
              navigate("/bargraph", { state: transactionData });
              setSelectedBarGraph("savings");
            }}
            className="w-full h-[240px] cursor-pointer"
          >
            <BarGraphSavings transactionData={transactionData} />
          </div>
        </div>

        <div
          id="transactions"
          className=" w-full sm:w-[48%] lg:w-[32%]  text-center"
        >
          <h3 className="text-xl font-bold text-emerald-600">
            Recent Transactions
          </h3>
          <RecentTransactionTable transactionData={transactionData} />
        </div>
      </div>
    </div>
  );
};

export default Home;
