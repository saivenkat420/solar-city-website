'use client';

import Layout from '../../../components/Layout';
import SupabaseConnectionTest from '../../../components/SupabaseConnectionTest';

export default function DbTestPage() {
  return (
    <Layout>
      <SupabaseConnectionTest />
    </Layout>
  );
} 