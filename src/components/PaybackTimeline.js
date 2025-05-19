import React from 'react';
import { Box, Text, Flex, Circle, Divider, VStack, HStack, useColorModeValue, Icon, Badge } from '@chakra-ui/react';
import { FaSolarPanel, FaMoneyBillWave, FaBalanceScale, FaChartLine, FaLeaf, FaCheckCircle } from 'react-icons/fa';

function getTimelineData(breakEvenMonths) {
  // Format break-even period as years and months
  const breakEvenYears = Math.floor(breakEvenMonths / 12);
  const remainingMonths = breakEvenMonths % 12;
  const breakEvenText = remainingMonths === 0 
    ? `${breakEvenYears} Years` 
    : `${breakEvenYears} Years, ${remainingMonths} Months`;
  
  return [
    {
      title: 'Installation',
      description: 'Solar system installed and commissioned',
      icon: FaSolarPanel,
      timeframe: 'Day 1',
      color: 'blue.400'
    },
    {
      title: 'Energy Savings Begin',
      description: 'Start saving on your electricity bills',
      icon: FaMoneyBillWave,
      timeframe: 'Month 1',
      color: 'green.400'
    },
    {
      title: 'Break-Even Point',
      description: 'System pays for itself completely',
      icon: FaBalanceScale,
      timeframe: breakEvenText,
      color: 'orange.400',
      highlight: true
    },
    {
      title: 'Pure Profit Period',
      description: 'Enjoy years of free electricity',
      icon: FaChartLine,
      timeframe: `Years ${Math.ceil(breakEvenMonths/12)}-25`,
      color: 'purple.400'
    },
    {
      title: 'Environmental Impact',
      description: 'Lifetime CO₂ reduction and clean energy',
      icon: FaLeaf,
      timeframe: '25+ Years',
      color: 'teal.400'
    }
  ];
}

export default function PaybackTimeline({ breakEvenMonths }) {
  const timelineData = getTimelineData(breakEvenMonths);
  const cardBg = useColorModeValue('white', 'gray.800');
  const highlightBg = useColorModeValue('orange.50', 'orange.900');

  return (
    <Box p={{ base: 4, md: 6 }} bg={cardBg} rounded="md" boxShadow="sm" w="100%">
      <Text fontWeight="bold" fontSize={{ base: "lg", md: "xl" }} mb={2} color="purple.500">
        Your Solar Payback Timeline
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        Track your journey from installation to break-even and beyond.
      </Text>
      
      <VStack spacing={0} align="stretch">
        {timelineData.map((item, index) => (
          <Flex 
            key={index} 
            mb={index === timelineData.length - 1 ? 0 : 4}
            bg={item.highlight ? highlightBg : 'transparent'}
            p={item.highlight ? 4 : 0}
            borderRadius={item.highlight ? "md" : "none"}
            position="relative"
          >
            {item.highlight && (
              <Badge 
                position="absolute" 
                top={0} 
                right={3} 
                colorScheme="orange" 
                transform="translateY(-50%)"
                px={3}
                py={1}
                fontSize="sm"
                fontWeight="bold"
                boxShadow="sm"
              >
                <Icon as={FaCheckCircle} mr={1} />
                KEY MILESTONE
              </Badge>
            )}
            
            <VStack spacing={0} align="center" mr={4}>
              <Circle 
                size={{ base: "40px", md: "50px" }} 
                bg={item.color} 
                color="white"
                boxShadow={item.highlight ? "0 0 20px rgba(237, 137, 54, 0.4)" : "none"}
                border={item.highlight ? "2px solid" : "none"}
                borderColor="orange.300"
              >
                <Box as={item.icon} size={{ base: "20px", md: "24px" }} />
              </Circle>
              {index < timelineData.length - 1 && (
                <Divider 
                  orientation="vertical" 
                  h={{ base: "40px", md: "50px" }} 
                  borderLeftWidth="2px" 
                  borderColor={item.highlight ? "orange.300" : "gray.200"}
                  borderStyle={item.highlight ? "dashed" : "solid"}
                />
              )}
            </VStack>
            
            <Box mt={-1} flex="1">
              <HStack mb={1} flexWrap="wrap">
                <Text 
                  fontWeight="bold" 
                  fontSize={{ base: "md", md: "lg" }} 
                  color={item.color}
                >
                  {item.title}
                </Text>
                <Text 
                  fontSize={{ base: "sm", md: "md" }} 
                  color="gray.500" 
                  fontWeight={item.highlight ? "bold" : "medium"}
                  bg={item.highlight ? "white" : "transparent"}
                  px={item.highlight ? 2 : 0}
                  py={item.highlight ? 1 : 0}
                  borderRadius={item.highlight ? "md" : "none"}
                  boxShadow={item.highlight ? "sm" : "none"}
                >
                  {item.timeframe}
                </Text>
              </HStack>
              <Text 
                fontSize={{ base: "sm", md: "md" }} 
                color={item.highlight ? "orange.800" : "gray.600"}
                fontWeight={item.highlight ? "medium" : "normal"}
              >
                {item.description}
              </Text>
              
              {item.highlight && (
                <Text fontSize="xs" color="orange.600" mt={1}>
                  After this point, your system generates pure profit.
                </Text>
              )}
            </Box>
          </Flex>
        ))}
      </VStack>
    </Box>
  );
} 