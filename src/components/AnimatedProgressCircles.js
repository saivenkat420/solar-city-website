import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Text, 
  SimpleGrid, 
  CircularProgress, 
  CircularProgressLabel, 
  Flex, 
  useColorModeValue, 
  VStack, 
  Icon, 
  Divider, 
  Heading,
  HStack,
  useBreakpointValue
} from '@chakra-ui/react';
import { FaChartLine, FaLeaf, FaMoneyBillWave, FaArrowUp, FaArrowDown, FaSun } from 'react-icons/fa';

const calculateProgress = (breakEvenMonths) => {
  // Calculate break-even percentage based on 48 months (4 years) as standard payback
  const breakEvenProgress = Math.min(100, (48 / breakEvenMonths) * 100);
  return Math.round(breakEvenProgress);
};

export default function AnimatedProgressCircles({ systemSize, breakEvenMonths, estimatedCost }) {
  const [progressValues, setProgressValues] = useState({
    breakEven: 0,
    co2Offset: 0,
    savings: 0,
  });
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const highlightBg = useColorModeValue('purple.50', 'purple.900');
  const dividerColor = useColorModeValue('gray.200', 'gray.600');
  
  // Make circles smaller on mobile screens
  const circleSize = useBreakpointValue({ base: '110px', md: '130px', lg: '140px' });
  const iconSize = useBreakpointValue({ base: 4, md: 5, lg: 6 });
  const textSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'xl' });

  // Animate progressions on mount
  useEffect(() => {
    const targetValues = {
      breakEven: calculateProgress(breakEvenMonths),
      co2Offset: 80, // Fixed value for demonstration
      savings: 90, // Fixed value for demonstration
    };

    const animationDuration = 1500; // Animation duration in milliseconds
    const increment = 5; // Progress increment per frame
    const frameDuration = 30; // Frame duration in milliseconds

    let startTime = null;
    let currentValues = { ...progressValues };

    const animateProgress = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / animationDuration);

      if (progress < 1) {
        // Update each value based on animation progress
        currentValues = {
          breakEven: Math.round(progress * targetValues.breakEven),
          co2Offset: Math.round(progress * targetValues.co2Offset),
          savings: Math.round(progress * targetValues.savings),
        };

        setProgressValues(currentValues);
        requestAnimationFrame(animateProgress);
      } else {
        // Ensure final values are set exactly
        setProgressValues(targetValues);
      }
    };

    requestAnimationFrame(animateProgress);

    // Cleanup
    return () => {
      startTime = null;
    };
  }, [breakEvenMonths]);

  // Calculate estimated CO2 offset and financial savings
  const co2OffsetPerYear = Math.round(systemSize * 1200); // kg/year
  const financialSavings = Math.round(estimatedCost * 3.5); // 350% return over 25 years

  return (
    <Box 
      p={{ base: 4, md: 6 }} 
      bg={cardBg} 
      rounded="lg" 
      boxShadow="md" 
      w="100%"
      borderWidth="1px"
      borderColor={useColorModeValue('purple.100', 'purple.700')}
      overflow="hidden"
      position="relative"
    >
      <Box 
        position="absolute" 
        top="-20px" 
        right="-20px" 
        width="140px" 
        height="140px" 
        bg="purple.100" 
        opacity="0.2" 
        borderRadius="full" 
      />
      
      <Flex align="center" mb={4}>
        <Box
          bg="purple.500"
          p={2}
          borderRadius="full"
          mr={3}
          color="white"
        >
          <Icon as={FaChartLine} />
        </Box>
        <Heading as="h3" size="md" color="purple.600">
          Key Metrics At a Glance
        </Heading>
      </Flex>
      
      <Text fontSize="md" color="gray.600" mb={6}>
        Track the most important performance indicators for your solar investment.
      </Text>
      
      {/* On mobile, stack the metrics vertically; on tablet and up, use a grid */}
      <SimpleGrid 
        columns={{ base: 1, sm: 3 }} 
        spacing={{ base: 6, sm: 4 }} 
        bg={highlightBg} 
        p={4} 
        borderRadius="lg"
        boxShadow="sm"
      >
        <MetricCard 
          icon={FaMoneyBillWave}
          iconColor="orange.400"
          progress={progressValues.breakEven} 
          label="ROI Efficiency" 
          color="orange.400"
          subLabel={`${breakEvenMonths} months to break-even`}
          indicatorIcon={FaArrowDown}
          indicatorText="Faster is better"
          circleSize={circleSize}
          iconSize={iconSize}
          textSize={textSize}
        />
        
        <Box position="relative">
          <Divider 
            orientation="vertical" 
            position="absolute" 
            left="-3" 
            height="100%" 
            borderColor={dividerColor} 
            display={{ base: 'none', sm: 'block' }} 
          />
          <Divider 
            orientation="horizontal" 
            width="50%" 
            mx="auto" 
            my={4} 
            borderColor={dividerColor} 
            display={{ base: 'block', sm: 'none' }} 
          />
          <MetricCard 
            icon={FaLeaf}
            iconColor="green.400"
            progress={progressValues.co2Offset} 
            label="CO₂ Reduction" 
            color="green.400"
            subLabel={`${co2OffsetPerYear.toLocaleString()} kg/year`}
            indicatorIcon={FaArrowUp}
            indicatorText="Higher is better"
            circleSize={circleSize}
            iconSize={iconSize}
            textSize={textSize}
          />
          <Divider 
            orientation="vertical" 
            position="absolute" 
            right="-3" 
            height="100%" 
            borderColor={dividerColor} 
            display={{ base: 'none', sm: 'block' }} 
          />
          <Divider 
            orientation="horizontal" 
            width="50%" 
            mx="auto" 
            my={4} 
            borderColor={dividerColor} 
            display={{ base: 'block', sm: 'none' }} 
          />
        </Box>
        
        <MetricCard 
          icon={FaSun}
          iconColor="blue.400"
          progress={progressValues.savings} 
          label="Lifetime Savings" 
          color="blue.400"
          subLabel={`₹${financialSavings.toLocaleString()}`}
          indicatorIcon={FaArrowUp}
          indicatorText="Higher is better"
          circleSize={circleSize}
          iconSize={iconSize}
          textSize={textSize}
        />
      </SimpleGrid>
      
      {/* Mobile hint */}
      <Text 
        fontSize="xs" 
        color="gray.500" 
        textAlign="center" 
        mt={3} 
        display={{ base: 'block', sm: 'none' }}
      >
        Scroll to see all metrics
      </Text>
    </Box>
  );
}

