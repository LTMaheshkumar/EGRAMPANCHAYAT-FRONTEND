import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/MyCertificates.css";

function MyCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await api.get("/api/certificates/my");
      setCertificates(res.data);
    } catch (err) {
      setError("Failed to load certificates");
    }
  };

  const downloadCertificate = async (id) => {
    try {
      const res = await api.get(`/api/certificates/${id}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `certificate_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Certificate not approved yet or download failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="mycert-bg">
        <div className="mycert-wrapper">
          <div className="container">
            <div className="mycert-card">
              {/* Title */}
              <div className="mycert-header">
                My Certificates
              </div>

              <div className="p-3">
                {error && (
                  <div className="alert alert-danger text-center">
                    {error}
                  </div>
                )}

                <div className="table-responsive">
                  <table className="table mycert-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Applied Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {certificates.length === 0 && (
                        <tr>
                          <td colSpan="5">No certificates found</td>
                        </tr>
                      )}

                      {certificates.map((c) => (
                        <tr key={c.id}>
                          <td>{c.id}</td>
                          <td>{c.certificateType}</td>
                          <td>
                            <span
                              className={
                                c.status === "APPROVED"
                                  ? "badge bg-success"
                                  : c.status === "PENDING"
                                  ? "badge bg-warning text-dark"
                                  : "badge bg-danger"
                              }
                            >
                              {c.status}
                            </span>
                          </td>
                          <td>
                            {c.appliedAt
                              ? new Date(c.appliedAt).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>
                            {c.status === "APPROVED" ? (
                              <button
                                className="download-btn"
                                onClick={() =>
                                  downloadCertificate(c.id)
                                }
                              >
                                Download PDF
                              </button>
                            ) : (
                              <span className="disabled-btn">
                                Not Available
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCertificates;
