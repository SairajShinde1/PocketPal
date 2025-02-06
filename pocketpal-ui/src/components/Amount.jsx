import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Amount = ({ transactionData }) => {
  let totalIncome = 0;
  let totalExpense = 0;

  const { userData } = useContext(AppContext);

  for (let i = 0; i < transactionData.length; i++) {
    const transaction = transactionData[i];
    if (transaction.transactionType === "Income") {
      totalIncome += transaction.amount;
    } else if (transaction.transactionType === "Expense") {
      totalExpense += transaction.amount;
    }
  }

  const num = 10000000;
  const totalBalance = totalIncome - totalExpense;

  // totalIncome > num ? console.log("It is greater") : "It is lesser";
  // console.log(`Total Income: ₹${typeof totalIncome}`);
  // console.log(`Total Expense: ₹${totalExpense}`);
  // console.log(`Total Balance: ₹${totalBalance}`);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="px-10 py-5 text-center bg-orange-500 rounded-lg">
        <h1
          className={`${
            userData.totalBalance > 100000 ? "text-2xl" : "text-4xl"
          }`}
        >
          <span className="mr-3 text-black">{userData.currency}</span>

          {totalBalance.toLocaleString()}
        </h1>
        <h3 className="text-2xl">Total Balance</h3>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="px-5 py-5 text-center bg-green-500 rounded-lg">
          {totalIncome < num ? (
            <h1 className="text-4xl">
              <span className="mr-3 text-black">{userData.currency}</span>
              {totalIncome.toLocaleString()}
            </h1>
          ) : (
            <h1 className="text-2xl">
              <span className="mr-3 text-black">{userData.currency}</span>
              {totalIncome.toLocaleString()}
            </h1>
          )}

          <h3 className="text-sm">Total Income</h3>
        </div>
        <div className=" px-5 py-5 text-center bg-red-500 rounded-lg">
          {totalExpense < num ? (
            <h1 className="text-4xl">
              <span className="mr-3 text-black">{userData.currency}</span>
              {totalExpense.toLocaleString()}
            </h1>
          ) : (
            <h1 className="text-2xl">
              <span className="mr-3 text-black">{userData.currency}</span>
              {totalExpense.toLocaleString()}
            </h1>
          )}
          <h3 className="text-sm">Total Expense</h3>
        </div>
      </div>
    </div>
  );
};

export default Amount;
