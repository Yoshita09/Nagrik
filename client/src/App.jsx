// src/App.jsx
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/LoginActivity/Login";
import PostLogin from "./pages/LoginActivity/PostLogin";
import CitizenRedirect from "./pages/LoginActivity/CitizenRedirect";
import GovRedirect from "./pages/LoginActivity/GovRedirect";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Report_issue from "./pages/Report_issue";
import Ward_map from "./pages/Ward_map";
import GovComplaints from "./pages/ComplaintBox/GovComplaints";
import GovComplaintUpdate from "./pages/ComplaintBox/GovComplaintUpdate";
import AIAssistant from "./pages/AI_assistant";
import ViewComplaintDetails from "./pages/ViewComplaintDetails";


export default function App() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Role redirects */}
        <Route path="/citizen-redirect" element={<CitizenRedirect />} />
        <Route path="/gov-redirect" element={<GovRedirect />} />
        <Route path="/post-login" element={<PostLogin />} />

        {/* Citizen */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["citizen", "government"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <Report_issue />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <ProtectedRoute allowedRoles={["citizen"]}>
              <AIAssistant />
            </ProtectedRoute>
          }
        />

        {/* Government */}
        <Route
          path="/ward-map"
          element={
            <ProtectedRoute allowedRoles={["citizen", "government"]}>
              <Ward_map />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gov-complaints"
          element={
            <ProtectedRoute allowedRoles={["government"]}>
              <GovComplaints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gov-complaints/:id"
          element={
            <ProtectedRoute allowedRoles={["government"]}>
              <GovComplaintUpdate />
            </ProtectedRoute>
          }
        />

        {/* Shared */}
        {/* <Route path="/gov-complaints/:id" element={<LargePotholes />} />
        <Route path="/streetlight" element={<Streetlight />} />
        <Route path="/garbage" element={<Garbage />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/sewage" element={<Sewage />} />
        <Route path="/inner-road" element={<InnerRoad />} /> */}
        <Route path="/complaint/:id" element={<ViewComplaintDetails />} />
      </Routes>

      <Footer />
    </>
  );
}
