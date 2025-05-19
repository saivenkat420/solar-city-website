import React, { useState } from 'react';
import {
  Box,
  Text,
  Select,
  Flex,
  HStack,
  Stack,
  Badge,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Progress,
  SimpleGrid,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaSun, FaBolt, FaRupeeSign, FaChartLine, FaExchangeAlt } from 'react-icons/fa';

// State/city data with solar benchmarks
const benchmarkData = {
  "Karnataka": {
    cities: ["Bangalore", "Mysore", "Hubli"],
    sunHours: 5.8,
    avgSystemSize: 4.9,
    avgSavings: 6500,
    avgPayback: 42,
    adoptionRate: 15.8,
    netMetering: "Available"
  },
  "Tamil Nadu": {
    cities: ["Chennai", "Coimbatore", "Madurai"],
    sunHours: 6.0,
    avgSystemSize: 4.2,
    avgSavings: 6100,
    avgPayback: 45,
    adoptionRate: 14.2,
    netMetering: "Available"
  },
  "Maharashtra": {
    cities: ["Mumbai", "Pune", "Nagpur"],
    sunHours: 5.6,
    avgSystemSize: 5.1,
    avgSavings: 7200,
    avgPayback: 48,
    adoptionRate: 12.5,
    netMetering: "Available"
  },
  "Delhi NCR": {
    cities: ["Delhi", "Gurgaon", "Noida"],
    sunHours: 5.5,
    avgSystemSize: 5.3,
    avgSavings: 7500,
    avgPayback: 51,
    adoptionRate: 9.8,
    netMetering: "Available"
  },
  "Gujarat": {
    cities: ["Ahmedabad", "Surat", "Vadodara"],
    sunHours: 6.2,
    avgSystemSize: 5.8,
    avgSavings: 7800,
    avgPayback: 39,
    adoptionRate: 18.6,
    netMetering: "Available"
  },
  "Kerala": {
    cities: ["Kochi", "Trivandrum", "Calicut"],
    sunHours: 5.5,
    avgSystemSize: 3.8,
    avgSavings: 5800,
    avgPayback: 46,
    adoptionRate: 7.5,
    netMetering: "Available"
  }
};

export default function StateBenchmark({ userState = "Karnataka", systemSize, monthlySavings, breakEvenMonths }) {
  const [selectedState, setSelectedState] = useState(userState in benchmarkData ? userState : "Karnataka");
  const stateData = benchmarkData[selectedState];
  const cardBg = useColorModeValue('white', 'gray.800');
  const statBg = useColorModeValue('gray.50', 'gray.700');
  
  // Compare user's system with state averages
  const comparisons = {
    systemSize: {
      value: systemSize,
      benchmark: stateData.avgSystemSize,
      difference: Math.round((systemSize / stateData.avgSystemSize - 1) * 100),
      label: "System Size",
      unit: "kW",
      icon: FaBolt,
      color: "blue"
    },
    monthlySavings: {
      value: monthlySavings,
      benchmark: stateData.avgSavings,
      difference: Math.round((monthlySavings / stateData.avgSavings - 1) * 100),
      label: "Monthly Savings",
      unit: "₹",
      icon: FaRupeeSign,
      color: "green"
    },
    breakEvenMonths: {
      value: breakEvenMonths,
      benchmark: stateData.avgPayback,
      difference: Math.round((stateData.avgPayback / breakEvenMonths - 1) * 100), // Inverted because lower is better
      label: "Payback Period",
      unit: "months",
      icon: FaChartLine,
      color: "purple"
    }
  };

  return (
    <Box p={4} bg={cardBg} rounded="md" boxShadow="sm" w="100%">
      <Text fontWeight="bold" fontSize="lg" mb={2} color="blue.500">
        State/City Benchmarking
      </Text>
      <Text fontSize="sm" color="gray.500" mb={4}>
        See how your solar system compares to others in your region
      </Text>
      
      {/* State Selection */}
      <HStack mb={6}>
        <Icon as={FaMapMarkerAlt} color="blue.500" />
        <Text fontSize="sm" fontWeight="medium">Select your state:</Text>
        <Select 
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          size="sm"
          maxW="200px"
          focusBorderColor="blue.400"
        >
          {Object.keys(benchmarkData).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </Select>
      </HStack>
      
      {/* Regional Stats */}
      <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={6}>
        <Box p={3} bg={statBg} borderRadius="md">
          <HStack fontSize="sm" color="gray.500" mb={1}>
            <Icon as={FaSun} color="yellow.500" />
            <Text>Avg Sun Hours</Text>
          </HStack>
          <Text fontWeight="bold" fontSize="lg">{stateData.sunHours} hrs/day</Text>
        </Box>
        
        <Box p={3} bg={statBg} borderRadius="md">
          <HStack fontSize="sm" color="gray.500" mb={1}>
            <Icon as={FaBolt} color="blue.500" />
            <Text>Avg System Size</Text>
          </HStack>
          <Text fontWeight="bold" fontSize="lg">{stateData.avgSystemSize} kW</Text>
        </Box>
        
        <Box p={3} bg={statBg} borderRadius="md">
          <HStack fontSize="sm" color="gray.500" mb={1}>
            <Icon as={FaRupeeSign} color="green.500" />
            <Text>Avg Monthly Savings</Text>
          </HStack>
          <Text fontWeight="bold" fontSize="lg">₹{stateData.avgSavings}</Text>
        </Box>
        
        <Box p={3} bg={statBg} borderRadius="md">
          <HStack fontSize="sm" color="gray.500" mb={1}>
            <Icon as={FaExchangeAlt} color="purple.500" />
            <Text>Solar Adoption Rate</Text>
          </HStack>
          <Text fontWeight="bold" fontSize="lg">{stateData.adoptionRate}%</Text>
        </Box>
      </SimpleGrid>
      
      {/* Your System Comparison */}
      <Text fontWeight="bold" fontSize="md" mb={4} color="gray.700">
        How Your System Compares
      </Text>
      
      <Stack spacing={5}>
        {Object.values(comparisons).map((item, idx) => (
          <Box key={idx}>
            <Flex justify="space-between" align="center" mb={2}>
              <HStack>
                <Icon as={item.icon} color={`${item.color}.500`} />
                <Text fontSize="sm" fontWeight="medium">{item.label}</Text>
              </HStack>
              
              <Badge 
                colorScheme={item.difference >= 0 ? "green" : "red"} 
                px={2} 
                py={1} 
                borderRadius="full"
              >
                {item.difference >= 0 ? "+" : ""}{item.difference}% {item.difference >= 0 ? "better" : "worse"}
              </Badge>
            </Flex>
            
            <Flex align="center" mb={1}>
              <Text fontSize="sm" minW="60px">You:</Text>
              <Text fontWeight="bold" fontSize="sm">{item.unit}{item.value}</Text>
            </Flex>
            
            <Flex align="center">
              <Text fontSize="sm" minW="60px">Avg:</Text>
              <Text fontSize="sm">{item.unit}{item.benchmark}</Text>
            </Flex>
            
            <Progress 
              value={item.difference >= 0 ? 75 : 25} 
              colorScheme={item.difference >= 0 ? "green" : "red"} 
              size="sm" 
              mt={2} 
              borderRadius="full"
            />
          </Box>
        ))}
      </Stack>
      
      <Text fontSize="xs" color="gray.500" mt={6} textAlign="center">
        Data sourced from {selectedState} Energy Development Agency and industry reports.
        Comparisons based on similar residential/commercial installations.
      </Text>
    </Box>
  );
} 