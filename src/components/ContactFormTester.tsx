'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Code,
  Select,
} from '@chakra-ui/react';

export default function ContactFormTester() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [interestedIn, setInterestedIn] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setResponse(null);

    try {
      // Direct API call with all fields
      const apiResponse = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          interestedIn,
          street,
          city,
          district,
          state,
          pincode,
        }),
      });

      const data = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      setResponse(data);
      toast({
        title: 'Form submitted!',
        description: 'The test form was submitted successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      toast({
        title: 'Error!',
        description: err.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading>Contact Form Test</Heading>
        <Text>Use this simple form to test if data is being stored in your Supabase database.</Text>

        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {response && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Success!</AlertTitle>
            <AlertDescription>
              <Text mb={2}>Form submitted successfully!</Text>
              <Code p={2} borderRadius="md" width="100%">
                {JSON.stringify(response, null, 2)}
              </Code>
            </AlertDescription>
          </Alert>
        )}

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Phone</FormLabel>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Interested In</FormLabel>
              <Select
                value={interestedIn}
                onChange={(e) => setInterestedIn(e.target.value)}
                placeholder="Select option"
              >
                <option value="Off Grid">Off Grid</option>
                <option value="On Grid">On Grid</option>
                <option value="Other">Other</option>
              </Select>
            </FormControl>

            <Heading size="sm" pt={2}>Address Information</Heading>

            <FormControl isRequired>
              <FormLabel>Street</FormLabel>
              <Input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Street address"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>City</FormLabel>
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>District</FormLabel>
              <Input
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                placeholder="District"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>State</FormLabel>
              <Input
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Pincode</FormLabel>
              <Input
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
              />
            </FormControl>

            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isSubmitting}
              loadingText="Submitting"
              mt={4}
            >
              Submit Test Form
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
} 