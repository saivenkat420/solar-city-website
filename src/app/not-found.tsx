// This file is a server component to handle metadata
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist',
  robots: {
    index: false,
    follow: false
  }
};

// Actual 404 page functionality
export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: 'calc(100vh - 80px)',
      padding: '2rem',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{ 
        maxWidth: '600px', 
        textAlign: 'center',
        padding: '2rem'
      }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2B6CB0', marginBottom: '1rem' }}>
          404
        </h1>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          Page Not Found
        </h2>
        <p style={{ fontSize: '1.1rem', color: '#4A5568', marginBottom: '2rem' }}>
          The page you are looking for doesn't exist or has been moved.
        </p>
        <a 
          href="/"
          style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            backgroundColor: '#2B6CB0',
            color: 'white',
            borderRadius: '0.375rem',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Return Home
        </a>
      </div>
    </div>
  );
} 