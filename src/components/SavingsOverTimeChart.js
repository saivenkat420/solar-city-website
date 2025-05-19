import React, { useMemo } from 'react';
import { Box, Text, useColorModeValue, HStack, VStack, Flex, Badge, Icon } from '@chakra-ui/react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine, Area, AreaChart, CartesianGrid } from 'recharts';
import { FaMoneyBillWave, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';

function getSavingsData(billAmount, systemSize, breakEvenMonths, estimatedCost) {
  // Simulate up to 25 years (300 months)
  const months = 300;
  const yearData = [];
  let cumulative = 0;
  let yearlySum = 0;
  
  // Monthly savings is just the bill amount in our model
  const monthlySavings = billAmount;
  
  // Calculate savings by month first
  const monthlyData = [];
  for (let i = 1; i <= months; i++) {
    cumulative += monthlySavings;
    yearlySum += monthlySavings;
    
    // Store monthly data
    monthlyData.push({
      month: i,
      'Cumulative Savings': cumulative,
      'Investment': estimatedCost,
    });
    
    // Create yearly data points for cleaner visualization
    if (i % 12 === 0) {
      const year = i / 12;
      yearData.push({
        year: year,
        'Cumulative Savings': cumulative,
        'Investment': estimatedCost,
        'Yearly Savings': yearlySum,
      });
      yearlySum = 0;
    }
  }
  
  return { monthlyData, yearData };
}

function formatCurrency(value) {
  if (value >= 100000) {
    return `₹${(value/100000).toFixed(1)} Lakhs`;
  } else {
    return `₹${value.toLocaleString()}`;
  }
}

export default function SavingsOverTimeChart({ billAmount, systemSize, breakEvenMonths, estimatedCost }) {
  const { yearData } = useMemo(() => getSavingsData(billAmount, systemSize, breakEvenMonths, estimatedCost), 
    [billAmount, systemSize, breakEvenMonths, estimatedCost]);
  
  const chartBg = useColorModeValue('white', 'gray.800');
  const highlightBg = useColorModeValue('orange.50', 'gray.700');
  
  // Calculate total 25-year savings
  const totalSavings = yearData[yearData.length - 1]['Cumulative Savings'] - estimatedCost;
  
  // Break-even year (rounded up)
  const breakEvenYear = Math.ceil(breakEvenMonths / 12);

  return (
    <Box p={4} bg={chartBg} rounded="md" boxShadow="sm" w="100%">
      <VStack spacing={4} align="stretch">
        <HStack>
          <Icon as={FaMoneyBillWave} color="orange.500" boxSize={6} />
          <Text fontWeight="bold" fontSize="xl" color="orange.500">
            Your Solar Savings Journey
          </Text>
        </HStack>
        
        <Text fontSize="md" color="gray.700">
          This chart shows how your savings grow over time compared to your initial investment.
        </Text>
        
        {/* Key insights section */}
        <Flex flexWrap="wrap" gap={4} justify="space-around" bg={highlightBg} p={4} borderRadius="md">
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="sm" color="gray.600">Initial Investment</Text>
            <Text fontWeight="bold" fontSize="lg" color="blue.500">
              {formatCurrency(estimatedCost)}
            </Text>
          </VStack>
          
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="sm" color="gray.600">Break-Even Point</Text>
            <HStack>
              <Icon as={FaCalendarAlt} color="green.500" />
              <Text fontWeight="bold" fontSize="lg" color="green.500">
                {breakEvenYear} Years
              </Text>
            </HStack>
          </VStack>
          
          <VStack align="flex-start" spacing={1}>
            <Text fontSize="sm" color="gray.600">25-Year Total Savings</Text>
            <Text fontWeight="bold" fontSize="lg" color="orange.500">
              {formatCurrency(totalSavings)}
            </Text>
          </VStack>
        </Flex>
        
        {/* Explanation for non-technical users */}
        <Box bg="blue.50" p={3} borderRadius="md" borderLeft="4px solid" borderColor="blue.400">
          <HStack spacing={2} mb={1}>
            <Icon as={FaInfoCircle} color="blue.500" />
            <Text fontWeight="bold" color="blue.600">What This Means For You</Text>
          </HStack>
          <Text fontSize="sm" color="gray.700">
            The orange area shows your growing savings over time. When it crosses the blue line 
            (your investment), you've reached the "break-even point" and everything after that is pure profit!
          </Text>
        </Box>
        
        <Box position="relative" h={{ base: "320px", md: "400px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={yearData} margin={{ top: 10, right: 10, left: 0, bottom: 25 }}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F6AD55" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#F6AD55" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="year" 
                tick={{ fontSize: 12 }} 
                label={{ value: 'Years', position: 'insideBottom', offset: -20, fontSize: 14 }} 
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickFormatter={v => `₹${(v/100000).toFixed(0)}L`} 
                label={{ value: 'Money (₹)', angle: -90, position: 'insideLeft', offset: 0, fontSize: 14 }} 
              />
              <Tooltip 
                formatter={(value) => formatCurrency(value)}
                labelFormatter={l => `Year ${l}`}
                contentStyle={{ fontSize: '14px' }}
              />
              <Area 
                type="monotone" 
                dataKey="Cumulative Savings" 
                name="Your Total Savings" 
                stroke="#ED8936" 
                fill="url(#colorSavings)" 
                strokeWidth={3} 
              />
              <Line 
                type="monotone" 
                dataKey="Investment" 
                name="Your Investment" 
                stroke="#4299E1" 
                strokeDasharray="5 5" 
                dot={false} 
                strokeWidth={2} 
              />
              <ReferenceLine 
                x={breakEvenYear} 
                stroke="#38A169" 
                strokeDasharray="3 3" 
                label={{ 
                  value: 'Break Even', 
                  position: 'top', 
                  fill: '#38A169', 
                  fontSize: 16,
                  fontWeight: 'bold',
                  background: '#FFFFFF',
                  padding: 10,
                  opacity: 1
                }} 
              />
            </AreaChart>
          </ResponsiveContainer>
          
          {/* Time markers */}
          <Flex position="absolute" bottom="-15px" width="100%" justify="space-between" px={10}>
            <Badge colorScheme="green" borderRadius="full" px={2}>Today</Badge>
            <Badge colorScheme="orange" borderRadius="full" px={2}>25 Years</Badge>
          </Flex>
        </Box>
        
        <HStack justify="space-between" fontSize="sm" color="gray.500">
          <Text>Initial Cost: {formatCurrency(estimatedCost)}</Text>
          <Text>Monthly Savings: {formatCurrency(billAmount)}</Text>
        </HStack>
      </VStack>
    </Box>
  );
} 