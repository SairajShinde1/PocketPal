import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const BudgetManagement = () => {
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
    "Other",
  ];

  const [formData, setFormData] = useState({
    categoryType: "",
    budgetAmount: "",
  });

  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [cards, setCards] = useState([]);

  const [transactionData, setTransactionData] = useState([]);
  const token = localStorage.getItem("token");

  const BASE_URL = import.meta.env.VITE_API_URL;

  const data = {
    category: category,
    budgetAmount: amount,
  };

  const handleBudget = async (e) => {
    e.preventDefault();
    const response = await axios
      .post(`${BASE_URL}/api/pocketpal/set-budget`, data, {
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

    setCategory("");
    setAmount("");
  };

  const handleDeleteCard = async (index) => {
    const updatedCards = [...budgetCards];
    updatedCards.splice(index, 1);
    // console.log(budgetCards[index]);

    const data = {
      category: budgetCards[index].category,
      id: budgetCards[index]._id,
    };
    await axios
      .delete(`${BASE_URL}/api/pocketpal/delete-budgets`, {
        params: {
          id: data.id,
          category: data.category,
        },
        headers: { Authorization: `Bearer ${token}` },
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

    setBudgetCards(updatedCards);
  };

  const [budgetCards, setBudgetCards] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/pocketpal/get-transactions`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        // console.log(result.data.transactions)
        setTransactionData(result.data.transactions);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/pocketpal/get-budgets`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        // console.log(result.data.budgets.category);
        setBudgetCards(result.data.budgets);
      })
      .catch((err) => console.log(err));
  }, [budgetCards]);

  function calculateExpense(category) {
    let spent = 0;

    transactionData.filter((transaction) => {
      if (transaction.category === category) {
        spent += transaction.amount;
      }
    });
    // console.log(spent);
    return spent;
  }
  return (
    <div>
      <Navbar />
      <h1 className="text-2xl text-center text-emerald-600 ">Manage Budgets</h1>
      <ToastContainer />

      <div className="flex items-center justify-between flex-col sm:flex-row px-10 h-full w-full gap-10">
        <div className="w-[40%] h-full flex flex-col items-center gap-5">
          <h1 className="text-2xl font-semibold text-indigo-500">Set Budget</h1>
          <div className="flex max-h-[400px]">
            <form
              onSubmit={handleBudget}
              action=""
              className="flex flex-col gap-5"
            >
              <label
                htmlFor="dropdown"
                className="text-center font-semibold text-gray-400 "
              >
                Select a Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
                className="bg-transparent border border-emerald-600 rounded-xl px-3 py-2 focus:outline-none"
                name=""
                id="dropdown"
              >
                <option
                  className="text-white font-semibold bg-[#1c1c1c]"
                  value=""
                >
                  Categories
                </option>
                {categories.map((item, index) => (
                  <option
                    className="text-white font-semibold bg-[#1c1c1c]"
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
              <label
                htmlFor="amount"
                className="text-center font-semibold text-gray-400"
              >
                Enter Amount
              </label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                id="amount"
                className=" px-5 py-2 rounded-xl font-semibold bg-transparent border border-emerald-600 focus:outline-none "
                type="number"
                placeholder="Amount"
              />
              <button className="border border-emerald-600 rounded-xl px-3 py-2 hover:bg-emerald-600 transition-all duration-500 mt-5">
                Set Budget
              </button>
            </form>
          </div>
        </div>
        <div className="w-[70%] h-full flex flex-col gap-3 mt-5">
          <div className="w-full">
            <h1 className="text-2xl font-medium text-center text-indigo-500">
              Current Budgets
            </h1>
          </div>
          <div className="w-full h-full sm:flex-row sm:overflow-x-auto flex flex-col items-center gap-1">
            {budgetCards.map((card, index) => (
              <div key={index} className="flex flex-col gap-3">
                <div className="w-[350px] h-[200px] p-4 bg-transparent rounded-lg">
                  <div className="flex justify-between pb-2">
                    <div></div>
                    <h1 className="text-xl text-center text-emerald-500 font-medium">
                      {card.category}
                    </h1>

                    <button
                      onClick={() => {
                        handleDeleteCard(index);
                      }}
                      className="text-gray-500"
                    >
                      X
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-5 mb-2">
                    <p className="text-lg text-gray-500 font-medium">
                      Budget:{" "}
                      <span className="text-gray-300">{card.budgetAmount}</span>
                    </p>
                    <p className="text-lg text-gray-500 font-medium">||</p>
                    <p className="text-lg text-gray-500 font-medium">
                      Spent:{" "}
                      <span className="text-gray-300">
                        {calculateExpense(card.category)}
                      </span>
                    </p>
                  </div>
                  <div className="relative flex justify-center pb-2">
                    <progress
                      className="w-full h-7 border-2 border-gray-200 rounded-lg overflow-hidden appearance-none"
                      id="progressBar"
                      value={Math.round(
                        (calculateExpense(card.category) * 100) /
                          card.budgetAmount
                      )}
                      max="100"
                    ></progress>
                    <div className="absolute w-[20px] h-[20px] text-lg font-semibold text-gray-900">
                      {Math.round(
                        (calculateExpense(card.category) * 100) /
                          card.budgetAmount
                      )}
                      %
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-lg text-gray-500 font-medium">
                      Remaining:{" "}
                      <span className="text-gray-300">
                        {card.budgetAmount - calculateExpense(card.category)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetManagement;
