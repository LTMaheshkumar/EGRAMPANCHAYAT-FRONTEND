import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./authService";
//import Footer from "../components/Footer";
import "./GovLogin.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("CITIZEN");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(email, password);

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      if (loginType === "ADMIN" && data.role !== "ROLE_ADMIN") {
        setError("You are not authorized as Admin");
        setLoading(false);
        return;
      }

      navigate(data.role === "ROLE_ADMIN" ? "/admin" : "/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-background"></div>
      <div className="login-overlay"></div>

      {/* HEADER */}
      <header className="main-header">
        <div className="header-container">
          <h1>E-Gram Panchayat</h1>
          <span className="header-badge">Official Portal</span>
        </div>
      </header>

      {/* MAIN */}
      <main className="login-main">
        <div className="login-container">
          <div className="login-grid">

            {/* LEFT LOGIN */}
            <div className="login-card">
              <h2>Secure Login</h2>

              {error && <div className="error-alert">{error}</div>}

              <div className="login-type-toggle">
                <button
                  className={`toggle-btn ${loginType === "CITIZEN" ? "active" : ""}`}
                  onClick={() => setLoginType("CITIZEN")}
                >
                  Citizen
                </button>
                <button
                  className={`toggle-btn ${loginType === "ADMIN" ? "active" : ""}`}
                  onClick={() => setLoginType("ADMIN")}
                >
                  Admin
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button className="submit-btn" disabled={loading}>
                  {loading ? "Please wait..." : "Login"}
                </button>
              </form>

              <div className="register-link">
                New Citizen?{" "}
                <span onClick={() => navigate("/register")}>
                  Register Here
                </span>
              </div>
            </div>

            {/* RIGHT SCROLLING PANEL */}
            <div className="login-right">
              <h3>Notifications & Awareness</h3>

              <div className="scroll-box">
                <div className="scroll-content">
                  <div className="scroll-item saffron">🏠 PM Awas Yojana – Apply Online</div>
                  <div className="scroll-item green">🚰 Jal Jeevan Mission Updates</div>
                  <div className="scroll-item blue">📄 Income & Caste Certificate Services</div>
                  <div className="scroll-item purple">♻️ Swachh Bharat Abhiyan</div>
                  <div className="scroll-item orange">🌾 Farmer Pension Scheme</div>
                  <div className="scroll-item saffron">👩‍👩‍👧‍👦 Women & Child Welfare</div>
                  <div className="scroll-item green">💻 Digital Village Initiative</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* MANUAL FOOTER CONTENT */}
      <section className="manual-footer">
        <div className="manual-footer-container">
          <div>
            <h4>About Project</h4>
            <p>
              E-Gram Panchayat is a digital governance portal that provides
              village-level services such as certificates, schemes, taxes
              and grievance redressal online.
            </p>
            <p><b>Project Created by Final Year Students</b></p>
          </div>

          <div>
            <h4>Administration</h4>
            <p>Sarpanch: __________</p>
            <p>Gram Sevak: __________</p>
            <p>Taluka: __________</p>
            <p>District: __________</p>
            <p>State: Maharashtra</p>
          </div>

          <div>
            <h4>Contact Us</h4>
            <p>Email: support@egrampanchayat.in</p>
            <p>Helpline: 1800-000-000</p>
            <p>Office Hours: 10 AM – 5 PM</p>
          </div>
        </div>
      </section>

      {/* EXISTING FOOTER */}
     
    </div>
  );
}

export default Login;
