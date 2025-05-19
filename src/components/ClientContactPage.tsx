'use client';

import { useRef, useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Card,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  HStack,
  InputGroup,
  InputRightElement,
  IconButton,
  Select,
  List,
  ListItem,
  useToast,
  Text,
  ScaleFade,
} from '@chakra-ui/react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import PrimaryButton from './PrimaryButton';
import SubmitButton from './SubmitButton';

// Simple address prediction type
interface AddressPrediction {
  place_id: string;
  description: string;
  address_components?: any;
}

// Form data type
interface FormData {
  name: string;
  email: string;
  phone: string;
  interestedIn: string;
  street: string;
  city: string;
  district: string;
  state: string;
  pincode: string;
}

// Initial form data
const initialFormData: FormData = {
  name: '',
  email: '',
  phone: '',
  interestedIn: '',
  street: '',
  city: '',
  district: '',
  state: '',
  pincode: '',
};

export default function ClientContactPage() {
  // State
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [predictions, setPredictions] = useState<AddressPrediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const toast = useToast();
  const streetInputRef = useRef<HTMLInputElement>(null);

  // Handle input change
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    
    // Fetch predictions for street
    if (field === 'street' && value.length > 2) {
      fetchAddressPredictions(value);
    } else if (field === 'street') {
      setPredictions([]);
      setShowPredictions(false);
    }
  };

  // Fetch address predictions from OpenStreetMap
  const fetchAddressPredictions = async (input: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(input)}&countrycodes=in&addressdetails=1&limit=5`,
        {
          headers: {
            'Accept': 'application/json',
            'Referer': 'https://solar-city-website.com'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      
      // Format predictions
      const formattedPredictions = data.map((item: any) => ({
        place_id: item.place_id,
        description: item.display_name,
        address_components: item.address,
      }));
      
      setPredictions(formattedPredictions);
      setShowPredictions(formattedPredictions.length > 0);
    } catch (error) {
      console.error('Error fetching address predictions:', error);
      setPredictions([]);
      setShowPredictions(false);
    }
  };

  // Handle prediction selection
  const handlePredictionSelect = (prediction: AddressPrediction) => {
    setShowPredictions(false);
    
    if (prediction.address_components) {
      const address = prediction.address_components;
      
      setFormData(prev => ({
        ...prev,
        street: address.road || address.pedestrian || address.street || prediction.description,
        city: address.city || address.town || address.village || '',
        district: address.county || address.state_district || '',
        state: address.state || '',
        pincode: address.postcode || ''
      }));
    } else {
      setFormData(prev => ({ ...prev, street: prediction.description }));
    }
  };

  // Use geolocation
  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast({ title: 'Geolocation not supported', status: 'error', duration: 4000 });
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'Accept': 'application/json',
                'Referer': 'https://solar-city-website.com'
              }
            }
          );
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const data = await response.json();
          
          if (data && data.address) {
            const address = data.address;
            setFormData(prev => ({
              ...prev,
              street: address.road || address.pedestrian || address.street || `${latitude}, ${longitude}`,
              city: address.city || address.town || address.village || '',
              district: address.county || address.state_district || '',
              state: address.state || '',
              pincode: address.postcode || ''
            }));
          } else {
            setFormData(prev => ({ ...prev, street: `${latitude}, ${longitude}` }));
          }
        } catch (error) {
          console.error('Error getting address from coordinates:', error);
          setFormData(prev => ({ ...prev, street: `${latitude}, ${longitude}` }));
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        toast({ title: 'Unable to fetch location', status: 'error', duration: 4000 });
      }
    );
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (formData.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number';
    }
    
    if (!formData.interestedIn) {
      newErrors.interestedIn = 'Please select an option';
    }
    
    if (!formData.street.trim()) {
      newErrors.street = 'Street is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Invalid pincode';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({ title: 'Validation Error', description: 'Please check the form for errors', status: 'error', duration: 5000, isClosable: true });
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Send data to our API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit contact form');
      }
      
      // Show success message and scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setShowSuccess(true);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({ 
        title: 'Error', 
        description: error instanceof Error ? error.message : 'Failed to send request. Please try again.',
        status: 'error', 
        duration: 5000, 
        isClosable: true 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show success message
  if (showSuccess) {
    return (
      <Box py={{ base: 10, md: 20 }} bg="gray.50">
        <Container maxW="container.xl">
          <ScaleFade initialScale={0.9} in={true}>
            <VStack spacing={8}>
              <Card width="100%" maxW="600px" p={8} textAlign="center">
                <Heading size="lg" color="green.500" mb={4}>Thank You!</Heading>
                <Text fontSize="lg" mb={6}>We received your request and will contact you soon.</Text>
                <PrimaryButton
                  onClick={() => setShowSuccess(false)}
                  width="60%"
                  mx="auto"
                  fontSize="md"
                  py={3}
                >
                  Back to Form
                </PrimaryButton>
              </Card>
            </VStack>
          </ScaleFade>
        </Container>
      </Box>
    );
  }

  return (
    <Box py={{ base: 10, md: 20 }} bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading
            as="h2"
            size="lg"
            textAlign="center"
            bgGradient="linear(to-r, orange.500, red.500)"
            bgClip="text"
          >
            Contact Us
          </Heading>
          
          <Card width="100%" maxW="600px" p={{ base: 4, md: 6 }}>
            <form onSubmit={handleSubmit} noValidate>
              <VStack spacing={6}>
                <FormControl isRequired isInvalid={!!errors.name}>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter your name"
                  />
                  <FormErrorMessage>{errors.name}</FormErrorMessage>
                </FormControl>
                
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel>Email (optional)</FormLabel>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="Enter your email"
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.phone}>
                  <FormLabel>Phone Number</FormLabel>
                  <Input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                  />
                  <FormErrorMessage>{errors.phone}</FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.interestedIn}>
                  <FormLabel>Interested In</FormLabel>
                  <Select
                    placeholder="Select option"
                    value={formData.interestedIn}
                    onChange={(e) => handleInputChange('interestedIn', e.target.value)}
                  >
                    <option value="Off Grid">Off Grid</option>
                    <option value="On Grid">On Grid</option>
                  </Select>
                  <FormErrorMessage>{errors.interestedIn}</FormErrorMessage>
                </FormControl>
                
                <FormControl isRequired isInvalid={!!errors.street} position="relative">
                  <FormLabel>Street</FormLabel>
                  <Input
                    ref={streetInputRef}
                    type="text"
                    value={formData.street}
                    onChange={(e) => handleInputChange('street', e.target.value)}
                    placeholder="Enter your street address"
                    autoComplete="off"
                    onBlur={() => {
                      setTimeout(() => setShowPredictions(false), 200);
                    }}
                  />
                  {showPredictions && (
                    <Box position="absolute" zIndex={10} bg="white" w="100%" boxShadow="md" borderRadius="md" mt={1} maxH="180px" overflowY="auto">
                      <List spacing={0}>
                        {predictions.map((pred) => (
                          <ListItem 
                            key={pred.place_id} 
                            px={3} 
                            py={2} 
                            _hover={{ bg: "gray.100", cursor: "pointer" }} 
                            onClick={() => handlePredictionSelect(pred)}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {pred.description}
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                  <FormErrorMessage>{errors.street}</FormErrorMessage>
                </FormControl>
                
                <HStack spacing={4} w="100%">
                  <FormControl isRequired isInvalid={!!errors.city}>
                    <FormLabel>City</FormLabel>
                    <Input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      placeholder="Enter your city"
                    />
                    <FormErrorMessage>{errors.city}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.district}>
                    <FormLabel>District</FormLabel>
                    <Input
                      type="text"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      placeholder="Enter your district"
                    />
                    <FormErrorMessage>{errors.district}</FormErrorMessage>
                  </FormControl>
                </HStack>
                
                <HStack spacing={4} w="100%">
                  <FormControl isRequired isInvalid={!!errors.state}>
                    <FormLabel>State</FormLabel>
                    <Input
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      placeholder="Enter your state"
                    />
                    <FormErrorMessage>{errors.state}</FormErrorMessage>
                  </FormControl>
                  <FormControl isRequired isInvalid={!!errors.pincode}>
                    <FormLabel>Pincode</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => handleInputChange('pincode', e.target.value)}
                        placeholder="Enter your pincode"
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label="Use my location"
                          icon={<FaMapMarkerAlt />}
                          onClick={handleUseLocation}
                          variant="ghost"
                          colorScheme="green"
                          size="sm"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.pincode}</FormErrorMessage>
                  </FormControl>
                </HStack>
                
                <SubmitButton
                  isLoading={isSubmitting}
                >
                  SUBMIT REQUEST
                </SubmitButton>
              </VStack>
            </form>
          </Card>
        </VStack>
      </Container>
    </Box>
  );
} 