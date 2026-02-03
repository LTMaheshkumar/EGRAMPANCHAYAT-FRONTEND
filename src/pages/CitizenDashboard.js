import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../styles/citizen-dashboard.css";

import gandhiImg from "../assets/images/gandhi.jpg";
import swachhImg from "../assets/images/swachh-bharat.jpg";

function CitizenDashboard() {
  const navigate = useNavigate();

  // Force profile completion
  useEffect(() => {
    api.get("/api/citizen/profile").catch(() => {
      navigate("/citizen-profile", { replace: true });
    });
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-bg">
      <div className="dashboard-content">
        {/* ===== BANNER ===== */}
        <header className="gov-banner">
          <img src={gandhiImg} alt="Gandhi" className="banner-gandhi" />

          <div className="banner-center">
            <h1>E-Gram Panchayat</h1>
            <h4>Citizen Dashboard</h4>
            <p>Government of Maharashtra</p>
          </div>

          <img src={swachhImg} alt="Swachh Bharat" className="banner-swachh" />
        </header>

        {/* ===== NOTIFICATION ===== */}
        <div className="notification-bar">
          <div className="notification-text">
            🔔 Welcome to Government of Maharashtra Portal &nbsp; | &nbsp;
            💰 Pay your taxes on time &nbsp; | &nbsp;
            🧹 Awareness: Keep your village clean & digital
          </div>
        </div>

        {/* ===== LAYOUT ===== */}
        <div className="layout">
          {/* ===== SIDEBAR ===== */}
          <aside className="gov-sidebar">
            <h5>Citizen Menu</h5>

            <button onClick={() => navigate("/citizen-profile")}>👤 My Profile</button>
            <button onClick={() => navigate("/grievance")}>
              📝 Grievance (Profile / Service)
            </button>
            <button onClick={() => navigate("/complaints")}>⚠️ Raise Complaint</button>
            <button onClick={() => navigate("/my-complaints")}>🔍 Track Complaints</button>
            <button onClick={() => navigate("/my-certificates")}>📂 My Certificates</button>
            <button onClick={() => navigate("/payments/select")}>💳 Pay Taxes</button>

            {/* ADMIN INFO */}
            <div className="side-info">
              <strong>Admin Information</strong>
              <p>Email: admin@egram.gov.in</p>
              <p>Contact: 02192-245678</p>
            </div>

            {/* ABOUT */}
            <div className="side-info">
              <strong>About Us</strong>
              <p>
                E-Gram Panchayat is a digital initiative to provide
                village-level government services online.
              </p>
            </div>

            {/* LOGOUT */}
            <div className="sidebar-footer">
              <button className="logout-btn" onClick={logout}>
                🚪 Logout
              </button>
            </div>
          </aside>

          {/* ===== DASHBOARD CARDS ===== */}
          <main className="main-area">
            <div className="services-grid custom-grid">
              <ServiceCard
                emoji="📄"
                title="Apply Certificate"
                desc="Birth, Income, Residence"
                btnClass="btn-blue"
                onClick={() => navigate("/apply-certificate")}
              />
              <ServiceCard
                emoji="📂"
                title="My Certificates"
                desc="Download approved certificates"
                btnClass="btn-green"
                onClick={() => navigate("/my-certificates")}
              />
              <ServiceCard
                emoji="⚠️"
                title="Raise Complaint"
                desc="Village related complaints"
                btnClass="btn-orange"
                onClick={() => navigate("/complaints")}
              />
              <ServiceCard
                emoji="🔍"
                title="Track Complaints"
                desc="Check complaint status"
                btnClass="btn-purple"
                onClick={() => navigate("/my-complaints")}
              />
              <ServiceCard
                emoji="💳"
                title="Pay Taxes"
                desc="Water & Property Tax"
                btnClass="btn-yellow"
                onClick={() => navigate("/payments/select")}
              />

              {/* ✅ ONLY CHANGE HERE */}
              <ServiceCard
                emoji="💰"
                title="My Payments"
                desc="View and download payment receipts"
                btnClass="btn-green"
                onClick={() => navigate("/my-payments")}
              />
            </div>
          </main>
        </div>

        {/* ===== FOOTER ===== */}
       
      </div>
    </div>
  );
}

function ServiceCard({ emoji, title, desc, btnClass, onClick }) {
  return (
    <div className="service-card rectangular-card">
      <div className="card-icon">{emoji}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
      <button className={`card-btn ${btnClass}`} onClick={onClick}>
        View Details
      </button>
    </div>
  );
}

export default CitizenDashboard;
