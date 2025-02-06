import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const AddTransaction = () => {
  const [inputChecked, setInputChecked] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [transactionType, setTransactionType] = useState("Expense");

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

  useEffect(() => {
    if (inputChecked) {
      setTransactionType("Income");
    } else {
      setTransactionType("Expense");
    }
  }, [inputChecked]);

  const addTransaction = async () => {
    // console.log("category", category);
    // console.log("amount", amount);
    // console.log("amount", typeof amount, amount);
    // console.log("date", date);
    // console.log("description", description);
    // console.log("transactionType : ", transactionType);

    const BASE_URL = import.meta.env.VITE_API_URL;
    const data = {
      category: category,
      amount: amount,
      date: date,
      description: description,
      transactionType: transactionType,
    };

    const response = await axios.post(
      `${BASE_URL}/api/pocketpal/add-transaction`,
      data,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response);
    if (response.data.success) {
      toast.success(response.data.message, {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      toast.error(response.data.message, {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer newestOnTop />
      <h1 className="text-2xl text-center text-emerald-600">Add Transaction</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTransaction();
        }}
        action=""
        className="w-full flex items-center justify-center text-white px-4"
      >
        <div className="w-full md:w-[60%] lg:w-[40%] flex items-center justify-center flex-col gap-2 mt-4">
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="dropdown"
              className="text-center font-semibold text-gray-400"
            >
              Choose an option:
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="px-4 py-2 rounded-xl font-semibold bg-transparent border border-emerald-600 focus:outline-none"
              name="category"
              id="dropdown"
            >
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value=""
              ></option>
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
          </div>
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="amount"
              className="text-center font-semibold text-gray-400"
            >
              Enter Amount
            </label>
            <input
              name="amount"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              required
              id="amount"
              className="w-full px-4 py-2 rounded-xl font-semibold bg-transparent border border-emerald-600 focus:outline-none"
              type="number"
              placeholder="Amount"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="date"
              className="text-center font-semibold text-gray-400"
            >
              Date
            </label>
            <input
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              id="date"
              className="w-full px-4 py-2 rounded-xl font-semibold bg-transparent border border-emerald-600 focus:outline-none"
              type="date"
            />
          </div>
          <div className="w-full flex flex-col gap-1">
            <label
              htmlFor="description"
              className="text-center font-semibold text-gray-400"
            >
              Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="px-4 py-2 rounded-xl font-semibold bg-transparent border border-emerald-600 focus:outline-none"
              id="description"
              rows={3}
              cols={30}
            ></textarea>
          </div>
          <div className="w-full text-white flex items-center justify-around">
            <p
              className={`text-xl sm:text-2xl text-gray-400 font-semibold ${
                !inputChecked ? "text-red-500" : "text-gray-400"
              }`}
            >
              Expense
            </p>
            <div className="flex items-center justify-center mt-1">
              <input
                onChange={() => {
                  inputChecked ? setInputChecked(false) : setInputChecked(true);
                }}
                className="hidden peer"
                type="checkbox"
                id="dark-mode"
              />
              <label
                className={`absolute w-[60px] sm:w-[60px] h-[30px] sm:h-[32px] bg-gray-200 rounded-full cursor-pointer transition-colors duration-300 ${
                  inputChecked ? "bg-green-500" : "bg-red-500"
                }`}
                htmlFor="dark-mode"
              >
                <div
                  className={`w-[26px] sm:w-[26px] h-[24px] sm:h-[26px] bg-white rounded-full top-[3px] absolute left-[3px] ${
                    inputChecked ? "animate-toggleOn" : "animate-toggleOff"
                  }`}
                ></div>
              </label>
            </div>
            <p
              className={`text-xl sm:text-2xl text-gray-400 font-semibold ${
                inputChecked ? "text-green-500" : "text-gray-400"
              }`}
            >
              Income
            </p>
          </div>
          <button className="text-lg sm:text-2xl text-white border border-emerald-500 px-6 sm:px-8 py-2 mt-2 rounded-full hover:bg-emerald-600 hover:text-black transition-all duration-500">
            Save Transaction
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
