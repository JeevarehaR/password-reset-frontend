import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/LoginPage";
import { ForgotPassword } from "./components/ForgotPassword";
import Error from "./components/Errors";
import ResetPassword from "./components/ResetPassword";
import { AuthCard } from "./components/AuthCard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthCard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="reset-password/:_id/:token" element={<ResetPassword />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
