import React, { useState, useContext, useEffect } from "react";
import Register from "./Register";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [email, setEmail] = useState("demouser@gmail.com");
  const [password, setPassword] = useState("demouser");
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);

  const userData = {
    email: email,
    password: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.info(
      "PocketPal is deployed on a free Render plan, so the first login or action may take some time. Please be patient. Sorry for the inconvenience!",

      {
        position: "top-center",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );

    const BASE_URL = import.meta.env.VITE_API_URL;
    console.log(BASE_URL);

    const response = await axios.post(
      `${BASE_URL}/api/pocketpal/login`,
      userData
    );
    if (response.data.success) {
      toast.success(response.data.message, {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);

      navigate("/home");
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

  useEffect(() => {
    toast.info(
      "A demo user account is provided for trial purposes. If you prefer, you can register a new account, log in, and explore the application.",
      {
        position: "top-center",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      }
    );
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center px-5 sm:px-10 md:px-20">
      <div className="border-2 border-emerald-600 px-5 sm:px-10 md:px-20 py-10 rounded-xl w-full max-w-lg">
        <h1 className="mt-5 text-center text-3xl">Login</h1>
        <ToastContainer newestOnTop />

        <hr className="mt-2 border-emerald-600 border-2 rounded-full" />
        <form
          onSubmit={(e) => {
            handleLogin(e);
          }}
          action=""
          className="mt-10 flex flex-col items-center justify-center gap-3 mb-10"
        >
          <input
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
            placeholder="Enter your Email"
            className="outline-none bg-transparent border-2 border-emerald-600 text-xl px-5 py-5 rounded-full placeholder:text-gray-400 w-full"
          />
          <div className="flex flex-col w-full">
            <input
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Enter your password"
              className="outline-none bg-transparent border-2 border-emerald-600 text-xl px-5 py-5 rounded-full mt-3 placeholder:text-gray-400 w-full"
            />
            <Link
              to="/forgot-password"
              className="mx-5 mt-2 text-sm text-gray-300 hover:underline hover:font-semibold"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="mt-3 text-white outline-none border-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg px-3 py-2 w-full rounded-full"
          >
            Login
          </button>
          <p className="text-sm text-gray-300 ">
            Don't have an account?
            <Link
              to="/register"
              className="text-sm text-gray-300 hover:underline hover:font-semibold pl-2"
            >
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
