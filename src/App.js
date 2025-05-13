import React from "react";
import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import MyOrder from "./screens/MyOrder";
import ForgotPassword from "./screens/ForgotPassword.js";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"; //npm i bootstrap-dark-5 boostrap
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./screens/SignUp";
import { CartProvider } from "./components/ContextReducer.js";
import ResetPassword from "./screens/ResetPassword.js";
import Success from "./screens/Success.js";
import Cancel from "./screens/Cancel.js";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/myorder" element={<MyOrder />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/cancel" element={<Cancel />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route
            exact
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
