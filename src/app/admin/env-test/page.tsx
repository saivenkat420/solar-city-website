'use client';

import { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Alert, 
  AlertIcon, 
  AlertTitle, 
  AlertDescription,
  Code,
  VStack,
  Button
} from '@chakra-ui/react';

export default function EnvTestPage() {
  const [envVars, setEnvVars] = useState<Record<string, string | undefined>>({});
  
  useEffect(() => {
    // Get environment variables in client component
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 
        'Defined (value hidden for security)' : undefined,
    });
  }, []);
  
  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading>Environment Variables Test</Heading>
          <Text>
            This page checks if your Supabase environment variables are properly defined.
            For security reasons, only the existence of keys is checked, not their actual values.
          </Text>
          
          <Box p={4} bg="gray.50" borderRadius="md">
            <Heading size="md" mb={4}>Environment Variables</Heading>
            
            {Object.entries(envVars).map(([key, value]) => (
              <Box key={key} mb={3}>
                <Text fontWeight="bold">{key}:</Text>
                {value ? (
                  <Alert status="success" mt={1}>
                    <AlertIcon />
                    <Text>{value === 'Defined (value hidden for security)' ? value : value}</Text>
                  </Alert>
                ) : (
                  <Alert status="error" mt={1}>
                    <AlertIcon />
                    <AlertTitle>Missing!</AlertTitle>
                    <AlertDescription>
                      This environment variable is not defined.
                    </AlertDescription>
                  </Alert>
                )}
              </Box>
            ))}
          </Box>
          
          <Alert status={
            Object.values(envVars).every(Boolean) ? 'success' : 'error'
          }>
            <AlertIcon />
            <Box>
              <AlertTitle>
                {Object.values(envVars).every(Boolean) 
                  ? 'Environment variables are set!' 
                  : 'Missing environment variables!'}
              </AlertTitle>
              <AlertDescription>
                {Object.values(envVars).every(Boolean) 
                  ? 'Your Supabase environment variables are properly configured.' 
                  : 'Please add the missing environment variables to your .env.local file.'}
              </AlertDescription>
            </Box>
          </Alert>
          
          <Box>
            <Heading size="md" mb={3}>How to fix missing environment variables</Heading>
            <Text mb={3}>
              If any environment variables are missing, you need to create or update your
              <Code mx={1}>.env.local</Code>
              file in the root of your project with the following:
            </Text>
            
            <Code p={3} borderRadius="md" display="block" whiteSpace="pre" mb={3}>
              {`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`}
            </Code>
            
            <Text mb={3}>
              You can find these values in your Supabase dashboard under:
              <br />
              <Code>Project Settings → API</Code>
            </Text>
            
            <Text fontWeight="bold">
              Remember to restart your development server after adding these variables!
            </Text>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
} 