import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import MentorProfile from "./pages/MentorProfile";
import Mentorship from "./pages/Mentorship";
import Marketplace from "./pages/Marketplace";
import SellerDashboard from "./pages/SellerDashboard";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentor-profile" element={<MentorProfile />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/marketplace/dashboard" element={<SellerDashboard />} />
        <Route path="/marketplace/local-products/:productId" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
