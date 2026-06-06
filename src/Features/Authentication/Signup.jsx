import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  let navigate = useNavigate();

  let [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  let [errors, setErrors] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  let handleChange = (e) => {
    let { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  let validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "name":
        if (value.trim().length < 3) {
          error = "Name must be at least 3 characters";
        }
        break;

      case "email":
        if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
        ) {
          error = "Enter a valid email";
        }
        break;

      case "mobile":
        if (!/^[0-9]{10}$/.test(value)) {
          error = "Mobile number must be 10 digits";
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

  let signup = async () => {
    Object.keys(form).forEach((key) => {
      validateField(key, form[key]);
    });

    if (
      Object.values(errors).some((error) => error !== "") ||
      Object.values(form).some((value) => value === "")
    ) {
      alert("Please fix validation errors");
      return;
    }

    try {
      await axios.post(
        "http://localhost:3001/users",
        form
      );

      alert("Account Created Successfully");

      setForm({
        name: "",
        email: "",
        mobile: "",
        password: "",
      });

      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Signup Failed");
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="text-center mb-4">
          Create Account
        </h2>

        <input
          type="text"
          name="name"
          value={form.name}
          className="form-control"
          placeholder="Name"
          onChange={handleChange}
        />
        <small className="text-danger">
          {errors.name}
        </small>

        <input
          type="email"
          name="email"
          value={form.email}
          className="form-control mt-3"
          placeholder="Email"
          onChange={handleChange}
        />
        <small className="text-danger">
          {errors.email}
        </small>

        <input
          type="text"
          name="mobile"
          value={form.mobile}
          className="form-control mt-3"
          placeholder="Mobile"
          onChange={handleChange}
        />
        <small className="text-danger">
          {errors.mobile}
        </small>

        <input
          type="password"
          name="password"
          value={form.password}
          className="form-control mt-3"
          placeholder="Password"
          onChange={handleChange}
        />
        <small className="text-danger">
          {errors.password}
        </small>

        <button
          className="btn btn-success w-100 mt-4"
          onClick={signup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};