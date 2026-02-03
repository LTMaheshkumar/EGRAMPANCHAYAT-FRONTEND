import { Link, useNavigate } from "react-router-dom";
import gandhiImg from "../assets/images/gandhi.jpg";
import swachhImg from "../assets/images/swachh-bharat.jpg";

function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* ===== INTERNAL CSS ===== */}
      <style>
        {`
          .tricolor-banner {
            background: linear-gradient(
              to right,
              #FF9933 0%,
              #ffffff 50%,
              #138808 100%
            );
            padding: 14px 0;
            border-bottom: 1px solid #ddd;
          }

          .banner-title {
            font-weight: 700;
            cursor: pointer;
          }

          .banner-subtitle {
            font-size: 13px;
            color: #444;
          }

          .banner-img {
            height: 60px;
            object-fit: contain;
          }

          .shortcut-bar {
            background: #f8f9fa;
            border-bottom: 1px solid #e0e0e0;
          }

          /* ===== CUSTOM BUTTONS ===== */
          .nav-btn {
            border: 1px solid #cfd8dc;
            background: #ffffff;
            color: #333;
            font-size: 14px;
            padding: 5px 14px;
            border-radius: 20px;
            text-decoration: none;
            transition: all 0.25s ease;
          }

          .nav-btn:hover {
            background: #f1f3f4;
            color: #000;
            border-color: #b0bec5;
          }

          .logout-btn {
            border: 1px solid #555;
            background: transparent;
            color: #333;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 14px;
            transition: all 0.25s ease;
          }

          .logout-btn:hover {
            background: #333;
            color: #fff;
            border-color: #333;
          }
        `}
      </style>

      {/* ===== TRICOLOR HEADER ===== */}
      <div className="tricolor-banner">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Gandhi */}
          <img src={gandhiImg} alt="Gandhi" className="banner-img" />

          {/* Title */}
          <div className="text-center">
            <h4
              className="mb-0 banner-title"
              onClick={() =>
                role === "ROLE_ADMIN"
                  ? navigate("/admin")
                  : navigate("/dashboard")
              }
            >
              🏛️ E-Gram Panchayat
            </h4>
            <div className="banner-subtitle">
              Digital Village Governance System
            </div>
          </div>

          {/* Swachh + Logout */}
          <div className="d-flex align-items-center gap-3">
            <img
              src={swachhImg}
              alt="Swachh Bharat"
              className="banner-img"
            />
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ===== SHORTCUT BUTTONS ===== */}
      <div className="shortcut-bar py-2">
        <div className="container d-flex flex-wrap gap-2">
          {role === "ROLE_CITIZEN" && (
            <>
              <Link to="/dashboard" className="nav-btn">
                Home
              </Link>
              <Link to="/apply-certificate" className="nav-btn">
                Apply Certificate
              </Link>
              <Link to="/my-certificates" className="nav-btn">
                My Certificates
              </Link>
              <Link to="/complaints" className="nav-btn">
                Raise Complaint
              </Link>
              <Link to="/my-complaints" className="nav-btn">
                Track Complaints
              </Link>
            </>
          )}

          {role === "ROLE_ADMIN" && (
            <>
              <Link to="/admin" className="nav-btn">
                Dashboard
              </Link>
              <Link to="/admin/certificates" className="nav-btn">
                Certificates
              </Link>
              <Link to="/admin/complaints" className="nav-btn">
                Complaints
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
