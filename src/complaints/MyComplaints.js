import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/MyComplaints.css";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const res = await api.get("/api/complaints/my");
      setComplaints(res.data);
    } catch (err) {
      setError("Failed to load complaints");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="mycompl-bg">
        <div className="mycompl-wrapper">
          <div className="container">
            <div className="mycompl-card">
              <div className="mycompl-title">
                My Complaints
              </div>

              <div className="mycompl-body">
                {error && (
                  <div className="alert alert-danger text-center">
                    {error}
                  </div>
                )}

                {loading ? (
                  <div className="loading-text">
                    Loading complaints...
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="mycompl-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Title</th>
                          <th>Status</th>
                          <th>Admin Remarks</th>
                        </tr>
                      </thead>

                      <tbody>
                        {complaints.length === 0 && (
                          <tr>
                            <td colSpan="4">
                              No complaints found
                            </td>
                          </tr>
                        )}

                        {complaints.map((c) => (
                          <tr key={c.id}>
                            <td>{c.id}</td>
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
                            <td>
                              {c.remarks ? (
                                <span className="text-dark">
                                  {c.remarks}
                                </span>
                              ) : (
                                <span className="text-muted">
                                  Pending
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <div className="text-center mt-3">
                  <button
                    className="refresh-btn"
                    onClick={fetchComplaints}
                  >
                    Refresh Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyComplaints;
