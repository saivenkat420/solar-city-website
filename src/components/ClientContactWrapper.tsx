'use client';

import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Layout from './Layout';

// Client component that dynamically imports the contact form
const ClientContact = dynamic(
  () => import('./ClientContactPage'),
  { 
    ssr: false,
    loading: () => <LoadingComponent />
  }
);

function LoadingComponent() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      padding: '2rem'
    }}>
      <p>Loading contact form...</p>
    </div>
  );
}

export default function ClientContactWrapper() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return <LoadingComponent />;
  }
  
  return (
    <Layout>
      <Suspense fallback={<LoadingComponent />}>
        <ClientContact />
      </Suspense>
    </Layout>
  );
} 