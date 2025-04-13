// src/App.jsx
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
import ProtectedRoute from "../src/Pages/ProtectedRoute"; // Import the ProtectedRoute

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/features" element={<ComingSoon />} />
        <Route path="/pricing" element={<ComingSoon />} />

        {/* Protected Routes */}
        <Route
          path="/interface/:roomId"
          element={
            <ProtectedRoute>
              <ChatInterface />
            </ProtectedRoute>
          }
        />
        {/* Also protect the default chat route */}
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatInterface />
            </ProtectedRoute>
          }
        />
        {/* You might want to protect these too */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <ComingSoon />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ComingSoon />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <ComingSoon />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
