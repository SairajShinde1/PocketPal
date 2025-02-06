import React, { useContext } from "react";
import BarGraph from "./BarGraph";
import BarGraphSavings from "./BarGraphSavings";
import { AppContext } from "../context/AppContext";
import { useLocation } from "react-router-dom";

const BarView = () => {
  const { selectedBarGraph, setSelectedBarGraph } = useContext(AppContext);
  const location = useLocation();
  const transactionData = location.state || {};
  return (
    <div className="h-screen flex items-center justify-center">
      {selectedBarGraph === "savings" ? (
        <BarGraphSavings transactionData={transactionData} />
      ) : (
        <BarGraph transactionData={transactionData} />
      )}
    </div>
  );
};

export default BarView;
