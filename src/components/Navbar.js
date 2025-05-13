import { Link, useNavigate } from "react-router-dom";
import React from "react";

import { useCart } from "../components/ContextReducer";
import Badge from "react-bootstrap/Badge";
import Model from "../Model";
import MyCart from "../screens/MyCart";
import { useState } from "react";
export default function Navbar() {
  let items = useCart();
  //alert("hello" + items);
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    console.log(items);
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fst-italic" to="/">
            DivineDine-In
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto ">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5"
                    aria-current="page"
                    to="/myorder"
                  >
                    My Orders
                  </Link>
                </li>
              ) : (
                " "
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1 " to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1 " to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <>
                <div
                  className="btn bg-white text-success mx-2 "
                  onClick={() => setCartView(true)}
                >
                  <Badge color="secondary">{items.length}</Badge>
                  My Cart
                </div>

                {cartView ? (
                  <Model onClose={() => setCartView(false)}>
                    <MyCart />
                  </Model>
                ) : null}
                <button
                  onClick={handleLogOut}
                  className="btn bg-white text-success"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
