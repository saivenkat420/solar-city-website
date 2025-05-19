'use client';

import dynamic from 'next/dynamic';

// Import ScrollInsightButton with client-side only rendering (no SSR)
const ScrollInsightButton = dynamic(
  () => import('./ScrollInsightButton'),
  { ssr: false }
);

export default function ScrollInsightButtonWrapper() {
  return <ScrollInsightButton />;
} 