"use client";

import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react';
import Layout from './Layout';
import { useRouter } from 'next/navigation';

export default function NotFoundClient() {
  const router = useRouter();

  return (
    <Layout>
      <Box 
        as="section"
        minH="calc(100vh - 80px)" 
        bg="gray.50" 
        pt={{ base: '6rem', md: '8rem' }}
        pb="6rem"
      >
        <Container maxW="container.md" textAlign="center">
          <VStack spacing={8}>
            <Heading as="h1" size="2xl" fontWeight="bold" color="solar.500">
              404
            </Heading>
            
            <Heading as="h2" size="xl">
              Page Not Found
            </Heading>
            
            <Text fontSize="lg" color="gray.600" maxW="md" mx="auto">
              The page you are looking for doesn't exist or has been moved.
            </Text>
            
            <Button 
              size="lg"
              colorScheme="blue"
              bgGradient="linear(to-r, solar.500, sky.500)"
              _hover={{ bgGradient: 'linear(to-r, sky.500, solar.500)' }}
              onClick={() => router.push('/')}
            >
              Return Home
            </Button>
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
} 