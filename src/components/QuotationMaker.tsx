"use client";

import { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  Text,
  useToast,
  Progress,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Card from './Card';
import PrimaryButton from './PrimaryButton';

const MotionBox = motion(Box);

interface FormData {
  roofSize: number;
  energyUsage: number;
  location: string;
  systemType: string;
}

const LOCATIONS = [
  { value: 'north', label: 'North Region', multiplier: 1.2 },
  { value: 'south', label: 'South Region', multiplier: 1.0 },
  { value: 'east', label: 'East Region', multiplier: 1.1 },
  { value: 'west', label: 'West Region', multiplier: 1.15 },
];

const SYSTEM_TYPES = [
  { value: 'standard', label: 'Standard System', multiplier: 1.0 },
  { value: 'premium', label: 'Premium System', multiplier: 1.3 },
  { value: 'luxury', label: 'Luxury System', multiplier: 1.5 },
];

const calculateCost = (data: FormData): number => {
  const baseCost = data.roofSize * 20; // $20 per square foot
  const locationMultiplier = LOCATIONS.find(loc => loc.value === data.location)?.multiplier || 1;
  const systemMultiplier = SYSTEM_TYPES.find(sys => sys.value === data.systemType)?.multiplier || 1;
  
  return baseCost * locationMultiplier * systemMultiplier;
};

const calculateProgress = (data: FormData): number => {
  let progress = 0;
  if (data.roofSize > 0) progress += 25;
  if (data.energyUsage > 0) progress += 25;
  if (data.location) progress += 25;
  if (data.systemType) progress += 25;
  return progress;
};

export const QuotationMaker = () => {
  const [formData, setFormData] = useState<FormData>({
    roofSize: 0,
    energyUsage: 0,
    location: '',
    systemType: '',
  });

  const toast = useToast();
  const progress = calculateProgress(formData);
  const estimatedCost = calculateCost(formData);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Quote Generated',
      description: `Estimated cost: $${estimatedCost.toLocaleString()}`,
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

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
            Get Your Solar Quote
          </Heading>

          <Card width="100%" maxW="800px" p={{ base: 2, sm: 4, md: 6 }}>
            <form onSubmit={handleSubmit}>
              <VStack spacing={{ base: 4, md: 8 }}>
                <Progress
                  value={progress}
                  size="sm"
                  colorScheme="solar"
                  width="100%"
                  borderRadius="full"
                />

                <FormControl isRequired>
                  <FormLabel>Roof Size (sq ft)</FormLabel>
                  <Input
                    type="number"
                    value={formData.roofSize}
                    onChange={(e) => handleInputChange('roofSize', Number(e.target.value))}
                    placeholder="Enter your roof size"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Monthly Energy Usage (kWh)</FormLabel>
                  <Input
                    type="number"
                    value={formData.energyUsage}
                    onChange={(e) => handleInputChange('energyUsage', Number(e.target.value))}
                    placeholder="Enter your monthly energy usage"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Location</FormLabel>
                  <Select
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Select your region"
                  >
                    {LOCATIONS.map((location) => (
                      <option key={location.value} value={location.value}>
                        {location.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>System Type</FormLabel>
                  <Select
                    value={formData.systemType}
                    onChange={(e) => handleInputChange('systemType', e.target.value)}
                    placeholder="Select system type"
                  >
                    {SYSTEM_TYPES.map((system) => (
                      <option key={system.value} value={system.value}>
                        {system.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                {progress === 100 && (
                  <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    width="100%"
                  >
                    <Card bg="solar.50" p={6}>
                      <VStack spacing={4}>
                        <Heading size="md">Estimated Cost</Heading>
                        <Text fontSize="3xl" fontWeight="bold" color="solar.500">
                          ${estimatedCost.toLocaleString()}
                        </Text>
                        <Text textAlign="center" color="gray.600">
                          This is an estimate based on your inputs. Contact us for a detailed quote.
                        </Text>
                      </VStack>
                    </Card>
                  </MotionBox>
                )}

                <PrimaryButton
                  type="submit"
                  width="100%"
                  isDisabled={progress < 100}
                  fontSize={{ base: 'md', md: 'lg' }}
                  py={{ base: 5, md: 6 }}
                >
                  Get Quote
                </PrimaryButton>
              </VStack>
            </form>
          </Card>

          <Accordion width="100%" maxW="800px" allowMultiple>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    How accurate is this quote?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                This is an initial estimate based on your inputs. For a more accurate quote, we'll need to conduct a site survey to assess your specific requirements, roof condition, and energy needs.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    What's included in the cost?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                The estimated cost includes solar panels, inverters, mounting hardware, installation, and basic electrical work. Additional costs may include roof reinforcement, battery storage, or special permits.
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </VStack>
      </Container>
    </Box>
  );
};

export default QuotationMaker; 