import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/admin-complaints.css";

function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [adminRemark, setAdminRemark] = useState("");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.get("/api/admin/complaints");
      setComplaints(res.data);
    } catch (err) {
      setError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    if (!adminRemark.trim()) {
      alert("Please enter remark");
      return;
    }

    try {
      await api.put(`/api/admin/complaints/${id}/status`, {
        status,
        remarks: adminRemark,
      });

      setSelectedComplaint(null);
      setAdminRemark("");
      loadComplaints();
    } catch (err) {
      alert("Failed to update complaint status");
    }
  };

  return (
    <>
      <Navbar />

      <div className="admin-compl-bg">
        <div className="admin-compl-wrapper container">
          <div className="admin-compl-card">
            <div className="admin-compl-title">
              Citizen Complaints (Admin)
            </div>

            <div className="admin-compl-body">
              {error && (
                <div className="alert alert-danger text-center">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center fw-semibold">
                  Loading complaints...
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-compl-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Citizen</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Remarks</th>
                        <th>View</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {complaints.length === 0 && (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No complaints found
                          </td>
                        </tr>
                      )}

                      {complaints.map((c) => (
                        <tr key={c.id}>
                          <td>{c.id}</td>
                          <td>{c.citizenProfile?.user?.name}</td>
                          <td>{c.title}</td>
                          <td>
                            <span
                              className={
                                c.status === "RESOLVED"
                                  ? "badge bg-success"
                                  : c.status === "IN_PROGRESS"
                                  ? "badge bg-primary"
                                  : c.status === "REJECTED"
                                  ? "badge bg-danger"
                                  : "badge bg-warning text-dark"
                              }
                            >
                              {c.status}
                            </span>
                          </td>
                          <td>{c.remarks || "-"}</td>

                          {/* VIEW COLUMN */}
                          <td>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => setSelectedComplaint(c)}
                            >
                              View
                            </button>
                          </td>

                          {/* ACTION COLUMN */}
                          <td>
                            {c.status === "PENDING" ? (
                              <>
                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() => setSelectedComplaint(c)}
                                >
                                  Resolve
                                </button>

                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => setSelectedComplaint(c)}
                                >
                                  Reject
                                </button>
                              </>
                            ) : (
                              <span className="fw-semibold text-muted">
                                Closed
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

      {/* MODAL */}
      {selectedComplaint && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Complaint Details
                </h5>
                <button
                  className="btn-close"
                  onClick={() => {
                    setSelectedComplaint(null);
                    setAdminRemark("");
                  }}
                ></button>
              </div>

              <div className="modal-body">
                <p>
                  <b>Citizen:</b>{" "}
                  {selectedComplaint.citizenProfile?.user?.name}
                </p>
                <p><b>Title:</b> {selectedComplaint.title}</p>
                <p><b>Description:</b></p>
                <p>{selectedComplaint.description}</p>

                {selectedComplaint.status === "PENDING" && (
                  <>
                    <label className="form-label fw-semibold mt-3">
                      Admin Remark
                    </label>
                    <textarea
                      className="form-control"
                      rows="3"
                      value={adminRemark}
                      onChange={(e) =>
                        setAdminRemark(e.target.value)
                      }
                      placeholder="Enter remark"
                    />
                  </>
                )}
              </div>

              <div className="modal-footer">
                {selectedComplaint.status === "PENDING" && (
                  <>
                    <button
                      className="btn btn-success"
                      onClick={() =>
                        updateStatus(
                          selectedComplaint.id,
                          "RESOLVED"
                        )
                      }
                    >
                      Resolve
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        updateStatus(
                          selectedComplaint.id,
                          "REJECTED"
                        )
                      }
                    >
                      Reject
                    </button>
                  </>
                )}

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setSelectedComplaint(null);
                    setAdminRemark("");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminComplaints;
