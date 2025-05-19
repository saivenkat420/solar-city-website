'use client';

import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  SimpleGrid,
  Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Button,
  Icon,
  VStack
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaDatabase, FaFileAlt, FaWrench, FaCog } from 'react-icons/fa';

export default function AdminDashboard() {
  return (
    <Layout>
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center" pb={6}>
            <Heading>Admin Dashboard</Heading>
            <Text mt={2}>Diagnostic tools for Solar City website</Text>
          </Box>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            <Card>
              <CardHeader>
                <Heading size="md" display="flex" alignItems="center">
                  <Icon as={FaDatabase} mr={2} color="blue.500" />
                  Database Connection Test
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Test if your application can connect to the Supabase database and view connection details.
                </Text>
              </CardBody>
              <CardFooter>
                <Link href="/admin/db-test" passHref style={{ width: '100%' }}>
                  <Button colorScheme="blue" width="100%">
                    Run Database Test
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <Heading size="md" display="flex" alignItems="center">
                  <Icon as={FaFileAlt} mr={2} color="green.500" />
                  Form Submission Test
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Test the form submission process to see if data is being stored in the database.
                </Text>
              </CardBody>
              <CardFooter>
                <Link href="/admin/form-test" passHref style={{ width: '100%' }}>
                  <Button colorScheme="green" width="100%">
                    Run Form Test
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <Heading size="md" display="flex" alignItems="center">
                  <Icon as={FaCog} mr={2} color="purple.500" />
                  Environment Variables Test
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Check if your environment variables are properly configured for Supabase.
                </Text>
              </CardBody>
              <CardFooter>
                <Link href="/admin/env-test" passHref style={{ width: '100%' }}>
                  <Button colorScheme="purple" width="100%">
                    Check Environment
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <Heading size="md" display="flex" alignItems="center">
                  <Icon as={FaWrench} mr={2} color="red.500" />
                  Supabase Dashboard
                </Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  Open the Supabase dashboard to directly view and manage your database.
                </Text>
              </CardBody>
              <CardFooter>
                <Button 
                  as="a" 
                  href="https://app.supabase.io/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  colorScheme="red" 
                  width="100%"
                >
                  Open Supabase Dashboard
                </Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
          
          <Box p={6} bg="blue.50" borderRadius="md" mt={8}>
            <Heading size="md" mb={3}>Database Troubleshooting</Heading>
            <Text mb={2}>If you're experiencing issues with data not being stored, check the following:</Text>
            <VStack align="stretch" spacing={1} pl={4}>
              <Text>1. Ensure your Supabase environment variables are correctly set in .env.local</Text>
              <Text>2. Check if the contacts table exists in your Supabase database</Text>
              <Text>3. Verify Row Level Security (RLS) policies allow insert operations</Text>
              <Text>4. Check browser console for any API errors when submitting forms</Text>
              <Text>5. Make sure your Supabase project is active and not in maintenance mode</Text>
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Layout>
  );
} 