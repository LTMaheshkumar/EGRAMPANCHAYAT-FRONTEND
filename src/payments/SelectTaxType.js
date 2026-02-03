import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/select-tax-type.css";

function SelectTaxType() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="tax-bg">
        <div className="tax-content">
          <h3 className="text-center mb-4">Select Tax Type</h3>

          <div className="tax-card-wrapper">
            {/* WATER TAX */}
            <div className="tax-card">
              <div className="tax-icon">💧</div>
              <h5>Water Bill</h5>
              <p>Pay your water usage charges</p>
              <button
                className="tax-btn blue"
                onClick={() =>
                  navigate("/payments/pay", {
                    state: { taxType: "WATER_TAX" },
                  })
                }
              >
                Pay Water Tax
              </button>
            </div>

            {/* PROPERTY TAX */}
            <div className="tax-card">
              <div className="tax-icon">🏠</div>
              <h5>Property Tax</h5>
              <p>Pay your property tax</p>
              <button
                className="tax-btn green"
                onClick={() =>
                  navigate("/payments/pay", {
                    state: { taxType: "PROPERTY_TAX" },
                  })
                }
              >
                Pay Property Tax
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectTaxType;
