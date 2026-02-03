import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";
import PrivateRoute from "./utils/PrivateRoute";

import Footer from "./components/Footer";

// ================= CITIZEN =================
import CitizenDashboard from "./pages/CitizenDashboard";
import ApplyCertificate from "./certificates/ApplyCertificate";
import MyCertificates from "./certificates/MyCertificates";
import RaiseComplaint from "./complaints/RaiseComplaint";
import MyComplaints from "./complaints/MyComplaints";
import CitizenProfile from "./pages/CitizenProfile";

// ================= ADMIN =================
import AdminDashboard from "./pages/AdminDashboard";
import AdminCertificates from "./pages/AdminCertificates";
import AdminComplaints from "./pages/AdminComplaints";
import AdminCitizens from "./pages/AdminCitizens";
import AdminPayments from "./pages/AdminPayments";

// ================= PAYMENTS =================
import PaymentPage from "./payments/PaymentPage";
import MyPayments from "./payments/MyPayments";
import SelectTaxType from "./payments/SelectTaxType";
import PayTax from "./payments/PayTax";

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* ================= AUTH ================= */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= CITIZEN ================= */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <CitizenDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/apply-certificate"
          element={
            <PrivateRoute>
              <ApplyCertificate />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-certificates"
          element={
            <PrivateRoute>
              <MyCertificates />
            </PrivateRoute>
          }
        />

        <Route
          path="/citizen-profile"
          element={
            <PrivateRoute>
              <CitizenProfile />
            </PrivateRoute>
          }
        />

        <Route
          path="/complaints"
          element={
            <PrivateRoute>
              <RaiseComplaint />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-complaints"
          element={
            <PrivateRoute>
              <MyComplaints />
            </PrivateRoute>
          }
        />

        {/* ================= PAYMENTS ================= */}
        <Route
          path="/pay-tax"
          element={
            <PrivateRoute>
              <PaymentPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/payments/select"
          element={
            <PrivateRoute>
              <SelectTaxType />
            </PrivateRoute>
          }
        />

        <Route
          path="/payments/pay"
          element={
            <PrivateRoute>
              <PayTax />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-payments"
          element={
            <PrivateRoute>
              <MyPayments />
            </PrivateRoute>
          }
        />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/payments"
          element={
            <PrivateRoute>
              <AdminPayments />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/certificates"
          element={
            <PrivateRoute>
              <AdminCertificates />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/complaints"
          element={
            <PrivateRoute>
              <AdminComplaints />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/citizens"
          element={
            <PrivateRoute>
              <AdminCitizens />
            </PrivateRoute>
          }
        />
      </Routes>

      {/* ✅ GLOBAL FOOTER – APPLIES TO ALL PAGES */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
