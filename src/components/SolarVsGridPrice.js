import React from 'react';
import { Box, Text, useColorModeValue, Heading, Icon, Flex, useBreakpointValue } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts';
import { FaChartLine, FaLightbulb } from 'react-icons/fa';

// Helper function to calculate projected prices
function getProjectedPrices(currentBill, years = 25) {
  const data = [];
  const annualGridIncrease = 0.05; // 5% annual grid price increase
  
  // Calculate monthly grid and solar costs over time
  let gridPrice = currentBill;
  
  for (let year = 0; year <= years; year++) {
    // Grid price increases each year
    if (year > 0) {
      gridPrice = gridPrice * (1 + annualGridIncrease);
    }
    
    // Solar cost is fixed (just the system maintenance cost after break-even)
    const solarPrice = year === 0 ? currentBill : currentBill * 0.2;
    
    data.push({
      year,
      'Grid Price': Math.round(gridPrice),
      'Solar Price': Math.round(solarPrice),
    });
  }
  
  return data;
}

export default function SolarVsGridPrice({ billAmount }) {
  const data = getProjectedPrices(billAmount);
  const chartBg = useColorModeValue('white', 'gray.800');
  const highlightBg = useColorModeValue('green.50', 'green.900');
  const textColor = useColorModeValue('#4A5568', '#E2E8F0');
  
  // Responsive adjustments
  const cardHeight = useBreakpointValue({ base: 420, sm: 480, md: 540 });
  // Chart height will be 100% of the card
  const chartHeight = '100%';
  const yAxisWidth = useBreakpointValue({ base: 40, md: 55 });
  const chartMargin = useBreakpointValue({ 
    base: { top: 5, right: 20, left: 5, bottom: 5 },
    md: { top: 10, right: 30, left: 10, bottom: 10 }
  });
  
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Calculate cumulative savings over 25 years
  const totalGridCost = data.reduce((sum, item) => sum + item['Grid Price'], 0);
  const totalSolarCost = data.reduce((sum, item) => sum + item['Solar Price'], 0);
  const totalSavings = totalGridCost - totalSolarCost;
  
  return (
    <Box 
      display="flex"
      flexDirection="column"
      p={{ base: 4, md: 6 }} 
      bg={chartBg} 
      rounded="lg" 
      boxShadow="md" 
      w="100%" 
      h={`${cardHeight}px`}
      borderWidth="1px"
      borderColor={useColorModeValue('green.100', 'green.700')}
      position="relative"
      mb={6}
      overflow="hidden"
    >
      <Flex align="center" mb={3}>
        <Box
          bg="green.500"
          p={2}
          borderRadius="full"
          mr={3}
          color="white"
        >
          <Icon as={FaChartLine} />
        </Box>
        <Heading as="h3" size={{ base: "sm", md: "md" }} color="green.600">
          Solar vs. Grid Price Projection
        </Heading>
      </Flex>
      
      <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mb={1}>
        See how rising grid electricity prices increase your future savings.
      </Text>
      
      <Flex 
        bg={highlightBg} 
        p={3} 
        borderRadius="md" 
        mb={4} 
        align="center"
        justify="space-between"
      >
        <Flex align="center">
          <Icon as={FaLightbulb} color="green.500" mr={2} />
          <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="medium" color="green.700">
            Est. 25-Year Savings:
          </Text>
        </Flex>
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color="green.600">
          ₹{Math.round(totalSavings).toLocaleString()}
        </Text>
      </Flex>
      
      <Box position="relative" flex="1 1 0%" minHeight={0} overflow="visible" p={0} m={0}>
        {/* Y-axis label - positioned outside the ResponsiveContainer for better visibility */}
        <Text 
          position="absolute"
          transform="rotate(-90deg)"
          transformOrigin="left top"
          left={0}
          top="50%"
          fontSize={{ base: "10px", md: "12px" }}
          fontWeight="medium"
          color={textColor}
          textAlign="center"
          zIndex={1}
          display={{ base: 'none', sm: 'block' }}
        >
          Monthly Bill (₹)
        </Text>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={chartMargin}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis 
              dataKey="year" 
              label={{ 
                value: isMobile ? 'Yrs' : 'Years from Installation', 
                position: 'insideBottom', 
                offset: -8,
                fill: textColor,
                fontSize: isMobile ? 10 : 12
              }} 
              tick={{ 
                fontSize: isMobile ? 10 : 12,
                fill: textColor
              }}
            />
            <YAxis 
              tickFormatter={v => `₹${Math.round(v).toLocaleString()}`}
              width={yAxisWidth}
              tick={{ 
                fontSize: useBreakpointValue({ base: 10, md: 12 }),
                fill: textColor
              }}
              tickCount={5}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip 
              formatter={(value) => `₹${Math.round(value).toLocaleString()}`}
              labelFormatter={l => `Year ${l}`}
              contentStyle={{ 
                borderRadius: '8px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                fontSize: '13px'
              }}
            />
            {!isMobile && (
              <Legend 
                verticalAlign="top" 
                iconType="circle"
                wrapperStyle={{ paddingBottom: '10px', fontSize: 13 }}
              />
            )}
            <ReferenceLine 
              y={billAmount} 
              stroke="gray" 
              strokeDasharray="3 3" 
              label={{ 
                value: "Current Bill", 
                position: 'right', 
                fill: 'gray',
                fontSize: useBreakpointValue({ base: 10, md: 12 })
              }}
            />
            <Line 
              type="monotone" 
              dataKey="Grid Price" 
              stroke="#E53E3E" 
              strokeWidth={3} 
              activeDot={{ r: 8 }}
              dot={false}
              name="Traditional Grid Price"
            />
            <Line 
              type="monotone" 
              dataKey="Solar Price" 
              stroke="#38A169" 
              strokeWidth={3} 
              activeDot={{ r: 8 }}
              dot={false}
              name="Your Solar Price"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      
      {/* Mobile hint */}
      <Text 
        fontSize="xs" 
        color="gray.500" 
        textAlign="center" 
        mt={2} 
        display={{ base: 'block', md: 'none' }}
      >
        Scroll horizontally to see more details
      </Text>
    </Box>
  );
} 