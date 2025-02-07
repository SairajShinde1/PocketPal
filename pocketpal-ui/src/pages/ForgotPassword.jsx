import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`${BASE_URL}/api/pocketpal/forgot-password`, { email })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          toast.success(response.data.message, {
            position: "top-right",
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
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
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center px-5 sm:px-10 md:px-20">
      <div className="border-2 border-emerald-600 px-5 sm:px-10 md:px-10 py-5 rounded-xl w-full max-w-lg">
        <h1 className="mt-5 text-center text-3xl">Forgot Password</h1>
        <ToastContainer />

        <form
          onSubmit={handleSubmit}
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
          <button className="mt-3 text-white outline-none border-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg px-3 py-2 w-full rounded-full">
            Send Email
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
