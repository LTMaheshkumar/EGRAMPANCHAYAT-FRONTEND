import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import Navbar from "../components/Navbar";
import "../styles/RaiseComplaint.css";

function RaiseComplaint() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/api/complaints", {
        title,
        description,
      });

      setMessage("Complaint submitted successfully");
      setTitle("");
      setDescription("");
    } catch (err) {
      setError("Failed to submit complaint");
    }
  };

  return (
    <>
      <Navbar />

      <div className="raise-bg">
        <div className="raise-wrapper">
          <div className="container">
            <div className="raise-card col-md-6 mx-auto">
              <h3 className="raise-title">
                Raise Complaint
              </h3>

              {message && (
                <div className="alert alert-success text-center">
                  {message}
                </div>
              )}
              {error && (
                <div className="alert alert-danger text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">
                    Title
                  </label>
                  <input
                    className="form-control"
                    placeholder="Enter complaint title"
                    value={title}
                    onChange={(e) =>
                      setTitle(e.target.value)
                    }
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Describe your issue"
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    required
                  ></textarea>
                </div>

                <button className="btn submit-btn w-100">
                  Submit Complaint
                </button>
              </form>

              <div className="text-center mt-3">
                <button
                  className="btn track-btn btn-sm"
                  onClick={() =>
                    navigate("/my-complaints")
                  }
                >
                  Track My Complaint Status
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RaiseComplaint;
