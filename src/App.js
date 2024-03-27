import "./App.css";
import Home from "./screens/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import MyOrder from "./screens/MyOrder";

import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"; //npm i bootstrap-dark-5 boostrap
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import SignUp from "./screens/SignUp";
import { CartProvider } from "./components/ContextReducer.js";
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/myorder" element={<MyOrder />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
