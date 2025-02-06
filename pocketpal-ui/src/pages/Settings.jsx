import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "react-avatar";
import { AppContext } from "../context/AppContext";

const Settings = () => {
  const { setCurrencyChanged } = useContext(AppContext);
  const [userData, setUserData] = useState({});
  const [currency, setCurrency] = useState("");
  const [month, setMonth] = useState("");
  const [goal, setGoal] = useState("");
  setCurrencyChanged(false);

  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/pocketpal/get-user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        // console.log(result.data.user);
        setUserData(result.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateData = async () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const data = {
      newUsername: userData.username,
      newPhone: userData.phone,
    };
    if (data.newUsername.trim().length < 3) {
      toast.error("Username must be at least 3 characters long.", {
        position: "top-center",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    } else if (
      String(data.newPhone).trim().length !== 10 ||
      isNaN(data.newPhone)
    ) {
      toast.error(
        "Phone number must be exactly 10 digits long and should contain numbers only",
        {
          position: "top-center",
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        }
      );
      return;
    }
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/pocketpal/user-update`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const updateCurrency = async () => {
    // console.log(currency);
    const BASE_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");
    const data = {
      newCurrency: currency,
    };
    try {
      const response = await axios.patch(
        `${BASE_URL}/api/pocketpal/update-currency`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-center",
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        setCurrencyChanged(true);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const addGoal = async () => {
    const data = {
      month: month,
      goal: goal,
    };
    if (month && goal) {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/pocketpal/set-goal`,
          data,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response.data.success) {
          toast.success(response.data.message, {
            position: "top-center",
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        } else {
          toast.error(response.data.message, {
            position: "top-center",
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
        // console.log(response.data);
      } catch (error) {
        toast.error("Something went wrong. Please try again.", {
          position: "top-center",
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } else {
      toast.error("Month or Goal field should not be empty!", {
        position: "top-center",
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
      <h1 className="text-2xl text-center text-emerald-600 ">Settings</h1>
      <ToastContainer />
      <div className="flex flex-col lg:flex-row justify-around items-center gap-6 lg:gap-0 px-4">
        {isEdit ? (
          <div className="w-full max-w-md flex flex-col items-center justify-center gap-3 p-3">
            <Avatar
              color={Avatar.getRandomColor("sitebase", [
                "red",
                "green",
                "blue",
              ])}
              className="mb-3"
              name={userData.username}
              maxInitials={2}
              size="150"
              round={true}
            />
            <div className="w-full flex justify-between">
              <label
                htmlFor="username"
                className="text-gray-600 text-lg font-medium"
              >
                Username :{" "}
              </label>
              <input
                type="text"
                className="text-3xl font-medium text-gray-400 bg-gray-800 pl-4 w-48"
                value={userData.username}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, username: e.target.value }))
                }
              />
            </div>
            <div className="w-full flex justify-between">
              <label
                htmlFor="email"
                className="text-gray-600 text-lg font-medium"
              >
                Email :{" "}
              </label>
              <p className="text-xl font-medium text-gray-400 w-48 truncate">
                {userData.email}
              </p>
            </div>
            <div className="w-full flex justify-between">
              <label
                htmlFor="contact"
                className="text-gray-600 text-lg font-medium"
              >
                Phone :{" "}
              </label>
              <input
                type="text"
                className="text-xl font-medium text-gray-400 bg-gray-800 pl-4 w-48"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>

            <button
              onClick={() => {
                setIsEdit(false);
                updateData();
              }}
              className="w-full bg-blue-600 rounded-lg px-4 py-3 text-xl font-semibold"
            >
              Save changes
            </button>
            <button
              onClick={() => {
                handleLogOut();
              }}
              className="w-full bg-blue-600 rounded-lg px-5 py-2 text-xl font-semibold"
            >
              LogOut
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md flex flex-col items-center justify-center gap-3 p-3">
            <Avatar
              color={Avatar.getRandomColor("sitebase", [
                "red",
                "green",
                "blue",
              ])}
              className="mb-3"
              maxInitials={2}
              name={userData.username}
              size="150"
              round={true}
            />
            <div className="w-full flex justify-between">
              <label
                htmlFor="username"
                className="text-gray-600 text-lg font-medium"
              >
                Username :{" "}
              </label>
              <p id="username" className="text-3xl text-gray-400 font-medium">
                {userData.username}
              </p>
            </div>
            <div className="w-full flex justify-between">
              <label
                htmlFor="email"
                className="text-gray-600 text-lg font-medium"
              >
                Email :{" "}
              </label>
              <p className="text-xl font-medium text-gray-400 truncate">
                {userData.email}
              </p>
            </div>
            <div className="w-full flex justify-between">
              <label
                htmlFor="contact"
                className="text-gray-600 text-lg font-medium"
              >
                Phone :{" "}
              </label>
              <p className="text-xl font-medium text-gray-400">
                {userData.phone}
              </p>
            </div>

            <button
              onClick={() => setIsEdit(true)}
              className="w-full bg-blue-600 rounded-lg px-4 py-3 text-xl font-semibold"
            >
              Edit Information
            </button>
            <button
              onClick={handleLogOut}
              className="w-full bg-blue-600 rounded-lg px-5 py-2 text-xl font-semibold"
            >
              LogOut
            </button>
          </div>
        )}
        <div className="w-full max-w-sm flex flex-col text-center gap-5">
          <h1 className="text-2xl font-medium text-gray-200">Savings Goal</h1>

          <div className="flex flex-col gap-3">
            <label
              className="text-center font-semibold text-gray-400"
              htmlFor="months"
            >
              Select a Month
            </label>

            <select
              required
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-transparent border border-emerald-600 rounded-xl px-3 py-2 focus:outline-none"
              name=""
              id="months"
            >
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value=""
              ></option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Jan"
              >
                January
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Feb"
              >
                February
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Mar"
              >
                March
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Apr"
              >
                April
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="May"
              >
                May
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Jun"
              >
                June
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Jul"
              >
                July
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Aug"
              >
                August
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Sep"
              >
                September
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Oct"
              >
                October
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Nov"
              >
                November
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="Dec"
              >
                December
              </option>
            </select>

            <label
              className="text-center font-semibold text-gray-400"
              htmlFor="amount"
            >
              Set Savings Goal{" "}
            </label>
            <input
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
              id="amount"
              className="px-5 py-2 rounded-xl font-semibold bg-transparent border border-emerald-600 focus:outline-none "
              type="number"
              placeholder="Amount"
            />

            <button
              onClick={addGoal}
              className="w-full bg-blue-600 rounded-lg px-5 py-2 text-xl font-semibold"
            >
              Set Goal
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <label
              className="text-center font-semibold text-gray-400"
              htmlFor="currencySelector"
            >
              Choose Currency:
            </label>

            <select
              className="bg-transparent border border-emerald-600 rounded-xl px-3 py-2 focus:outline-none"
              id="currencySelector"
              name="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value=""
              ></option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="₹"
              >
                INR - Indian Rupee
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="$"
              >
                USD - United States Dollar
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="€"
              >
                EUR - Euro
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="£"
              >
                GBP - British Pound
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="¥"
              >
                JPY - Japanese Yen
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="A$"
              >
                AUD - Australian Dollar
              </option>
              <option
                className="text-white font-semibold bg-[#1c1c1c]"
                value="C$"
              >
                CAD - Canadian Dollar
              </option>
            </select>

            <button
              onClick={() => updateCurrency()}
              className="w-full bg-blue-600 rounded-lg px-5 py-2 text-xl font-semibold"
            >
              Save Currency
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
