import React from "react";
import PieChart from "./PieChart";
import { useLocation } from "react-router-dom";

const PieView = () => {
  const location = useLocation();
  const transactionData = location.state;

  return (
    <div className="h-screen flex items-center justify-center">
      <PieChart transactionData={transactionData} />
    </div>
  );
};

export default PieView;
