import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/my-payments.css";

function MyPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/payments/my")
      .then(res => setPayments(res.data))
      .finally(() => setLoading(false));
  }, []);

  const downloadReceipt = async (id) => {
    const res = await api.get(`/api/payments/${id}/receipt`, {
      responseType: "blob",
    });

    const blob = new Blob([res.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `payment-receipt-${id}.pdf`;
    a.click();

    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />

      <div className="mypay-bg">
        <div className="mypay-wrapper">
          <div className="mypay-card">

            {/* ===== TITLE ===== */}
            <div className="mypay-title">
              My Payments
            </div>

            {/* ===== BODY ===== */}
            <div className="mypay-body">
              {loading ? (
                <div className="loading-text">Loading payments...</div>
              ) : (
                <table className="mypay-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tax Type</th>
                      <th>Method</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Receipt</th>
                    </tr>
                  </thead>

                  <tbody>
                    {payments.length === 0 && (
                      <tr>
                        <td colSpan="6">No payments found</td>
                      </tr>
                    )}

                    {payments.map((p) => (
                      <tr key={p.id}>
                        <td>{p.id}</td>
                        <td>{p.taxType}</td>
                        <td>{p.method}</td>
                        <td>₹{p.amount}</td>
                        <td>
                          {new Date(p.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary"
                            onClick={() => downloadReceipt(p.id)}
                          >
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default MyPayments;
