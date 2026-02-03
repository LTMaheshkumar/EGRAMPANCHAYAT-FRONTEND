import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";

function PaymentPage() {
  const [taxType, setTaxType] = useState("");
  const [method, setMethod] = useState("UPI");
  const [profile, setProfile] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/api/citizen/profile");
      setProfile(res.data);
    } catch {
      setError("Please complete your profile first");
    }
  };

  const payNow = async () => {
    if (!taxType) {
      alert("Select tax type");
      return;
    }

    try {
      const res = await api.post("/api/payments", null, {
        params: { taxType, method },
      });
      setMessage("Payment successful");
    } catch {
      setError("Payment failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4 col-md-6">
        <h3 className="mb-3 text-center">Pay Tax</h3>

        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}

        <div className="card p-4 shadow">
          <h6>Citizen Details</h6>
          <p><b>Name:</b> {profile?.user?.name}</p>
          <p><b>Address:</b> {profile.address}</p>
          <p><b>Ward:</b> {profile.wardNo}</p>

          <hr />

          <select
            className="form-control mb-2"
            onChange={(e) => setTaxType(e.target.value)}
          >
            <option value="">Select Tax Type</option>
            <option value="PROPERTY_TAX">Property Tax</option>
            <option value="WATER_TAX">Water Tax</option>
          </select>

          <select
            className="form-control mb-3"
            onChange={(e) => setMethod(e.target.value)}
          >
            <option>UPI</option>
            <option>CARD</option>
            <option>NET_BANKING</option>
          </select>

          <button className="btn btn-success w-100" onClick={payNow}>
            Pay Now
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
