import React, { useEffect, useState } from "react";

const RecentTransactionTable = ({ transactionData }) => {
  return (
    <div>
      <table className="mt-5 table-auto border-collapse border border-white w-full overflow-y-auto">
        <thead>
          <tr>
            <th className="border border-white px-4 py-2">Category</th>
            <th className="border border-white px-4 py-2">Date</th>
            <th className="border border-white px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.length === 0 ? (
            <tr>
              <td>No data available</td>
            </tr>
          ) : (
            transactionData
              .slice()
              .reverse()
              .slice(0, 7)
              .map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    item.transactionType === "Income"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  <td className="border border-white px-4 py-2">
                    {item.category}
                  </td>
                  <td className="border border-white px-4 py-2">{item.date}</td>
                  <td className="border border-white px-4 py-2">
                    {item.amount}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactionTable;
