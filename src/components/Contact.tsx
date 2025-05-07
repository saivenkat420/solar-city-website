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

export const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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

  return (
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            bgGradient="linear(to-r, solar.500, sky.500)"
            bgClip="text"
          >
            Contact Us
          </Heading>

          <Card width="100%" maxW="800px">
            <form onSubmit={handleSubmit}>
              <VStack spacing={8}>
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Phone (Optional)</FormLabel>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Message</FormLabel>
                  <Textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us about your solar needs"
                    rows={6}
                  />
                </FormControl>

                <PrimaryButton
                  type="submit"
                  width="100%"
                  isLoading={isSubmitting}
                  loadingText="Sending..."
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
          >
            <Card bg="solar.50" p={6}>
              <VStack spacing={4}>
                <Heading size="md">Contact Information</Heading>
                <Text>Email: info@solarcity.com</Text>
                <Text>Phone: (555) 123-4567</Text>
                <Text>Address: 123 Solar Street, Sun City, SC 12345</Text>
              </VStack>
            </Card>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Contact; 