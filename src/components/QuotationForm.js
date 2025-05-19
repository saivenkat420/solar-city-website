import React, { useMemo, useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Button,
  Progress,
  Tooltip,
  Icon,
  useBreakpointValue,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Input,
  FormControl,
  FormLabel,
  Flex,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaBolt, FaRulerCombined, FaMoneyBillWave, FaPiggyBank, FaClock } from 'react-icons/fa';
import PropTypes from 'prop-types';

// Calculation logic for residential customers
export function calculateResidentialQuote(billAmount, overrideSystemSize = null) {
  // Constants
  const electricityRate = 6; // ₹/kWh
  const avgSunHours = 5;
  const spacePerKW = 60; // sq ft
  const roiPeriod = 48; // months

  // Calculate system size based on bill amount
  let systemSize;
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
    systemSize = dailyUsage / avgSunHours;
    // Round to nearest 1.1kW increment
    const incrementSize = 1.1;
    systemSize = Math.ceil(systemSize / incrementSize) * incrementSize;
  }

  // Override system size if provided
  if (overrideSystemSize !== null) {
    systemSize = overrideSystemSize;
  }
  
  // 3. Space Required
  let spaceRequired = Math.ceil(systemSize * spacePerKW);
  
  // 4. Cost calculation based on company policy
  // For 1.1kW = ₹75,000, 2.2kW = ₹150,000, 3.3kW = ₹225,000, etc.
  const costPerIncrement = 75000;
  const numberOfIncrements = systemSize / 1.1;
  const baseCost = numberOfIncrements * costPerIncrement;
  
  // No separate subsidy calculation needed as prices are all-inclusive
  const subsidy = 0;
  const finalCost = baseCost;

  // 5. ROI per Month
  const monthlySavings = billAmount;
  const breakEvenMonths = Math.ceil(finalCost / monthlySavings);
  const roiPerMonth = finalCost / roiPeriod;
  // 6. Parking spaces
  const parkingSpaces = Math.max(1, Math.round(spaceRequired / 80));

  // Output formatting
  return {
    systemSize: Number(systemSize.toFixed(2)),
    spaceRequired,
    estimatedCost: finalCost,
    monthlySavings: Number(monthlySavings.toFixed(2)),
    breakEvenMonths,
    roiPerMonth: Number(roiPerMonth.toFixed(2)),
    baseCost: Math.round(baseCost),
    subsidy: Math.round(subsidy),
    parkingSpaces,
  };
}

// Calculation logic for commercial customers
export function calculateCommercialQuote(billAmount, overrideSystemSize = null) {
  // Constants
  const electricityRate = 6; // ₹/kWh
  const avgSunHours = 5;
  const spacePerKW = 60; // sq ft
  const roiPeriod = 48; // months

  // Calculate system size based on bill amount (same as residential)
  let systemSize;
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
    systemSize = dailyUsage / avgSunHours;
    // Round to nearest 1.1kW increment
    const incrementSize = 1.1;
    systemSize = Math.ceil(systemSize / incrementSize) * incrementSize;
  }

  // Override system size if provided
  if (overrideSystemSize !== null) {
    systemSize = overrideSystemSize;
  }
  
  // 3. Space Required
  let spaceRequired = Math.ceil(systemSize * spacePerKW);
  
  // 4. Cost calculation based on commercial pricing
  // Commercial price points as provided
  const commercialPrices = [
    { size: 3, cost: 140000 },
    { size: 5, cost: 220000 },
    { size: 6, cost: 270000 },
    { size: 10, cost: 400000 }
  ];

  // Calculate cost using interpolation
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
  
  // No separate subsidy for commercial
  const subsidy = 0;
  const finalCost = baseCost;

  // 5. ROI per Month
  const monthlySavings = billAmount;
  const breakEvenMonths = Math.ceil(finalCost / monthlySavings);
  const roiPerMonth = finalCost / roiPeriod;
  // 6. Parking spaces
  const parkingSpaces = Math.max(1, Math.round(spaceRequired / 80));

  // Output formatting
  return {
    systemSize: Number(systemSize.toFixed(2)),
    spaceRequired,
    estimatedCost: Math.round(finalCost),
    monthlySavings: Number(monthlySavings.toFixed(2)),
    breakEvenMonths,
    roiPerMonth: Number(roiPerMonth.toFixed(2)),
    baseCost: Math.round(baseCost),
    subsidy: Math.round(subsidy),
    parkingSpaces,
  };
}

