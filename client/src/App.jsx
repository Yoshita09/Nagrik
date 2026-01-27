import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import LargePotholes from "./pages/ViewDetails/LargePotholes";
import Streetlight from "./pages/ViewDetails/StreetLight";
import Garbage from "./pages/ViewDetails/Garbage";
import Pipeline from "./pages/ViewDetails/Pipeline";
import Sewage from "./pages/ViewDetails/Sewage";
import InnerRoad from "./pages/ViewDetails/InnerRoad";
import Ward_map from "./pages/Ward_map";
import Report_issue from "./pages/Report_issue";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/large-potholes" element={<LargePotholes />} />
        <Route path="/streetlight" element={<Streetlight />} />
        <Route path="/garbage" element={<Garbage />} />
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/sewage" element={<Sewage />} />
        <Route path="/inner-road" element={<InnerRoad />} />
        <Route path="/ward-map" element={<Ward_map />} />
        <Route path="/report" element={<Report_issue/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}