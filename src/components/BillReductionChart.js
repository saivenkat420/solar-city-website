import React from 'react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

function getBillData(currentBill) {
  // Calculate savings based on current bill
  // Our model assumes monthly savings equals bill amount (100% offset)
  // So post-solar bill would be close to just connection charges
  const postSolarBill = 100; // Standard connection charge
  const savings = currentBill - postSolarBill;
  
  return [
    { name: 'Current', bill: currentBill, savings: 0 },
    { name: 'With Solar', bill: postSolarBill, savings: savings }
  ];
}

export default function BillReductionChart({ billAmount }) {
  const data = getBillData(billAmount);
  const chartBg = useColorModeValue('white', 'gray.800');
  
  return (
    <Box p={4} bg={chartBg} rounded="md" boxShadow="sm" w="100%">
      <Text fontWeight="bold" fontSize="lg" mb={3} color="green.500">
        Your Monthly Bill Reduction
      </Text>
      <Text fontSize="sm" color="gray.600" mb={6}>
        See how your electricity bill reduces after installing solar.
      </Text>
      
      <Box h={{ base: "240px", md: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="name" />
            <YAxis 
              tickFormatter={(value) => `₹${value}`}
              label={{ value: 'Monthly Bill (₹)', angle: -90, position: 'insideLeft', offset: -5 }}
            />
            <Tooltip 
              formatter={(value) => `₹${value.toLocaleString()}`}
              itemStyle={{ color: '#2D3748', fontWeight: 500 }}
              contentStyle={{ borderRadius: '8px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar 
              dataKey="bill" 
              name="Bill Amount" 
              stackId="a" 
              fill="#4299E1" 
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="savings" 
              name="Savings" 
              stackId="a" 
              fill="#48BB78" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      
      <Box mt={2} p={3} bg="green.50" borderRadius="md" borderLeft="4px solid" borderColor="green.400">
        <Text fontSize="sm" color="gray.700">
          <strong>With solar, your bill reduces by {Math.round((data[1].savings / data[0].bill) * 100)}%!</strong> You'll only pay minimal connection charges.
        </Text>
      </Box>
    </Box>
  );
} 