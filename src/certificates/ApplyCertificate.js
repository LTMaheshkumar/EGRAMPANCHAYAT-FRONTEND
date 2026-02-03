import { useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import heroBg from "../assets/maharashtra-hero.jpg";

function ApplyCertificate() {
  const [certificateType, setCertificateType] = useState("");
  const [applicantName, setApplicantName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [income, setIncome] = useState("");

  const [identityProof, setIdentityProof] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleApply = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const formData = new FormData();

      // JSON part
      const data = {
        certificateType,
        applicantName,
        dateOfBirth,
        income: certificateType === "INCOME" ? income : null,
      };

      formData.append(
        "data",
        new Blob([JSON.stringify(data)], { type: "application/json" })
      );

      // Optional files
      if (identityProof) {
        formData.append("identityProof", identityProof);
      }
      if (photo) {
        formData.append("photo", photo);
      }

      await api.post("/api/certificates/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Certificate applied successfully!");
      setCertificateType("");
      setApplicantName("");
      setDateOfBirth("");
      setIncome("");
      setIdentityProof(null);
      setPhoto(null);
    } catch (err) {
      setError("Failed to apply for certificate");
    }
  };

  return (
    <>
      <Navbar />

      {/* Background Section */}
      <div
        style={{
          minHeight: "calc(100vh - 120px)",
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* Blur Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255,255,255,0.55)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            paddingTop: "60px",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background: "rgba(255,255,255,0.95)",
              borderRadius: "14px",
              padding: "30px 35px",
              boxShadow: "0 15px 40px rgba(0,0,0,0.25)",
            }}
          >
            <h3
              style={{
                textAlign: "center",
                marginBottom: "25px",
                fontWeight: "600",
              }}
            >
              Apply for Certificate
            </h3>

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

            <form onSubmit={handleApply}>
              {/* Certificate Type */}
              <div className="mb-3">
                <label className="form-label fw-semibold">
                  Certificate Type
                </label>
                <select
                  className="form-select"
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                  required
                  style={{ padding: "10px", borderRadius: "8px" }}
                >
                  <option value="">-- Select Certificate --</option>
                  <option value="BIRTH">Birth Certificate</option>
                  <option value="INCOME">Income Certificate</option>
                  <option value="RESIDENCE">Residence Certificate</option>
                </select>
              </div>

              {/* Show form only if certificate selected */}
              {certificateType && (
                <>
                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Applicant Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      required
                      style={{ padding: "10px", borderRadius: "8px" }}
                    />
                  </div>

                  {/* DOB */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      required
                      style={{ padding: "10px", borderRadius: "8px" }}
                    />
                  </div>

                  {/* Income (only for INCOME) */}
                  {certificateType === "INCOME" && (
                    <div className="mb-3">
                      <label className="form-label fw-semibold">
                        Annual Income
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        required
                        style={{ padding: "10px", borderRadius: "8px" }}
                      />
                    </div>
                  )}

                  {/* Identity Proof (Optional) */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Proof of Identity (Optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) =>
                        setIdentityProof(e.target.files[0])
                      }
                    />
                  </div>

                  {/* Photo (Optional) */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">
                      Photo / Image (Optional)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </div>
                </>
              )}

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    fontSize: "16px",
                  }}
                >
                  Apply Certificate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyCertificate;
