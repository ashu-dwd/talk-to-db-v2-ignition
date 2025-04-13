import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Context/authContext";
import Navbar from "./pages/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomePage from "./Pages/Home";
import ChatInterface from "./pages/Interface";
import AboutUs from "./pages/AboutUs";

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
      </Routes>
    </AuthProvider>
  );
}

export default App;
