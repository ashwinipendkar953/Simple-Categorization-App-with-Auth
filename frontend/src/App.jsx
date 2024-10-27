// src/App.tsx
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Header from "./components/Header";
import PromoText from "./components/PromoText";
import VerifyEmail from "./pages/VerifyEmail";
import Interests from "./pages/Interests";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import SignUp from "./pages/SignUp";

const App = () => {
  const { token } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      <PromoText />
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Protected Route - Only for logged-in users */}
        <Route
          path="/interests"
          element={token ? <Interests /> : <Navigate to="/login" replace />}
        />

        {/* Redirect to login if no matching route */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <ToastContainer autoClose={2000} />
    </Router>
  );
};

export default App;
