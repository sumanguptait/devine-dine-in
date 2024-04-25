import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { id, token } = useParams();
  const [credentials, setCredentials] = useState({
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: credentials.password,
          }),
        }
      );

      if (response.ok) {
        const json = await response.json();
        if (json.success) {
          localStorage.setItem("userEmail", credentials.email);
          localStorage.setItem("authToken", json.authToken);
          navigate("/login");
        } else {
          console.error("Password reset failed:", json.error);
          // Handle error (e.g., display error message)
        }
      } else {
        console.error("Password reset failed:", response.statusText);
        // Handle error (e.g., display error message)
      }
    } catch (error) {
      console.error("Password reset failed:", error.message);
      // Handle error (e.g., display error message)
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        backgroundImage:
          'url("https://images.pexels.com/photos/326278/pexels-photo-326278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")',
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
            <h2>Reset Password</h2>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              value={credentials.password}
              onChange={handleChange}
              name="password"
            />
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
