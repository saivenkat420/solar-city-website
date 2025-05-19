import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  FormControl,
  FormLabel,
  HStack,
  VStack,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Tooltip,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaSun, FaBolt, FaRupeeSign, FaCalendarAlt } from 'react-icons/fa';

// Helper function to calculate the system metrics for residential systems
function calculateResidentialMetrics(billAmount, sunHours, systemSize) {
  // Constants
  const electricityRate = 6; // ₹/kWh

  // Calculate system size based on bill amount if not provided
  if (!systemSize) {
    if (billAmount <= 1000) {
      systemSize = 1.1;
    } else if (billAmount <= 2000) {
      systemSize = 2.2;
    } else if (billAmount <= 3000) {
      systemSize = 3.3;
    } else {
      // For bills above 3000, calculate based on energy usage
      const energyUsage = billAmount / electricityRate;
      const dailyUsage = energyUsage / 30;
      systemSize = dailyUsage / sunHours;
      // Round to nearest 1.1kW increment
      const incrementSize = 1.1;
      systemSize = Math.ceil(systemSize / incrementSize) * incrementSize;
    }
  }

  // Calculate daily energy production
  const dailyProduction = systemSize * sunHours; // kWh/day
  
  // Calculate monthly energy production
  const monthlyProduction = dailyProduction * 30; // kWh/month
  
  // Calculate monthly savings
  const monthlySavings = monthlyProduction * electricityRate; // ₹/month
  
  // Calculate system cost based on company policy
  // For 1.1kW = ₹75,000, 2.2kW = ₹150,000, 3.3kW = ₹225,000, etc.
  const costPerIncrement = 75000;
  const numberOfIncrements = systemSize / 1.1;
  const baseCost = numberOfIncrements * costPerIncrement;
  
  // No separate subsidy calculation needed as prices are all-inclusive
  const subsidy = 0;
  const finalCost = baseCost;
  
  // Calculate breakeven period
  const breakEvenMonths = Math.ceil(finalCost / monthlySavings);
  
  return {
    dailyProduction: Math.round(dailyProduction * 10) / 10, // Round to 1 decimal
    monthlyProduction: Math.round(monthlyProduction),
    monthlySavings: Math.round(monthlySavings),
    systemCost: finalCost,
    breakEvenMonths,
  };
}

// Helper function to calculate the system metrics for commercial systems
function calculateCommercialMetrics(billAmount, sunHours, systemSize) {
  // Constants
  const electricityRate = 6; // ₹/kWh

  // Calculate system size based on bill amount if not provided
  if (!systemSize) {
    if (billAmount <= 1000) {
      systemSize = 1.1;
    } else if (billAmount <= 2000) {
      systemSize = 2.2;
    } else if (billAmount <= 3000) {
      systemSize = 3.3;
    } else {
      // For bills above 3000, calculate based on energy usage
      const energyUsage = billAmount / electricityRate;
      const dailyUsage = energyUsage / 30;
      systemSize = dailyUsage / sunHours;
      // Round to nearest 1.1kW increment
      const incrementSize = 1.1;
      systemSize = Math.ceil(systemSize / incrementSize) * incrementSize;
    }
  }

  // Calculate daily energy production
  const dailyProduction = systemSize * sunHours; // kWh/day
  
  // Calculate monthly energy production
  const monthlyProduction = dailyProduction * 30; // kWh/month
  
  // Calculate monthly savings
  const monthlySavings = monthlyProduction * electricityRate; // ₹/month
  
  // Commercial price points as provided
  const commercialPrices = [
    { size: 3, cost: 140000 },
    { size: 5, cost: 220000 },
    { size: 6, cost: 270000 },
    { size: 10, cost: 400000 }
  ];

  // Calculate system cost based on commercial pricing with interpolation
  let baseCost;
  
  // If system size is smaller than smallest defined size
  if (systemSize <= commercialPrices[0].size) {
    const costPerKW = commercialPrices[0].cost / commercialPrices[0].size;
    baseCost = systemSize * costPerKW;
  } 
  // If system size is larger than largest defined size
  else if (systemSize >= commercialPrices[commercialPrices.length - 1].size) {
    const costPerKW = commercialPrices[commercialPrices.length - 1].cost / 
                    commercialPrices[commercialPrices.length - 1].size;
    baseCost = systemSize * costPerKW;
  } 
  // Interpolation between two defined points
  else {
    // Find the two price points to interpolate between
    let lowerPoint = commercialPrices[0];
    let upperPoint = commercialPrices[1];
    
    for (let i = 0; i < commercialPrices.length - 1; i++) {
      if (systemSize >= commercialPrices[i].size && systemSize <= commercialPrices[i + 1].size) {
        lowerPoint = commercialPrices[i];
        upperPoint = commercialPrices[i + 1];
        break;
      }
    }
    
    // Linear interpolation formula: y = y1 + (x - x1) * ((y2 - y1) / (x2 - x1))
    baseCost = lowerPoint.cost + 
              (systemSize - lowerPoint.size) * 
              ((upperPoint.cost - lowerPoint.cost) / (upperPoint.size - lowerPoint.size));
  }
  
  // No separate subsidy needed as prices are all-inclusive
  const subsidy = 0;
  const finalCost = baseCost;
  
  // Calculate breakeven period
  const breakEvenMonths = Math.ceil(finalCost / monthlySavings);
  
  return {
    dailyProduction: Math.round(dailyProduction * 10) / 10, // Round to 1 decimal
    monthlyProduction: Math.round(monthlyProduction),
    monthlySavings: Math.round(monthlySavings),
    systemCost: Math.round(finalCost),
    breakEvenMonths,
  };
}

