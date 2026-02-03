import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/admin-certificates.css";

function AdminCertificates() {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.get("/api/admin/certificates");
      setApplications(res.data);
    } catch (err) {
      setError("Failed to load certificate applications");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/admin/certificates/${id}/status`, {
        status,
        remarks:
          status === "APPROVED"
            ? "Approved by Admin"
            : "Rejected by Admin",
      });
      setSelectedApp(null);
      loadApplications();
    } catch (err) {
      alert("Failed to update certificate status");
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-cert-bg">
        <div className="admin-cert-wrapper container">
          <div className="admin-cert-card">
            <div className="admin-cert-title">
              Certificate Applications (Admin)
            </div>

            <div className="admin-cert-body">
              {error && (
                <div className="alert alert-danger text-center">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center fw-semibold">
                  Loading applications...
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-cert-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Citizen Name</th>
                        <th>Certificate Type</th>
                        <th>Status</th>
                        <th>View</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {applications.length === 0 && (
                        <tr>
                          <td colSpan="6" className="text-center">
                            No certificate applications found
                          </td>
                        </tr>
                      )}

                      {applications.map((app) => (
                        <tr key={app.id}>
                          <td>{app.id}</td>
                          <td>{app.citizenProfile?.user?.name}</td>
                          <td>{app.certificateType}</td>
                          <td>
                            <span
                              className={
                                app.status === "APPROVED"
                                  ? "badge bg-success"
                                  : app.status === "REJECTED"
                                  ? "badge bg-danger"
                                  : "badge bg-warning text-dark"
                              }
                            >
                              {app.status}
                            </span>
                          </td>

                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => setSelectedApp(app)}
                            >
                              View
                            </button>
                          </td>

                          <td>
                            {app.status === "PENDING" ? (
                              <>
                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() =>
                                    updateStatus(app.id, "APPROVED")
                                  }
                                >
                                  Approve
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() =>
                                    updateStatus(app.id, "REJECTED")
                                  }
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span className="text-muted">
                                Already Processed
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= CUSTOM MODAL (NO BLUR BUG) ================= */}
      {selectedApp && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 2000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => setSelectedApp(null)}
        >
          <div
            style={{
              background: "#fff",
              width: "100%",
              maxWidth: "800px",
              borderRadius: "10px",
              padding: "20px",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5>Certificate Application Details</h5>
              <button
                className="btn-close"
                onClick={() => setSelectedApp(null)}
              />
            </div>

            <h6>User Profile</h6>
            <p><b>Name:</b> {selectedApp.citizenProfile?.user?.name}</p>
            <p><b>Email:</b> {selectedApp.citizenProfile?.user?.email}</p>

            <hr />

            <h6>Form Details</h6>
            <p><b>Applicant Name:</b> {selectedApp.applicantName}</p>
            <p><b>Date of Birth:</b> {selectedApp.dateOfBirth}</p>
            {selectedApp.income && (
              <p><b>Income:</b> ₹ {selectedApp.income}</p>
            )}

            <hr />

            <h6>Uploaded Documents</h6>
            {selectedApp.identityProofPath ? (
              <p>
                <a
                  href={`http://localhost:8080/${selectedApp.identityProofPath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Identity Proof
                </a>
              </p>
            ) : (
              <p>No identity proof uploaded</p>
            )}

            {selectedApp.photoPath ? (
              <p>
                <a
                  href={`http://localhost:8080_attach/${selectedApp.photoPath}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  View Photo
                </a>
              </p>
            ) : (
              <p>No photo uploaded</p>
            )}

            <div className="text-end mt-4">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminCertificates;
