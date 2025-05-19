'use client';

import { useState, useEffect } from 'react';
import { Box, Button, Code, Container, Heading, Text, VStack, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { supabase } from '../lib/supabase';

export default function SupabaseConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [envVars, setEnvVars] = useState<{url: string | null, key: string | null}>({ url: null, key: null });
  const [testResult, setTestResult] = useState<any>(null);
  
  // Check connection on component mount
  useEffect(() => {
    checkConnection();
  }, []);
  
  // Test Supabase connection
  const checkConnection = async () => {
    try {
      setConnectionStatus('loading');
      
      // Check if environment variables are defined
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      
      setEnvVars({
        url: supabaseUrl ? 'Defined' : 'Not defined',
        key: supabaseKey ? 'Defined' : 'Not defined'
      });
      
      if (!supabaseUrl || !supabaseKey) {
        throw new Error('Missing Supabase environment variables');
      }
      
      // Test a simple query to check connection
      const { data, error } = await supabase
        .from('contacts')
        .select('count(*)', { count: 'exact', head: true });
        
      if (error) throw error;
      
      setConnectionStatus('success');
      setTestResult(data);
    } catch (error: any) {
      console.error('Supabase connection error:', error);
      setConnectionStatus('error');
      setErrorMessage(error.message || 'Unknown error occurred');
    }
  };
  
  // Submit test data
  const submitTestData = async () => {
    try {
      setConnectionStatus('loading');
      
      const testData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '1234567890',
        message: 'This is a test message from SupabaseConnectionTest component'
      };
      
      const { data, error } = await supabase
        .from('contacts')
        .insert([testData])
        .select();
        
      if (error) throw error;
      
      setConnectionStatus('success');
      setTestResult(data);
      console.log('Test data submitted successfully:', data);
    } catch (error: any) {
      console.error('Error submitting test data:', error);
      setConnectionStatus('error');
      setErrorMessage(error.message || 'Unknown error occurred');
    }
  };
  
  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Supabase Connection Test</Heading>
        
        <Box p={4} bg="gray.50" borderRadius="md">
          <Heading size="sm" mb={2}>Environment Variables:</Heading>
          <Text>NEXT_PUBLIC_SUPABASE_URL: {envVars.url}</Text>
          <Text>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envVars.key}</Text>
        </Box>
        
        <Box>
          <Heading size="sm" mb={2}>Connection Status:</Heading>
          {connectionStatus === 'loading' && (
            <Text>Testing connection...</Text>
          )}
          
          {connectionStatus === 'success' && (
            <Alert status="success">
              <AlertIcon />
              <AlertTitle>Connected!</AlertTitle>
              <AlertDescription>Successfully connected to Supabase.</AlertDescription>
            </Alert>
          )}
          
          {connectionStatus === 'error' && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Connection Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </Box>
        
        {testResult && (
          <Box p={4} bg="gray.50" borderRadius="md">
            <Heading size="sm" mb={2}>Test Result:</Heading>
            <Code p={2} borderRadius="md" width="100%">
              {JSON.stringify(testResult, null, 2)}
            </Code>
          </Box>
        )}
        
        <Box>
          <Button 
            colorScheme="blue" 
            onClick={checkConnection} 
            mr={3}
            isLoading={connectionStatus === 'loading'}
          >
            Test Connection
          </Button>
          
          <Button 
            colorScheme="green" 
            onClick={submitTestData}
            isLoading={connectionStatus === 'loading'}
          >
            Submit Test Data
          </Button>
        </Box>
      </VStack>
    </Container>
  );
} 