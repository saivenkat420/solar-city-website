import React from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Flex,
  Badge,
  Divider,
  Icon,
  Image,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSolarPanel, FaBatteryFull, FaWrench, FaShieldAlt, FaCheck } from 'react-icons/fa';

// Helper function to generate recommendations based on input parameters
function generateRecommendations(systemSize, billAmount, category) {
  // Panel recommendation based on system size
  let panelRecommendation = {};
  if (systemSize <= 2) {
    panelRecommendation = {
      type: 'Mono-PERC',
      brand: 'Waaree Solar / Luminous',
      power: '400W - 440W',
      description: 'High-efficiency panels suitable for limited roof space',
      efficiency: '21%',
      warranty: '25 years',
      icon: FaSolarPanel,
      badge: 'Premium'
    };
  } else if (systemSize <= 5) {
    panelRecommendation = {
      type: 'Mono-PERC / Bi-facial',
      brand: 'Tata Solar / Adani Solar',
      power: '450W - 540W',
      description: 'Great balance of cost and performance for mid-size installations',
      efficiency: '20.5%',
      warranty: '25 years',
      icon: FaSolarPanel,
      badge: 'Recommended'
    };
  } else {
    panelRecommendation = {
      type: 'Poly-crystalline / Bi-facial',
      brand: 'Vikram Solar / Renewsys',
      power: '450W - 600W',
      description: 'Cost-effective solution for larger installations',
      efficiency: '19.5%',
      warranty: '25 years',
      icon: FaSolarPanel,
      badge: 'Value'
    };
  }

  // Inverter recommendation
  let inverterRecommendation = {};
  if (category === 'residential') {
    inverterRecommendation = {
      type: 'String Inverter',
      brand: 'Growatt / Solis / Goodwe',
      description: 'Reliable and cost-effective for home use',
      features: 'Wi-Fi monitoring, High efficiency',
      warranty: '5-10 years',
      icon: FaWrench,
      badge: 'Home Use'
    };
  } else {
    inverterRecommendation = {
      type: 'String Inverter / Micro Inverters',
      brand: 'SMA / Fronius / Enphase',
      description: 'Premium inverters for commercial applications',
      features: 'Advanced monitoring, Extended warranty available',
      warranty: '10-12 years',
      icon: FaWrench,
      badge: 'Commercial'
    };
  }

  // Battery recommendation based on bill amount
  let batteryRecommendation = {};
  if (billAmount > 5000) {
    batteryRecommendation = {
      type: 'Lithium-ion Battery',
      brand: 'Luminous / Okaya / Exide',
      capacity: '5-10 kWh',
      description: 'Advanced battery storage for power backup and time-shifting',
      cycles: '3000-5000 cycles',
      warranty: '5-8 years',
      icon: FaBatteryFull,
      badge: 'Recommended'
    };
  } else {
    batteryRecommendation = {
      type: 'Optional - Grid Tie System',
      brand: 'N/A',
      description: 'Grid-tied system without battery storage for maximum ROI',
      features: 'Net metering benefits, Lower upfront costs',
      icon: FaBatteryFull,
      badge: 'Optional'
    };
  }

  // Additional services recommendations
  const additionalServices = [
    {
      title: 'Annual Maintenance Contract (AMC)',
      description: 'Recommended for all installations to maintain peak performance',
      benefits: 'Regular cleaning, preventive maintenance, performance monitoring',
      icon: FaWrench,
      badge: 'Essential'
    },
    {
      title: 'Extended Warranty',
      description: 'Additional protection for your investment',
      benefits: 'Coverage beyond standard warranty, priority support, parts replacement',
      icon: FaShieldAlt,
      badge: 'Optional'
    }
  ];

  return {
    panelRecommendation,
    inverterRecommendation,
    batteryRecommendation,
    additionalServices
  };
}

