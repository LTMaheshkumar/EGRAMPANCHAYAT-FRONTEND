import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/admin-citizens.css";

// ✅ Excel export libs
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function AdminCitizens() {
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCitizens();
  }, []);

  const loadCitizens = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await api.get("/api/admin/citizens");
      setCitizens(res.data);
    } catch (err) {
      setError("Failed to load citizens");
    } finally {
      setLoading(false);
    }
  };

  // ✅ EXCEL EXPORT (NO UI CHANGE)
  const exportExcel = () => {
    const data = citizens.map(c => ({
      ID: c.id,
      Name: c.user?.name,
      Email: c.user?.email,
      Mobile: c.user?.mobile,
      Aadhaar: c.aadhaarNo,
      Ward: c.wardNo,
      Address: c.address
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Citizens");

    const excelBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(new Blob([excelBuffer]), "citizens.xlsx");
  };

  return (
    <>
      <Navbar />

      <div className="admin-citizen-bg">
        <div className="admin-citizen-wrapper container">

          <div className="admin-citizen-card">
            <div className="admin-citizen-title">
              Registered Citizens (Admin)
            </div>

            <div className="admin-citizen-body">

              {/* ✅ EXPORT BUTTON (SMALL, NON-INTRUSIVE) */}
              <div className="text-end mb-3">
                <button
                  className="btn btn-success btn-sm"
                  onClick={exportExcel}
                >
                  Export Excel
                </button>
              </div>

              {error && (
                <div className="alert alert-danger text-center">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center fw-semibold">
                  Loading citizens...
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-citizen-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Aadhaar</th>
                        <th>Ward</th>
                        <th>Address</th>
                      </tr>
                    </thead>

                    <tbody>
                      {citizens.length === 0 && (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No citizens found
                          </td>
                        </tr>
                      )}

                      {citizens.map((c) => (
                        <tr key={c.id}>
                          <td>{c.id}</td>
                          <td>{c.user?.name}</td>
                          <td>{c.user?.email}</td>
                          <td>{c.user?.mobile}</td>
                          <td>{c.aadhaarNo}</td>
                          <td>{c.wardNo}</td>
                          <td>{c.address}</td>
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
    </>
  );
}

export default AdminCitizens;
