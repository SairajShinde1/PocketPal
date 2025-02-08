import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  Route,
  Router,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import BarGraph from "./components/BarGraph";
import BarView from "./components/BarView";
import PieView from "./components/PieView";
import BudgetManagement from "./pages/BudgetManagement";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const RootRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    navigate(token ? "/home" : "/login");
  }, []);
  return null;
};

const App = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <div>
      <AuthHandler />
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route
          path="/reset-password/:id/:token"
          element={<ResetPassword />}
        ></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-transactions" element={<AddTransaction />} />
        <Route path="/history" element={<History />} />
        <Route path="/budget-management" element={<BudgetManagement />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/bargraph" element={<BarView />} />
        <Route path="/piechart" element={<PieView />} />
      </Routes>
    </div>
  );
};

import { useEffect, useRef } from "react";

const AuthHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false; // Prevent first render execution
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      if (
        !location.pathname.startsWith("/reset-password") &&
        !location.pathname.startsWith("/forgot-password") &&
        !location.pathname.startsWith("/register")
      ) {
        navigate("/login");
      }
    } else {
      // Allow navigation to authenticated routes instead of forcing /home
      const allowedRoutes = [
        "/home",
        "/add-transactions",
        "/history",
        "/settings",
        "/budget-management",
        "/bargraph",
        "/piechart",
      ];
      if (!allowedRoutes.includes(location.pathname)) {
        navigate("/home");
      }
    }
  }, [navigate, location.pathname]); // ✅ Added `location.pathname` to update correctly

  return null;
};

export default App;
