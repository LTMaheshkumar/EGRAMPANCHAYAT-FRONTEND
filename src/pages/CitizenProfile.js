import { useState, useEffect } from "react";
import api from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/citizen-profile.css"; // 👈 new css

function CitizenProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    address: "",
    wardNo: "",
    aadhaarNo: "",
    dob: "",
    gender: "",
  });

  const [isExisting, setIsExisting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // load profile
  useEffect(() => {
    api.get("/api/citizen/profile")
      .then(res => {
        setProfile(res.data);
        setIsExisting(true);
      })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (isExisting) {
        await api.put("/api/citizen/profile", profile);
        setMessage("Profile updated successfully");
      } else {
        await api.post("/api/citizen/profile", profile);
        setMessage("Profile created successfully");
      }

      setTimeout(() => navigate("/dashboard"), 1200);
    } catch (err) {
      setError("Failed to save profile");
    }
  };

  return (
    <>
      <Navbar />

      <div className="citizen-profile-bg">
        <div className="citizen-profile-wrapper container">

          <div className="profile-card">
            <div className="profile-title">
              {isExisting ? "My Profile" : "Complete Your Profile"}
            </div>

            <div className="profile-body">
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <table className="profile-table">
                  <tbody>
                    <tr>
                      <th>Address</th>
                      <td>
                        <input
                          className="form-control"
                          name="address"
                          value={profile.address}
                          onChange={handleChange}
                          required
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>Ward Number</th>
                      <td>
                        <input
                          className="form-control"
                          name="wardNo"
                          value={profile.wardNo}
                          onChange={handleChange}
                          required
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>Aadhaar Number</th>
                      <td>
                        <input
                          className="form-control"
                          name="aadhaarNo"
                          value={profile.aadhaarNo}
                          onChange={handleChange}
                          required
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>Date of Birth</th>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          name="dob"
                          value={profile.dob}
                          onChange={handleChange}
                          required
                        />
                      </td>
                    </tr>

                    <tr>
                      <th>Gender</th>
                      <td>
                        <select
                          className="form-control"
                          name="gender"
                          value={profile.gender}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select</option>
                          <option value="M">Male</option>
                          <option value="F">Female</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="text-center mt-4">
                  <button className="btn btn-primary px-5">
                    Save & Continue
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default CitizenProfile;
