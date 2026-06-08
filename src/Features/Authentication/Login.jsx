import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "email":
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
          error = "Enter a valid email";
        }
        break;

      case "password":
        if (value.length < 6) {
          error = "Password must be at least 6 characters";
        }
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    if (errors.email || errors.password) {
      alert("Please fix validation errors");
      return;
    }

    try {
      const res = await axios.get(
        `https://shopease-yonq.onrender.com/users?email=${form.email}&password=${form.password}`
      );

      if (res.data.length > 0) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify(res.data[0])
        );

        alert("Login Successful");

        navigate("/home");
      } else {
        alert("Invalid Email or Password");
      }
    } catch (err) {
      console.error(err);
      alert("Login Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "450px" }}
      >
        <h2 className="text-center mb-4">
          Welcome Back
        </h2>

        <input
          type="email"
          name="email"
          value={form.email}
          className="form-control"
          placeholder="Email"
          onChange={handleChange}
        />
        <small className="text-danger">{errors.email}</small>

        <input
          type="password"
          name="password"
          value={form.password}
          className="form-control mt-3"
          placeholder="Password"
          onChange={handleChange}
        />
        <small className="text-danger">{errors.password}</small>

        <button
          className="btn btn-dark w-100 mt-4"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-3 text-center">
          New User? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
};