// Unified function to calculate metrics based on category
function calculateSystemMetrics(billAmount, sunHours, systemSize, category = 'residential') {
  if (category === 'commercial') {
    return calculateCommercialMetrics(billAmount, sunHours, systemSize);
  }
  return calculateResidentialMetrics(billAmount, sunHours, systemSize);
}

export default function InteractiveSliders({ initialBillAmount, initialSystemSize, category = 'residential' }) {
  // Size increment depends on category
  const incrementSize = category === 'commercial' ? 0.1 : 1.1;
  
  // Min/max values depend on category
  const minSize = category === 'commercial' ? 1.0 : 1.1;
  const maxSize = category === 'commercial' ? 15.0 : 11.0;
  
  // Round initialSystemSize based on category
  let roundedInitialSize;
  if (category === 'commercial') {
    roundedInitialSize = initialSystemSize ? 
      Math.round(initialSystemSize * 10) / 10 : 3.0; // Default to 3.0kW for commercial
  } else {
    roundedInitialSize = initialSystemSize ? 
      Math.ceil(initialSystemSize / incrementSize) * incrementSize : 3.3; // Default to 3.3kW (3x1.1kW) for residential
  }
  
  const defaultSystemSize = roundedInitialSize;
  const defaultSunHours = 5; // Default sun hours for India
  const defaultBillAmount = initialBillAmount || 3000;
  
  const [systemSize, setSystemSize] = useState(defaultSystemSize);
  const [sunHours, setSunHours] = useState(defaultSunHours);
  const [billAmount, setBillAmount] = useState(defaultBillAmount);
  const [metrics, setMetrics] = useState(calculateSystemMetrics(billAmount, sunHours, systemSize, category));
  
  const cardBg = useColorModeValue('white', 'gray.800');

  // Handle system size change based on category
  const handleSystemSizeChange = (val) => {
    if (category === 'commercial') {
      // For commercial, round to nearest 0.1kW
      const roundedSize = Math.round(val * 10) / 10;
      setSystemSize(roundedSize);
    } else {
      // For residential, round to nearest 1.1kW increment
      const roundedSize = Math.ceil(val / incrementSize) * incrementSize;
      setSystemSize(roundedSize);
    }
  };

  // Recalculate metrics when any parameter changes
  useEffect(() => {
    setMetrics(calculateSystemMetrics(billAmount, sunHours, systemSize, category));
  }, [billAmount, sunHours, systemSize, category]);

  return (
    <Box 
      p={4} 
      bg={cardBg} 
      rounded="md" 
      boxShadow="sm" 
      w="100%"
      mt={6}
    >
      <Text fontWeight="bold" fontSize="lg" mb={3} color="orange.500">
        Interactive System Simulator
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        Adjust sliders to see how changes affect your solar system performance and savings.
      </Text>
      
      <VStack spacing={6} align="stretch">
        {/* System Size Slider */}
        <FormControl>
          <HStack justify="space-between" mb={1}>
            <FormLabel fontWeight="medium" mb={0} fontSize="sm">
              <Icon as={FaBolt} mr={1} color="orange.400" />
              System Size (kW)
            </FormLabel>
            <Text fontWeight="bold" color="orange.500">{systemSize} kW</Text>
          </HStack>
          <Slider
            min={minSize}
            max={maxSize}
            step={incrementSize}
            value={systemSize}
            onChange={handleSystemSizeChange}
            colorScheme="orange"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
          <Text fontSize="xs" color="gray.500" mt={1}>
            {category === 'commercial' 
              ? 'Commercial system sizes available in 0.1kW increments' 
              : 'System sizes available in 1.1kW increments (1.1kW, 2.2kW, 3.3kW, etc.)'}
          </Text>
        </FormControl>
        
        {/* Sun Hours Slider */}
        <FormControl>
          <HStack justify="space-between" mb={1}>
            <FormLabel fontWeight="medium" mb={0} fontSize="sm">
              <Icon as={FaSun} mr={1} color="yellow.400" />
              Peak Sun Hours
            </FormLabel>
            <Text fontWeight="bold" color="yellow.500">{sunHours} hrs/day</Text>
          </HStack>
          <Slider
            min={3}
            max={7}
            step={0.5}
            value={sunHours}
            onChange={(val) => setSunHours(val)}
            colorScheme="yellow"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
          <Text fontSize="xs" color="gray.500" mt={1}>
            Adjust based on your location. Most of India gets 4-6 peak sun hours.
          </Text>
        </FormControl>
        
        {/* Bill Amount Slider */}
        <FormControl>
          <HStack justify="space-between" mb={1}>
            <FormLabel fontWeight="medium" mb={0} fontSize="sm">
              <Icon as={FaRupeeSign} mr={1} color="green.400" />
              Monthly Bill
            </FormLabel>
            <Text fontWeight="bold" color="green.500">₹{billAmount}</Text>
          </HStack>
          <Slider
            min={1000}
            max={10000}
            step={100}
            value={billAmount}
            onChange={(val) => setBillAmount(val)}
            colorScheme="green"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb boxSize={6} />
          </Slider>
        </FormControl>
        
        {/* Results Grid */}
        <Box mt={3}>
          <Text fontWeight="bold" fontSize="md" mb={3} color="blue.500">
            Simulated Results
          </Text>
          <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Daily Production</StatLabel>
              <StatNumber fontSize="lg" color="blue.500">{metrics.dailyProduction} kWh</StatNumber>
              <StatHelpText fontSize="xs">Per day average</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Monthly Savings</StatLabel>
              <StatNumber fontSize="lg" color="green.500">₹{metrics.monthlySavings}</StatNumber>
              <StatHelpText fontSize="xs">Bill reduction</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">System Cost</StatLabel>
              <StatNumber fontSize="lg" color="orange.500">₹{metrics.systemCost.toLocaleString()}</StatNumber>
              <StatHelpText fontSize="xs">After subsidies</StatHelpText>
            </Stat>
            
            <Stat>
              <StatLabel fontSize="sm" color="gray.500">Monthly Production</StatLabel>
              <StatNumber fontSize="lg" color="blue.500">{metrics.monthlyProduction} kWh</StatNumber>
              <StatHelpText fontSize="xs">Generated power</StatHelpText>
            </Stat>
            
            <Stat gridColumn={{ md: "span 2" }}>
              <StatLabel fontSize="sm" color="gray.500">Break-Even Period</StatLabel>
              <StatNumber fontSize="lg" color="purple.500">
                <Icon as={FaCalendarAlt} mr={1} boxSize={5} />
                {Math.floor(metrics.breakEvenMonths / 12)} years, {metrics.breakEvenMonths % 12} months
              </StatNumber>
              <StatHelpText fontSize="xs">Time to recover investment</StatHelpText>
            </Stat>
          </SimpleGrid>
        </Box>
      </VStack>
    </Box>
  );
} 