import React, { useState } from "react";
import Login from "./Login";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRegistered, setUserRegistered] = useState();
  const navigate = useNavigate();

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  const data = {
    username: name,
    phone: phone,
    email: email,
    password: password,
  };

  const registerUser = async () => {
    if (data.username.trim().length < 3) {
      toast.error("Username must be at least 3 characters long.", {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (data.phone.trim().length < 10 || data.phone.trim().length > 10) {
      toast.error("Phone number must be 10 digits long.", {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (isNaN(data.phone.trim())) {
      toast.error("Phone number must contain only numbers.", {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (data.email.trim().length < 13) {
      toast.error("Email must be at least 13 characters long.", {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (!isValidEmail(data.email.trim())) {
      toast.error("Invalid Email format", {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        position: "top-right",
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } else {
      const BASE_URL = import.meta.env.VITE_API_URL;

      const response = await axios.post(
        `${BASE_URL}/api/pocketpal/register`,
        data
      );
      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });

        setName("");
        setEmail("");
        setPhone("");
        setPassword("");

        setTimeout(() => {
          navigate("/login");
        }, 4000);
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center px-5 sm:px-10 md:px-20">
      <div className="border-2 border-emerald-600 px-5 sm:px-10 md:px-20 rounded-xl w-full max-w-lg">
        <h1 className="mt-5 text-center text-3xl">Register</h1>
        <ToastContainer newestOnTop />
        <hr className="mt-2 border-emerald-600 border-2 rounded-full" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            registerUser();
          }}
          action=""
          className="mt-8 flex flex-col items-center justify-center gap-3 mb-9"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="username"
            required
            type="text"
            placeholder="Username"
            className="outline-none bg-transparent border-2 border-emerald-600 text-xl px-5 py-5 rounded-full placeholder:text-gray-400 w-full"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
            required
            type="text"
            placeholder="Contact No"
            className="outline-none bg-transparent border-2 border-emerald-600 text-xl px-5 py-5 rounded-full placeholder:text-gray-400 w-full"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
            type="email"
            placeholder="Enter your Email"
            className="outline-none bg-transparent border-2 border-emerald-600 text-xl px-5 py-5 rounded-full placeholder:text-gray-400 w-full"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
            type="password"
            placeholder="Enter your password"
            className="outline-none bg-transparent border-2 border-emerald-600 text-xl px-5 py-5 rounded-full placeholder:text-gray-400 w-full"
          />

          <div className="w-full">
            <button className="mt-3 text-white outline-none border-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg px-3 py-2 w-full rounded-full mb-2">
              Register
            </button>
            <p className="text-sm text-gray-300 pl-3">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:underline hover:font-semibold"
              >
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
