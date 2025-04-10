jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Example gradient background
      fontFamily: 'Arial, sans-serif',
    }}>
      <h1 style={{
        fontSize: '3em',
        color: '#333',
        marginBottom: '20px',
      }}>
        Welcome to Our AI Chatbot!
      </h1>
      <div style={{
          fontSize: '1.2em',
          color: '#555',
          maxWidth: '600px',
          textAlign: 'center',
          marginBottom: '30px',
        }}>
        <p>
          Discover the power of AI with our advanced chatbot! We're here to assist you with a wide array of tasks, from answering your questions to sparking your creativity. Dive into engaging conversations and let our AI companion help you explore new possibilities.
        </p>
      </div>
      <Link
        to="/chat"
        style={{
          padding: '12px 24px',
          fontSize: '1.3em',
          color: 'white',
          backgroundColor: '#4CAF50', // Green color
          textDecoration: 'none',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Subtle shadow
        }}
      >
        Chat Now
      </Link>
    </div>
  );
}

export default Home;