export default function PersonalizedRecommendations({ systemSize, billAmount, category = 'residential' }) {
  // Get recommendations and filter out any industrial references
  const rawRecommendations = generateRecommendations(systemSize, billAmount, category);
  
  // Clean up any industrial references in descriptions
  if (rawRecommendations.inverterRecommendation && 
      rawRecommendations.inverterRecommendation.description && 
      rawRecommendations.inverterRecommendation.description.includes('industrial')) {
    rawRecommendations.inverterRecommendation.description = 
      rawRecommendations.inverterRecommendation.description.replace(/and industrial applications/g, 'applications');
  }
  
  const recommendations = rawRecommendations;
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box p={4} bg={cardBg} rounded="md" boxShadow="sm" w="100%">
      <Text fontWeight="bold" fontSize="lg" mb={2} color="teal.500">
        Personalized Recommendations
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        Based on your system size, electricity usage, and category, we recommend:
      </Text>

      <VStack spacing={6} align="stretch">
        {/* Panel Recommendation */}
        <RecommendationCard
          title="Solar Panels"
          recommendation={recommendations.panelRecommendation}
          borderColor={borderColor}
        />

        {/* Inverter Recommendation */}
        <RecommendationCard
          title="Inverter"
          recommendation={recommendations.inverterRecommendation}
          borderColor={borderColor}
        />

        {/* Battery Recommendation */}
        <RecommendationCard
          title="Battery Storage"
          recommendation={recommendations.batteryRecommendation}
          borderColor={borderColor}
        />
        
        {/* Additional Services */}
        <Box borderWidth={1} borderColor={borderColor} p={4} rounded="md">
          <Text fontWeight="bold" fontSize="md" mb={3}>
            Additional Services
          </Text>
          <VStack spacing={3} align="stretch">
            {recommendations.additionalServices.map((service, idx) => (
              <HStack key={idx} spacing={3} align="start">
                <Icon as={service.icon} color="teal.400" mt={1} />
                <Box>
                  <HStack>
                    <Text fontWeight="bold" fontSize="sm">
                      {service.title}
                    </Text>
                    <Badge colorScheme={service.badge === 'Essential' ? 'red' : 'gray'} fontSize="xs">
                      {service.badge}
                    </Badge>
                  </HStack>
                  <Text fontSize="sm" color="gray.600">
                    {service.description}
                  </Text>
                  <Text fontSize="xs" color="gray.500">
                    <Icon as={FaCheck} color="green.400" boxSize={3} mr={1} />
                    {service.benefits}
                  </Text>
                </Box>
              </HStack>
            ))}
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
}

// Helper component for recommendation cards
function RecommendationCard({ title, recommendation, borderColor }) {
  return (
    <Box borderWidth={1} borderColor={borderColor} p={4} rounded="md">
      <HStack mb={3} justify="space-between">
        <HStack>
          <Icon as={recommendation.icon} color="teal.400" boxSize={5} />
          <Text fontWeight="bold" fontSize="md">
            {title}
          </Text>
        </HStack>
        <Badge colorScheme={
          recommendation.badge === 'Premium' ? 'purple' :
          recommendation.badge === 'Recommended' ? 'green' :
          recommendation.badge === 'Value' ? 'blue' :
          recommendation.badge === 'Optional' ? 'gray' : 'orange'
        } fontSize="xs">
          {recommendation.badge}
        </Badge>
      </HStack>
      
      <VStack spacing={2} align="stretch">
        <Text fontWeight="medium" fontSize="sm" color="teal.600">
          {recommendation.type}
        </Text>
        
        {recommendation.brand && (
          <Text fontSize="sm">
            <Text as="span" fontWeight="medium">Brand: </Text>
            {recommendation.brand}
          </Text>
        )}
        
        {recommendation.power && (
          <Text fontSize="sm">
            <Text as="span" fontWeight="medium">Power: </Text>
            {recommendation.power}
          </Text>
        )}
        
        {recommendation.capacity && (
          <Text fontSize="sm">
            <Text as="span" fontWeight="medium">Capacity: </Text>
            {recommendation.capacity}
          </Text>
        )}
        
        <Text fontSize="sm" color="gray.600">
          {recommendation.description}
        </Text>
        
        {recommendation.efficiency && (
          <Text fontSize="xs" color="gray.500">
            <Icon as={FaCheck} color="green.400" boxSize={3} mr={1} />
            Efficiency: {recommendation.efficiency}
          </Text>
        )}
        
        {recommendation.features && (
          <Text fontSize="xs" color="gray.500">
            <Icon as={FaCheck} color="green.400" boxSize={3} mr={1} />
            {recommendation.features}
          </Text>
        )}
        
        {recommendation.cycles && (
          <Text fontSize="xs" color="gray.500">
            <Icon as={FaCheck} color="green.400" boxSize={3} mr={1} />
            Lifespan: {recommendation.cycles}
          </Text>
        )}
        
        {recommendation.warranty && (
          <Text fontSize="xs" color="gray.500">
            <Icon as={FaCheck} color="green.400" boxSize={3} mr={1} />
            Warranty: {recommendation.warranty}
          </Text>
        )}
      </VStack>
    </Box>
  );
} 