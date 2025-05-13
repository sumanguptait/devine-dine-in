import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function ForgotPassword() {
  const [credentials, setCredentials] = useState({
    email: "",
  });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(
    //   JSON.stringify({
    //     email: credentials.email,
    //   })
    // );
    const response = await fetch("http://localhost:3100/api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
      }),
    });
    const json = await response.json();
    console.log(JSON.stringify(json, null, 2));
    if (json.success) {
      navigate("/login");
    } else {
      alert("Error to change password");
    }
  };
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/1437811/pexels-photo-1437811.jpeg?auto=compress&cs=tinysrgb&w=800")',
        height: "100vh",
        backgroundSize: "cover",
      }}
    >
      <div>
        <Navbar />
      </div>
      <div className="container text-white">
        <form
          className="w-50 m-auto mt-5 border bg-dark border-success rounded"
          onSubmit={handleSubmit}
        >
          <div className="m-3">
            <h2>Forgot Password</h2>
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone.
            </div>
          </div>

          <button type="submit" className="m-3 btn btn-success">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