// Helper component for individual metric cards
function MetricCard({ 
  progress, 
  label, 
  subLabel, 
  color, 
  icon, 
  iconColor, 
  indicatorIcon, 
  indicatorText,
  circleSize,
  iconSize,
  textSize
}) {
  return (
    <VStack spacing={2} align="center" width="100%">
      <Box position="relative">
        <CircularProgress 
          value={progress} 
          size={circleSize}
          thickness="10px" 
          color={color}
          trackColor={`${color}30`}
          capIsRound
        >
          <CircularProgressLabel>
            <VStack spacing={0}>
              <Text fontWeight="bold" fontSize={textSize} color={color}>
                {progress}%
              </Text>
              <Icon as={icon} color={iconColor} boxSize={iconSize} />
            </VStack>
          </CircularProgressLabel>
        </CircularProgress>
        
        <Flex 
          position="absolute" 
          bottom="0" 
          right="0" 
          bg="white" 
          borderRadius="full" 
          p={1}
          boxShadow="md"
          align="center"
          justify="center"
        >
          <Icon as={indicatorIcon} color={color} boxSize={4} />
        </Flex>
      </Box>
      
      <Text 
        fontWeight="bold" 
        fontSize={{ base: "md", md: "lg" }} 
        color={color} 
        textAlign="center"
        mt={2}
      >
        {label}
      </Text>
      
      <Text 
        fontSize={{ base: "xs", md: "sm" }} 
        color="gray.600" 
        textAlign="center"
      >
        {subLabel}
      </Text>
      
      <Flex 
        align="center" 
        bg={`${color}20`} 
        px={2} 
        py={1} 
        borderRadius="full"
        mt={1}
      >
        <Icon as={indicatorIcon} color={color} boxSize={3} mr={1} />
        <Text fontSize="xs" color={color} fontWeight="medium">
          {indicatorText}
        </Text>
      </Flex>
    </VStack>
  );
} 