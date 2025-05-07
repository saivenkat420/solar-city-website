"use client";

import { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  Text,
  useToast,
  FormErrorMessage,
  Skeleton,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Card from './Card';
import PrimaryButton from './PrimaryButton';

const MotionBox = motion(Box);

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (formData.phone && !/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: 'Validation Error',
        description: 'Please check the form for errors',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contacts')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: formData.message,
        }]);

      if (error) throw error;

      toast({
        title: 'Message Sent',
        description: 'We will get back to you soon!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Simulate initial loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  });

  if (isLoading) {
    return (
      <Box py={20} bg="gray.50">
        <Container maxW="container.xl">
          <VStack spacing={12}>
            <Skeleton height="40px" width="300px" />
            <Card width="100%" maxW="800px">
              <VStack spacing={8}>
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} height="60px" width="100%" />
                ))}
              </VStack>
            </Card>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box py={{ base: 10, md: 20 }} bg="gray.50">
      <Container maxW="container.xl" px={{ base: 2, sm: 4, md: 8 }}>
        <VStack spacing={{ base: 6, md: 12 }}>
          <Heading
            as="h2"
            size={{ base: 'lg', md: 'xl' }}
            textAlign="center"
            bgGradient="linear(to-r, solar.500, sky.500)"
            bgClip="text"
          >
            Contact Us
          </Heading>
          <Card width="100%" maxW="800px" p={{ base: 2, sm: 4, md: 6 }}>
            <form onSubmit={handleSubmit} noValidate>
              <VStack spacing={{ base: 4, md: 8 }}>
                <FormControl isRequired isInvalid={!!errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                    aria-label="Your name"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.email}>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                    aria-label="Your email"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.phone}>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    aria-label="Your phone number"
                  />
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.message}>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your solar needs"
                    rows={6}
                    aria-label="Your message"
                  />
                  <FormErrorMessage>{errors.message}</FormErrorMessage>
                </FormControl>

                <PrimaryButton
                  type="submit"
                  width="100%"
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                  aria-label="Send message"
                  fontSize={{ base: 'md', md: 'lg' }}
                  py={{ base: 5, md: 6 }}
                >
                  Send Message
                </PrimaryButton>
              </VStack>
            </form>
          </Card>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            width="100%"
          >
            <Card bg="solar.50" p={{ base: 2, sm: 4, md: 6 }}>
              <VStack spacing={4}>
                <Heading size={{ base: 'sm', md: 'md' }}>Contact Information</Heading>
                <Text fontSize={{ base: 'sm', md: 'md' }}>Email: info@solarcity.com</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }}>Phone: (555) 123-4567</Text>
                <Text fontSize={{ base: 'sm', md: 'md' }}>Address: 123 Solar Street, Sun City, SC 12345</Text>
              </VStack>
            </Card>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact; 