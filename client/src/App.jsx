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

      </Routes>
      <Footer />
    </BrowserRouter>
  );
}