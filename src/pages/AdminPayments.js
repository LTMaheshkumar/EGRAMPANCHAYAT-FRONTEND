import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/admin-payments.css";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/api/admin/payments")
      .then(res => setPayments(res.data))
      .finally(() => setLoading(false));
  }, []);

  // ===== HELPER: PAYMENT REF =====
  const getPaymentRef = (p) => {
    return (
      p.paymentId ||
      p.razorpayPaymentId ||
      p.orderId ||
      `TXN-${p.id}`
    );
  };

  // ===== EXCEL EXPORT =====
  const exportExcel = () => {
    const data = payments.map(p => {
      const paidDate = new Date(p.createdAt || p.paidAt);
      const validTill = new Date(paidDate);
      validTill.setFullYear(validTill.getFullYear() + 1);

      return {
        ID: p.id,
        Citizen: p.userEmail,
        TaxType: p.taxType,
        Amount: p.amount,
        PaymentRef: getPaymentRef(p),
        PaidOn: paidDate.toLocaleDateString(),
        ValidTill: validTill.toLocaleDateString()
      };
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payments");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer]), "admin-payments.xlsx");
  };

  return (
    <>
      <Navbar />

      <div className="admin-pay-bg">
        <div className="admin-pay-wrapper container">

          <div className="admin-pay-card">
            <div className="admin-pay-title">
              Tax Payments (Admin)
            </div>

            <div className="admin-pay-body">

              <div className="text-end mb-3">
                <button
                  className="btn btn-success btn-sm"
                  onClick={exportExcel}
                >
                  Export Excel
                </button>
              </div>

              {loading ? (
                <div className="text-center fw-semibold">
                  Loading payments...
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-pay-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Citizen</th>
                        <th>Tax</th>
                        <th>Amount</th>
                        <th>Payment Ref</th>
                        <th>Paid On</th>
                        <th>Valid Till</th>
                      </tr>
                    </thead>

                    <tbody>
                      {payments.length === 0 && (
                        <tr>
                          <td colSpan="7" className="text-center">
                            No payments found
                          </td>
                        </tr>
                      )}

                      {payments.map(p => {
                        const paidDate = new Date(p.createdAt || p.paidAt);
                        const validTill = new Date(paidDate);
                        validTill.setFullYear(validTill.getFullYear() + 1);

                        return (
                          <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.userEmail}</td>
                            <td>{p.taxType}</td>
                            <td>₹ {p.amount}</td>
                            <td>{getPaymentRef(p)}</td>
                            <td>{paidDate.toLocaleDateString()}</td>
                            <td>{validTill.toLocaleDateString()}</td>
                          </tr>
                        );
                      })}
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

export default AdminPayments;
