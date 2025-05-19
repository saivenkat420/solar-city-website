"use client";

import { Box } from '@chakra-ui/react';
import Layout from '../../components/Layout';
import QuotationCalculator from '../../components/QuotationCalculator';

export default function QuotationPage() {
  return (
    <Layout>
      <Box 
        minH="calc(100vh - 80px)"
        bg="gray.50"
        backgroundImage="linear-gradient(to bottom, rgba(255,255,255,0.8), rgba(255,255,255,0.8)), url('/images/solar-bg.jpg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundAttachment="fixed"
        aria-label="Quotation calculator section"
      >
        <QuotationCalculator />
      </Box>
    </Layout>
  );
} 