// Unified calculation function that uses the right method based on category
export function calculateQuote(billAmount, overrideSystemSize = null, category = 'residential') {
  if (category === 'commercial') {
    return calculateCommercialQuote(billAmount, overrideSystemSize);
  }
  return calculateResidentialQuote(billAmount, overrideSystemSize);
}

const metricIcons = {
  systemSize: FaBolt,
  spaceRequired: FaRulerCombined,
  estimatedCost: FaMoneyBillWave,
  monthlySavings: FaPiggyBank,
  breakEvenMonths: FaClock,
};

const metricLabels = {
  systemSize: 'System Size',
  spaceRequired: 'Space Required',
  estimatedCost: 'Estimated Cost',
  monthlySavings: 'Monthly Savings',
  breakEvenMonths: 'Break-Even Period',
};

export default function QuotationForm({ billAmount, category = 'residential' }) {
  const initialQuote = useMemo(() => calculateQuote(billAmount, null, category), [billAmount, category]);
  const [systemSize, setSystemSize] = useState(initialQuote.systemSize);
  const [inputValue, setInputValue] = useState(initialQuote.systemSize);
  const quote = useMemo(() => calculateQuote(billAmount, systemSize, category), [billAmount, systemSize, category]);
  const progressValue = Math.min(100, (48 / quote.breakEvenMonths) * 100);
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Size increment depends on category
  const incrementSize = category === 'commercial' ? 0.1 : 1.1;
  
  // Min/max values depend on category
  const minSize = category === 'commercial' ? 1.0 : 1.1;
  const maxSize = category === 'commercial' ? 15.0 : 11.0;

  // Keep slider/input in sync
  useEffect(() => {
    setSystemSize(initialQuote.systemSize);
    setInputValue(initialQuote.systemSize);
    // eslint-disable-next-line
  }, [billAmount, category]);

  const handleSliderChange = (val) => {
    if (category === 'commercial') {
      // For commercial, round to nearest 0.1kW
      const roundedVal = Math.round(val * 10) / 10;
      setSystemSize(Number(roundedVal.toFixed(1)));
      setInputValue(Number(roundedVal.toFixed(1)));
    } else {
      // For residential, round to nearest 1.1kW increment
      const roundedVal = Math.ceil(val / incrementSize) * incrementSize;
      setSystemSize(Number(roundedVal.toFixed(2)));
      setInputValue(Number(roundedVal.toFixed(2)));
    }
  };
  
  const handleInputChange = (e) => {
    let val = parseFloat(e.target.value);
    if (isNaN(val)) val = minSize;
    if (val < minSize) val = minSize;
    if (val > maxSize) val = maxSize;
    
    if (category === 'commercial') {
      // For commercial, round to nearest 0.1kW
      setSystemSize(Number((Math.round(val * 10) / 10).toFixed(1)));
      setInputValue(val); // Keep the input value as entered for better UX
    } else {
      // For residential, round to nearest 1.1kW increment
      setSystemSize(Number((Math.ceil(val / incrementSize) * incrementSize).toFixed(2)));
      setInputValue(val); // Keep the input value as entered for better UX
    }
  };

  const handleInputBlur = () => {
    if (category === 'commercial') {
      // For commercial, round to nearest 0.1kW
      const roundedVal = Math.round(inputValue * 10) / 10;
      setSystemSize(Number(roundedVal.toFixed(1)));
      setInputValue(Number(roundedVal.toFixed(1)));
    } else {
      // For residential, round to nearest 1.1kW increment
      const roundedVal = Math.ceil(inputValue / incrementSize) * incrementSize;
      setSystemSize(Number(roundedVal.toFixed(2)));
      setInputValue(Number(roundedVal.toFixed(2)));
    }
  };

  return (
    <Box
      border="1px"
      borderColor="gray.200"
      rounded="md"
      p={4}
      bg="white"
      boxShadow="md"
      w="100%"
      maxW="520px"
      mx="auto"
      mt={4}
    >
      <VStack spacing={6} align="stretch">
        {/* System Size Slider/Input */}
        <Box>
          <FormControl>
            <FormLabel fontWeight="bold" color="orange.500" fontSize="md">
              Adjust System Size (kW)
            </FormLabel>
            <Flex align="center" gap={4}>
              <Slider
                min={minSize}
                max={maxSize}
                step={incrementSize}
                value={systemSize}
                onChange={handleSliderChange}
                flex={1}
                colorScheme="orange"
                aria-label="System Size Slider"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb boxSize={6} />
              </Slider>
              <Input
                type="number"
                min={minSize}
                max={maxSize}
                step={incrementSize}
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                width="80px"
                ml={2}
                fontWeight="bold"
                color="orange.600"
                textAlign="center"
                aria-label="System Size Input"
              />
            </Flex>
            <Text fontSize="sm" color="gray.500" mt={1}>
              {category === 'commercial' 
                ? 'Commercial system sizes available in 0.1kW increments' 
                : 'System sizes are available in 1.1kW increments (1.1kW, 2.2kW, 3.3kW, etc.)'}
            </Text>
          </FormControl>
        </Box>
        <Text fontSize="lg" fontWeight="bold" mb={2}>
          Your Solar Estimate
        </Text>
        {/* Metrics */}
        <VStack spacing={3} align="stretch">
          <HStack spacing={3}>
            <Icon as={FaBolt} color="gray.500" boxSize={4} aria-label="System Size" />
            <Text>
              <b>System Size:</b> {quote.systemSize} kW
            </Text>
          </HStack>
          <HStack spacing={3}>
            <Icon as={FaRulerCombined} color="gray.500" boxSize={4} aria-label="Space Required" />
            <Text>
              <b>Space Required:</b> {quote.spaceRequired} sq ft
            </Text>
          </HStack>
          <HStack spacing={3}>
            <Tooltip
              label={`Total Cost: ₹${quote.estimatedCost.toLocaleString()} (based on ${quote.systemSize}kW system)`}
              placement="top"
              hasArrow
              bg="gray.700"
              color="white"
              aria-label="Cost breakdown"
            >
              <HStack>
                <Icon as={FaMoneyBillWave} color="gray.500" boxSize={4} aria-label="Estimated Cost" />
                <Text>
                  <b>Estimated Cost:</b> ₹{quote.estimatedCost.toLocaleString()}
                </Text>
              </HStack>
            </Tooltip>
          </HStack>
          <Box bg="green.50" p={2} rounded="md" display="flex" flexDirection="column">
            <HStack spacing={3}>
              <Icon as={FaPiggyBank} color="green.500" boxSize={4} aria-label="Monthly Savings" />
              <Text>
                <b>Monthly Savings:</b> ₹{quote.monthlySavings.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </Text>
            </HStack>
            <Text fontSize="xs" color="green.600" mt={1}>
              You could save this much every month!
            </Text>
          </Box>
          <HStack spacing={3}>
            <Icon as={FaClock} color="gray.500" boxSize={4} aria-label="Break-Even Period" />
            <Text>
              <b>Break-Even Period:</b> {quote.breakEvenMonths} months
            </Text>
          </HStack>
        </VStack>
        {/* Progress Bar */}
        <Box mt={2}>
          <Text fontSize="sm" color="gray.600" mb={1}>
            Break-Even Progress
          </Text>
          <Progress
            value={progressValue}
            colorScheme="green"
            size="sm"
            aria-label="Break-Even Progress"
            rounded="md"
          />
        </Box>
        {/* Space Visualization */}
        <Text fontSize="sm" color="gray.500" mt={0}>
          This is equivalent to {quote.parkingSpaces} parking space{quote.parkingSpaces > 1 ? 's' : ''} (1 space ≈ 80 sq ft).
        </Text>
        {/* Disclaimer */}
        <Text fontSize="sm" color="gray.500" mt={0}>
          Final costs depend on site assessment.
        </Text>
        <Text fontSize="sm" color="gray.500" mt={0}>
          Service charges are not included in the estimated cost.
        </Text>
        {/* CTA Button */}
        <Button
          as={Link}
          href="/contact"
          bg="green.500"
          color="white"
          _hover={{ bg: 'green.600' }}
          mt={2}
          w="100%"
        >
          Get a Detailed Quote
        </Button>
      </VStack>
    </Box>
  );
}

QuotationForm.propTypes = {
  billAmount: PropTypes.number.isRequired,
  category: PropTypes.string,
}; 