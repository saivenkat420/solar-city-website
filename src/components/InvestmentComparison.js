import React from 'react';
import { Box, Text, useColorModeValue, Heading, Icon, Flex, useBreakpointValue, SimpleGrid } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts';
import { FaChartBar, FaInfoCircle } from 'react-icons/fa';
import { LinearGradient } from 'recharts';

function calculateInvestmentReturns(initialInvestment, years = 25) {
  // Solar ROI calculation (assumes complete payback and then pure profit)
  // We'll estimate solar ROI as ~15-20% over 25 years
  const solarROI = initialInvestment * 3.5; // 350% return over 25 years (~14% annually)
  
  // Fixed Deposit - Assuming 6.5% annual interest rate
  const fdROI = initialInvestment * Math.pow(1.065, years);
  
  // Mutual Funds - Assuming 12% annual returns
  const mfROI = initialInvestment * Math.pow(1.12, years);
  
  // Stock Market - Assuming 10% annual returns
  const stockROI = initialInvestment * Math.pow(1.10, years);
  
  // Calculate ROI percentages
  const solarROIPercent = ((solarROI / initialInvestment) - 1) * 100;
  const fdROIPercent = ((fdROI / initialInvestment) - 1) * 100;
  const mfROIPercent = ((mfROI / initialInvestment) - 1) * 100;
  const stockROIPercent = ((stockROI / initialInvestment) - 1) * 100;
  
  return [
    {
      name: 'Solar',
      value: Math.round(solarROI),
      initial: initialInvestment,
      roi: Math.round(solarROIPercent),
      color: '#805AD5' // Purple
    },
    {
      name: 'Fixed Deposit',
      value: Math.round(fdROI),
      initial: initialInvestment,
      roi: Math.round(fdROIPercent),
      color: '#48BB78' // Green
    },
    {
      name: 'Mutual Funds',
      value: Math.round(mfROI),
      initial: initialInvestment,
      roi: Math.round(mfROIPercent),
      color: '#F6AD55' // Orange
    },
    {
      name: 'Stock Market',
      value: Math.round(stockROI),
      initial: initialInvestment,
      roi: Math.round(stockROIPercent),
      color: '#4299E1' // Blue
    }
  ];
}

export default function InvestmentComparison({ estimatedCost }) {
  const data = calculateInvestmentReturns(estimatedCost);
  const chartBg = useColorModeValue('white', 'gray.800');
  const highlightBg = useColorModeValue('blue.50', 'blue.900');
  const barColors = [
    'url(#solarGradient)', // Solar
    'url(#fdGradient)',    // FD
    'url(#mfGradient)',    // MF
    'url(#stockGradient)'  // Stock
  ];
  const textColor = useColorModeValue('#4A5568', '#E2E8F0');

  const sections = [
    { label: 'Solar', color: barColors[0], gradientId: 'solarGradient' },
    { label: 'Fixed Deposit', color: barColors[1], gradientId: 'fdGradient' },
    { label: 'Mutual Funds', color: barColors[2], gradientId: 'mfGradient' },
    { label: 'Stock Market', color: barColors[3], gradientId: 'stockGradient' },
  ];

  return (
    <Box
      p={{ base: 4, md: 6 }}
      bg={chartBg}
      rounded="2xl"
      boxShadow="2xl"
      w="100%"
      borderWidth="1px"
      borderColor={useColorModeValue('blue.100', 'blue.700')}
      position="relative"
      transition="all 0.2s"
      _hover={{
        boxShadow: '3xl',
        transform: 'translateY(-4px) scale(1.02)',
        borderColor: 'orange.200',
      }}
      mb={8}
    >
      <Flex align="center" mb={4}>
        <Box
          bg="blue.500"
          p={2}
          borderRadius="full"
          mr={3}
          color="white"
        >
          <Icon as={FaChartBar} />
        </Box>
        <Heading as="h3" size={{ base: "sm", md: "md" }} color="blue.600">
          Investment Comparison (25 Year Returns)
        </Heading>
      </Flex>
      <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mb={2}>
        See the 25-year return for each investment type.
      </Text>
      <Box
        p={3}
        borderRadius="md"
        bg={highlightBg}
        mb={4}
        display="flex"
        alignItems="center"
      >
        <Icon as={FaInfoCircle} color="blue.500" mr={2} />
        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
          Initial investment of ₹{estimatedCost.toLocaleString()} compared across different options
        </Text>
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {sections.map((section, idx) => {
          const entry = data.find(d => d.name === section.label);
          if (!entry) return null;
          return (
            <Box key={section.label} bg={useColorModeValue('gray.50', 'gray.700')} p={4} rounded="lg" boxShadow="md">
              <Text fontWeight="bold" fontSize="md" mb={2} color="blue.500">{section.label}</Text>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={[entry]} margin={{ top: 20, right: 20, left: 10, bottom: 20 }}>
                  <defs>
                    <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#805AD5" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#B794F4" stopOpacity={0.7} />
                    </linearGradient>
                    <linearGradient id="fdGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#48BB78" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#A0ECC0" stopOpacity={0.7} />
                    </linearGradient>
                    <linearGradient id="mfGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F6AD55" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#FBD38D" stopOpacity={0.7} />
                    </linearGradient>
                    <linearGradient id="stockGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4299E1" stopOpacity={0.9} />
                      <stop offset="100%" stopColor="#90CDF4" stopOpacity={0.7} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 13, fontWeight: 'bold', fill: textColor }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `₹${(v / 100000).toFixed(1)}L`} tick={{ fontSize: 12, fill: textColor }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} labelFormatter={() => `${section.label} (ROI: ${entry.roi}%)`} />
                  <Bar dataKey="value" fill={section.color} radius={[8, 8, 0, 0]} barSize={48}>
                    <LabelList dataKey="value" position="top" style={{ fill: textColor, fontSize: 13, fontWeight: 'bold' }} formatter={(value) => `₹${value.toLocaleString()} (${entry.roi}%)`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <Text fontSize="sm" color="gray.600" mt={2} textAlign="center">
                {section.label} 25-Year Return: <b>₹{entry.value.toLocaleString()}</b> ({entry.roi}% ROI)
              </Text>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
} 