import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../styles/admin-dashboard.css";

import gandhiImg from "../assets/images/gandhi.jpg";
import swachhImg from "../assets/images/swachh-bharat.jpg";

function AdminDashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({
    totalCitizens: 0,
    pendingCertificates: 0,
    pendingComplaints: 0,
    resolvedComplaints: 0,
  });

  const [paymentSummary, setPaymentSummary] = useState({
    totalPayments: 0,
    propertyTaxCount: 0,
    waterTaxCount: 0,
  });

  useEffect(() => {
    loadDashboardSummary();
    loadPaymentSummary();
  }, []);

  const loadDashboardSummary = async () => {
    const res = await api.get("/api/admin/dashboard/summary");
    setSummary(res.data);
  };

  const loadPaymentSummary = async () => {
    const res = await api.get("/api/admin/dashboard/payments/summary");
    setPaymentSummary(res.data);
  };

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
            <h4>Admin Dashboard</h4>
            <p>Government of Maharashtra</p>
          </div>

          <img src={swachhImg} alt="Swachh Bharat" className="banner-swachh" />
        </header>

        {/* ===== NOTIFICATION ===== */}
        <div className="notification-bar">
          <div className="notification-text">
            🔔 Admin Portal – Monitor Certificates, Complaints & Payments
          </div>
        </div>

        <div className="layout">

          {/* ===== SIDEBAR ===== */}
          <aside className="gov-sidebar">
            <h5>Admin Menu</h5>

            <button onClick={() => navigate("/admin")}>🏠 Dashboard</button>
            <button onClick={() => navigate("/admin/certificates")}>📄 Certificates</button>
            <button onClick={() => navigate("/admin/complaints")}>🛠️ Complaints</button>
            <button onClick={() => navigate("/admin/citizens")}>👥 Citizens</button>
            <button onClick={() => navigate("/admin/payments")}>💰 Payments</button>

            <div className="side-info">
              <strong>Admin Info</strong>
              <p>admin@egram.gov.in</p>
              <p>02192-245678</p>
            </div>

            {/* 🔴 LOGOUT */}
            <div className="sidebar-footer">
              <button className="logout-btn" onClick={logout}>
                🚪 Logout
              </button>
            </div>
          </aside>

          {/* ===== MAIN ===== */}
          <main className="main-area">

            {/* ===== SUMMARY TABLE ===== */}
            <div className="card shadow mb-5">
              <div className="card-header fw-bold text-center">
                Dashboard Summary
              </div>
              <div className="card-body p-0">
                <table className="table table-bordered mb-0 text-center">
                  <tbody>
                    <tr>
                      <th>Total Citizens</th>
                      <td>{summary.totalCitizens}</td>
                      <th>Pending Certificates</th>
                      <td>{summary.pendingCertificates}</td>
                    </tr>
                    <tr>
                      <th>Pending Complaints</th>
                      <td>{summary.pendingComplaints}</td>
                      <th>Resolved Complaints</th>
                      <td>{summary.resolvedComplaints}</td>
                    </tr>
                    <tr>
                      <th>Total Payments</th>
                      <td>{paymentSummary.totalPayments}</td>
                      <th>Property / Water Tax</th>
                      <td>
                        {paymentSummary.propertyTaxCount} / {paymentSummary.waterTaxCount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* ===== ADMIN SERVICES (SAME AS CITIZEN CARDS) ===== */}
            <div className="services-grid custom-grid">

              <ServiceCard
                emoji="📄"
                title="Certificates"
                desc="Approve & manage certificates"
                btnClass="btn-blue"
                onClick={() => navigate("/admin/certificates")}
              />

              <ServiceCard
                emoji="🛠️"
                title="Complaints"
                desc="Resolve citizen complaints"
                btnClass="btn-orange"
                onClick={() => navigate("/admin/complaints")}
              />

              <ServiceCard
                emoji="👥"
                title="Citizens"
                desc="View registered citizens"
                btnClass="btn-green"
                onClick={() => navigate("/admin/citizens")}
              />

              <ServiceCard
                emoji="💰"
                title="Payments"
                desc="View tax collection"
                btnClass="btn-purple"
                onClick={() => navigate("/admin/payments")}
              />

            </div>

          </main>
        </div>
      </div>
    </div>
  );
}

/* ===== SAME SERVICE CARD AS CITIZEN ===== */
function ServiceCard({ emoji, title, desc, btnClass, onClick }) {
  return (
    <div className="service-card rectangular-card">
      <div className="card-icon">{emoji}</div>
      <h4>{title}</h4>
      <p>{desc}</p>
      <button className={`card-btn ${btnClass}`} onClick={onClick}>
        Open
      </button>
    </div>
  );
}

export default AdminDashboard;
