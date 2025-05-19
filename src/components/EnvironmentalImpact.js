import React from 'react';
import { Box, VStack, HStack, Text, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaLeaf, FaTree, FaCarSide } from 'react-icons/fa';

function getEnvironmentalImpact(systemSize) {
  // Approximate formulas
  const co2Offset = Math.round(systemSize * 1200); // kg/year
  const treesPlanted = Math.round(co2Offset / 21); // 1 tree = 21kg CO2/year
  const carMiles = Math.round(co2Offset / 0.2); // 0.2kg CO2/mile
  return { co2Offset, treesPlanted, carMiles };
}

export default function EnvironmentalImpact({ systemSize }) {
  const { co2Offset, treesPlanted, carMiles } = getEnvironmentalImpact(systemSize);
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Box p={4} bg={cardBg} rounded="md" boxShadow="sm" w="100%">
      <Text fontWeight="bold" fontSize="lg" mb={2} color="teal.500">
        Environmental Impact
      </Text>
      <Text fontSize="sm" color="gray.500" mb={4}>
        Visualize your CO₂ offset, trees planted, and car miles saved per year.
      </Text>
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <Icon as={FaLeaf} color="green.500" boxSize={7} />
          <Text fontSize="md">
            <b>CO₂ Offset:</b> {co2Offset.toLocaleString()} kg/year
          </Text>
        </HStack>
        <HStack spacing={4}>
          <Icon as={FaTree} color="teal.400" boxSize={7} />
          <Text fontSize="md">
            <b>Trees Planted Equivalent:</b> {treesPlanted.toLocaleString()} trees/year
          </Text>
        </HStack>
        <HStack spacing={4}>
          <Icon as={FaCarSide} color="orange.400" boxSize={7} />
          <Text fontSize="md">
            <b>Car Miles Offset:</b> {carMiles.toLocaleString()} miles/year
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
} 