import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AddTransaction from "./pages/AddTransaction";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import Settings from "./pages/Settings";
import BarGraph from "./components/BarGraph";
import BarView from "./components/BarView";
import PieView from "./components/PieView";
import BudgetManagement from "./pages/BudgetManagement";

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

import { useEffect } from "react";

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, []);

  return null;
};

export default App;
