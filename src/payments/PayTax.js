import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/pay-tax.css";

function PayTax() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const uiTaxType = state?.taxType;
  const [profile, setProfile] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [loading, setLoading] = useState(false);

  const amount = uiTaxType === "PROPERTY_TAX" ? 1200 : 300;

  useEffect(() => {
    api.get("/api/citizen/profile")
      .then(res => setProfile(res.data))
      .catch(() => {});
  }, []);

  // UI → Backend enum mapping
  const backendTaxType =
    uiTaxType === "WATER_TAX" ? "WATER_BILL" : uiTaxType;

  const confirmPayment = async () => {
    try {
      setLoading(true);

      // STEP 1️⃣ Create Razorpay Order (backend)
      const orderRes = await api.post(
        "/api/payments/razorpay/order",
        null,
        { params: { taxType: backendTaxType } }
      );

      const { orderId, currency } = orderRes.data;

      // STEP 2️⃣ Open Razorpay Checkout
      const options = {
        key: "rzp_test_SB6obQQXDmKMcv", // test key
        amount: amount * 100,
        currency,
        name: "E-Gram Panchayat",
        description: "Tax Payment",
        order_id: orderId,

        handler: async function (response) {
          // STEP 3️⃣ Verify payment (backend)
          await api.post(
            "/api/payments/razorpay/verify",
            null,
            {
              params: {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                taxType: backendTaxType,
              },
            }
          );

          alert("Payment Successful");
          navigate("/my-payments");
        },

        theme: { color: "#0d47a1" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (e) {
      alert("Payment Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="pay-bg">
        <div className="pay-wrapper">
          {/* LEFT */}
          <div className="pay-left">
            <h4>Citizen Details</h4>

            <table className="details-table">
              <tbody>
                <tr><td>Name</td><td>{profile?.user?.name || "-"}</td></tr>
                <tr><td>Email</td><td>{profile?.user?.email || "-"}</td></tr>
                <tr><td>Mobile</td><td>{profile?.user?.mobile || "-"}</td></tr>
                <tr><td>Address</td><td>{profile?.address || "-"}</td></tr>
                <tr><td>Ward No</td><td>{profile?.wardNo || "-"}</td></tr>
              </tbody>
            </table>

            <div className="amount-box">
              Amount: ₹{amount}
            </div>

            <button
              className="pay-now-btn"
              disabled={loading}
              onClick={confirmPayment}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </div>

          {/* RIGHT */}
          <div className="pay-right">
            <h4>Select Payment Method</h4>

            <div className="method-tabs">
              <span
                className={paymentMethod === "UPI" ? "active" : ""}
                onClick={() => setPaymentMethod("UPI")}
              >
                UPI
              </span>
              <span
                className={paymentMethod === "NETBANKING" ? "active" : ""}
                onClick={() => setPaymentMethod("NETBANKING")}
              >
                Net Banking
              </span>
              <span
                className={paymentMethod === "CARD" ? "active" : ""}
                onClick={() => setPaymentMethod("CARD")}
              >
                Card
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PayTax;
