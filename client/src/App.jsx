import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/authContext";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./Pages/Home";
import ChatInterface from "./pages/Interface";
import AboutUs from "./pages/AboutUs";
import ComingSoon from "./Pages/ComingSoon";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* Updated the route path */}
        <Route path="/interface/:roomId" element={<ChatInterface />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<ComingSoon />} />
        <Route path="/profile" element={<ComingSoon />} />
        <Route path="/settings" element={<ComingSoon />} />
        <Route path="/features" element={<ComingSoon />} />
        <Route path="/pricing" element={<ComingSoon />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
