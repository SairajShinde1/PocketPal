import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const History = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);

  const [transactionData, setTransactionData] = useState([]);
  const [filterTransactionData, setFilterTransactionData] = useState([]);

  const categories = [
    "Rent",
    "Bills",
    "Food",
    "Transport",
    "Shopping",
    "Health & Fitness",
    "Entertainment",
    "Education",
    "Travel",
    "Insurance",
    "Taxes",
    "Gifts & Donations",
    "Household Supplies",
    "Personal Care",
    "Miscellaneous",
    "Pocket Money",
    "Salary",
    "Freelance",
    "Investments",
    "Business",
    "Gifts",
    "Rental Income",
    "Dividends",
    "Interest",
    "Bonuses",
    "Refunds",
    "Royalties",
    "Other",
  ];

  const token = localStorage.getItem("token");
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [isEdit, setIsEdit] = useState(false);

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
  }, [transactionData]);

  const filterTransactions = () => {
    // console.log("type", type);
    // console.log("category", category);
    // console.log("fromDate", fromDate);
    // console.log("toDate", toDate);
    const filteredData = transactionData.filter((transaction) => {
      if (type && category && fromDate && toDate) {
        return (
          transaction.transactionType === type &&
          transaction.category === category &&
          new Date(transaction.date) >= new Date(fromDate) &&
          new Date(transaction.date) <= new Date(toDate)
        );
      }
      if (type && !category && fromDate && toDate) {
        return (
          transaction.transactionType === type &&
          new Date(transaction.date) >= new Date(fromDate) &&
          new Date(transaction.date) <= new Date(toDate)
        );
      }
      if (type && category) {
        return (
          transaction.transactionType === type &&
          transaction.category === category
        );
      }

      if (type && !category) {
        return transaction.transactionType === type;
      }

      if (!type && category) {
        return transaction.category === category;
      }

      if (!type && !category && (fromDate || toDate)) {
        if (fromDate && toDate) {
          return (
            new Date(transaction.date) >= new Date(fromDate) &&
            new Date(transaction.date) <= new Date(toDate)
          );
        } else if (fromDate) {
          return new Date(transaction.date) >= new Date(fromDate);
        } else if (toDate) {
          return new Date(transaction.date) <= new Date(toDate);
        }
      }

      return true;
    });

    setFilterTransactionData(filteredData);
    // console.log(filteredData);

    setFilterApplied(true);
  };

  const deleteRow = async (id) => {
    try {
      await axios
        .delete(`${BASE_URL}/api/pocketpal/delete-transaction`, {
          params: {
            id: id,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          // console.log(result);
          if (result.data.success) {
            toast.success(result.data.message, {
              position: "top-center",
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          } else {
            toast.error(result.data.message, {
              position: "top-center",
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      setTransactionData((prevData) =>
        prevData.filter((item) => item.id !== id)
      );

      // console.log("Transaction deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const [editItem, setEditItem] = useState({
    category: "",
    description: "",
    amount: "",
    date: "",
    transactionType: "",
  });

  const [editId, setEditId] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTransactionType, setEditTransactionType] = useState("");

  const handleSave = async () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const data = {
      category: editCategory,
      description: editDescription,
      amount: editAmount,
      date: editDate,
      transactionType: editTransactionType,
    };
    await axios
      .put(`${BASE_URL}/api/pocketpal/transaction-update/${editId}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        // console.log(result.data);
        if (result.data.success) {
          toast.success(result.data.message, {
            position: "top-center",
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        } else {
          toast.error(result.data.message, {
            position: "top-center",
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setFilterApplied(false);
  };
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl text-center text-emerald-600 mt-5 sm:text-3xl">
        Transaction History
      </h1>
      <ToastContainer />

      <div className="flex flex-col items-center justify-center mt-2 gap-5 sm:gap-5 px-4">
        <div className="overflow-auto max-h-[370px] w-full sm:w-[80%]">
          <table className="table-auto border-collapse border border-white w-full">
            <thead className="bg-gray-800 text-white sticky top-0 z-10">
              <tr>
                <th className="border border-white px-4 py-2">Category</th>
                <th className="border border-white px-4 py-2">Description</th>
                <th className="border border-white px-4 py-2">Amount</th>
                <th className="border border-white px-4 py-2">Date</th>
                <th className="border border-white px-4 py-2">Type</th>
                <th className="border border-white px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactionData.length === 0 ? (
                <tr>
                  <td colSpan="6">No data available</td>
                </tr>
              ) : isEdit ? (
                <tr
                  className={`${
                    editTransactionType === "Income"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
                >
                  <td className="border border-white px-4 py-2">
                    <input
                      type="text"
                      value={editCategory}
                      onChange={(e) => setEditCategory(e.target.value)}
                      className="text-black"
                    />
                  </td>
                  <td className="border border-white px-4 py-2">
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="text-black"
                    />
                  </td>
                  <td className="border border-white px-4 py-2">
                    <input
                      type="amount"
                      value={editAmount}
                      onChange={(e) => setEditAmount(e.target.value)}
                      className="text-black"
                    />
                  </td>
                  <td className="border border-white px-4 py-2">
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="text-black"
                    />
                  </td>
                  <td className="border border-white px-4 py-2">
                    <input
                      type="text"
                      value={editTransactionType}
                      onChange={(e) => setEditTransactionType(e.target.value)}
                      className="text-black"
                    />
                  </td>
                  <td className="border border-white px-4 py-2">
                    <button
                      onClick={() => {
                        setIsEdit(false);
                        handleSave();
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 border-2 border-black"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEdit(false)}
                      className="bg-red-500 text-white px-2 py-1 rounded border-2 border-black"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : !filterApplied ? (
                transactionData
                  .slice()
                  .reverse()
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
                      <td className="border border-white px-4 py-2">
                        {item.description}
                      </td>
                      <td className="border border-white px-4 py-2">
                        {item.amount}
                      </td>
                      <td className="border border-white px-4 py-2">
                        {item.date}
                      </td>
                      <td className="border border-white px-4 py-2">
                        {item.transactionType}
                      </td>
                      <td className="border border-white px-4 py-2">
                        <button
                          onClick={() => {
                            setIsEdit(true);
                            setEditId(item._id);
                            setEditCategory(item.category);
                            setEditDescription(item.description);
                            setEditAmount(item.amount);
                            setEditDate(item.date);
                            setEditTransactionType(item.transactionType);
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 border-2 border-black"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteRow(item._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded border-2 border-black"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              ) : (
                filterTransactionData
                  .slice()
                  .reverse()
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
                      <td className="border border-white px-4 py-2">
                        {item.description}
                      </td>
                      <td className="border border-white px-4 py-2">
                        {item.amount}
                      </td>
                      <td className="border border-white px-4 py-2">
                        {item.date}
                      </td>
                      <td className="border border-white px-4 py-2">
                        {item.transactionType}
                      </td>
                      <td className="border border-white px-4 py-2">
                        <button
                          onClick={() => {
                            setIsEdit(true);
                            setEditId(item._id);
                            setEditCategory(item.category);
                            setEditDescription(item.description);
                            setEditAmount(item.amount);
                            setEditDate(item.date);
                            setEditTransactionType(item.transactionType);
                          }}
                          className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 border-2 border-black"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteRow(item._id)}
                          className="bg-red-500 text-white px-2 py-1 rounded border-2 border-black"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>

        <div className="w-full sm:w-[80%] mb-5">
          <div className="sm:flex">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                filterTransactions();
              }}
              action=""
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-center"
            >
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-transparent border border-emerald-600 rounded-xl px-3 py-2 focus:outline-none w-full sm:w-auto"
                name="transactionType"
                id=""
              >
                <option
                  className="text-white font-semibold bg-[#1c1c1c]"
                  value=""
                >
                  Income /Expense
                </option>
                <option
                  className="text-white font-semibold bg-[#1c1c1c]"
                  value="Expense"
                >
                  Expense
                </option>
                <option
                  className="text-white font-semibold bg-[#1c1c1c]"
                  value="Income"
                >
                  Income
                </option>
              </select>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="categories"
                className="bg-transparent border border-emerald-600 rounded-xl px-3 py-2 focus:outline-none w-full sm:w-auto"
              >
                <option
                  className="text-white font-semibold bg-[#1c1c1c]"
                  value=""
                >
                  All Categories
                </option>
                {categories.map((category, index) => (
                  <option
                    className="text-white font-semibold bg-[#1c1c1c]"
                    key={index}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label
                  className="text-gray-400 font-semibold"
                  htmlFor="fromDate"
                >
                  From:
                </label>
                <input
                  id="fromDate"
                  className="bg-transparent border border-emerald-600 rounded-xl px-3 py-2 focus:outline-none w-full sm:w-auto"
                  type="date"
                  placeholder="From"
                  value={fromDate}
                  onChange={(e) => {
                    setFromDate(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="text-gray-400 font-semibold" htmlFor="toDate">
                  To:
                </label>
                <input
                  id="toDate"
                  className="bg-transparent border border-emerald-600 rounded-xl px-3 py-2 focus:outline-none w-full sm:w-auto"
                  type="date"
                  placeholder="To"
                  value={toDate}
                  onChange={(e) => {
                    setToDate(e.target.value);
                  }}
                />
              </div>
              <button className="border border-emerald-600 rounded-xl px-3 py-2 hover:bg-emerald-600 transition-all duration-500 mt-4 sm:mt-0 w-full sm:w-auto">
                Apply Filter
              </button>
            </form>

            <button
              className=" border border-emerald-600 rounded-xl px-3 py-2 hover:bg-emerald-600 transition-all duration-500 mt-4 sm:mt-0 w-full sm:w-auto sm:ml-2"
              onClick={() => {
                setFilterApplied(false);
                // console.log("Cleared");
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
