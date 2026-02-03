import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/api/auth/register", form);
      setMessage("Registration successful! Please login.");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register-bg">
      <div className="register-wrapper container">

        <div className="register-card">
          <div className="register-title">
            Citizen Registration
          </div>

          <div className="register-body">

            {message && (
              <div className="alert alert-success text-center">
                {message}
              </div>
            )}

            {error && (
              <div className="alert alert-danger text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="register-form">

              <div className="form-group">
                <label>Full Name</label>
                <input
                  name="name"
                  placeholder="Enter full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Create password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  name="mobile"
                  placeholder="Enter mobile number"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                />
              </div>

              <button className="register-btn">
                Register
              </button>
            </form>

            <div className="login-link">
              Already registered?{" "}
              <span onClick={() => navigate("/")}>
                Login here
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
