import React from 'react';
import { 
  Box, 
  Text, 
  Flex, 
  VStack, 
  HStack, 
  SimpleGrid, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText,
  Icon, 
  Divider,
  Badge,
  Image,
  useColorModeValue 
} from '@chakra-ui/react';
import { FaSolarPanel, FaHome, FaRulerCombined, FaChartLine, FaLightbulb } from 'react-icons/fa';

// Helper function to calculate system sizing
function calculateSystemDetails(systemSize) {
  // Average panel size is 400W, so calculate number of panels
  const panelSize = 400; // in watts
  const numberOfPanels = Math.ceil((systemSize * 1000) / panelSize);
  
  // Estimate roof area required (each panel is ~2 square meters)
  const estimatedRoofArea = numberOfPanels * 2;
  
  // Estimate annual production (assuming 4.5 peak sun hours per day in India)
  const annualProduction = Math.round(systemSize * 4.5 * 365);
  
  return {
    numberOfPanels,
    estimatedRoofArea,
    annualProduction
  };
}

export default function SolarSystemSizing({ systemSize }) {
  const { numberOfPanels, estimatedRoofArea, annualProduction } = calculateSystemDetails(systemSize);
  const cardBg = useColorModeValue('white', 'gray.800');
  const highlightBg = useColorModeValue('blue.50', 'blue.900');
  const panelColor = useColorModeValue('blue.400', 'blue.300');
  
  // Calculate rows and columns for the panel visualization (trying to keep it roughly square)
  const columns = Math.ceil(Math.sqrt(numberOfPanels));
  const rows = Math.ceil(numberOfPanels / columns);
  
  return (
    <Box 
      p={6} 
      bg={cardBg} 
      rounded="lg" 
      boxShadow="md" 
      w="100%" 
      borderWidth="1px"
      borderColor={useColorModeValue('blue.100', 'blue.700')}
    >
      <HStack spacing={3} mb={4}>
        <Icon as={FaSolarPanel} color="blue.500" boxSize={6} />
        <Text fontWeight="bold" fontSize="lg" color="blue.600">
          Your Solar System Size Visualization
        </Text>
      </HStack>
      
      <Text fontSize="sm" color="gray.600" mb={6}>
        Visual representation of your {systemSize}kW system and key specifications
      </Text>
      
      {/* Main content in responsive grid */}
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Left side - Visual representation */}
        <Box>
          <Box 
            bg={highlightBg} 
            p={4} 
            borderRadius="md" 
            position="relative"
            mb={4}
          >
            <Flex 
              position="absolute" 
              top={-3} 
              left={4} 
              bg="blue.500" 
              color="white" 
              px={3} 
              py={1} 
              borderRadius="md" 
              fontSize="sm" 
              fontWeight="bold"
              boxShadow="sm"
            >
              Roof Layout
            </Flex>
            
            <Box 
              mt={4} 
              border="1px dashed" 
              borderColor="blue.300" 
              p={4} 
              borderRadius="md"
              position="relative"
              height={{ base: "200px", sm: "250px", md: "220px", lg: "250px" }}
              overflow="hidden"
            >
              {/* Home Icon */}
              <Icon 
                as={FaHome} 
                position="absolute" 
                bottom={2} 
                right={2} 
                color="gray.400" 
                boxSize={{ base: 6, md: 8 }}
              />
              
              {/* Solar Panel Grid */}
              <Flex 
                wrap="wrap" 
                justifyContent="center" 
                alignItems="center" 
                height="100%"
              >
                {Array.from({ length: numberOfPanels }).map((_, i) => (
                  <Box 
                    key={i}
                    width={`${Math.min(100 / columns - 1, 8)}%`}
                    height={`${Math.min(100 / rows - 1, 15)}%`}
                    m="1px"
                    bg={panelColor}
                    borderRadius="sm"
                    border="1px solid"
                    borderColor="blue.500"
                    opacity={0.9}
                    _hover={{ opacity: 1, transform: 'scale(1.05)' }}
                    transition="all 0.2s"
                  />
                ))}
              </Flex>
              
              {/* Legend */}
              <HStack 
                position="absolute" 
                top={2} 
                left={2} 
                bg="white" 
                px={2} 
                py={1} 
                borderRadius="md" 
                boxShadow="sm"
                opacity={0.9}
              >
                <Box bg={panelColor} w={4} h={2} borderRadius="sm" />
                <Text fontSize="xs">= 1 panel (400W)</Text>
              </HStack>
            </Box>
            
            <Text textAlign="center" fontSize="sm" color="blue.700" mt={2}>
              Total: {numberOfPanels} panels ({systemSize}kW system)
            </Text>
          </Box>
          
          <SimpleGrid columns={2} spacing={4}>
            <Stat bg={useColorModeValue('gray.50', 'gray.700')} p={3} borderRadius="md">
              <Flex align="center" mb={1}>
                <Icon as={FaRulerCombined} color="gray.500" mr={2} />
                <StatLabel>Roof Space Needed</StatLabel>
              </Flex>
              <StatNumber fontSize="xl">{estimatedRoofArea} m²</StatNumber>
              <StatHelpText>{Math.round(estimatedRoofArea * 10.764)} sq.ft</StatHelpText>
            </Stat>
            
            <Stat bg={useColorModeValue('gray.50', 'gray.700')} p={3} borderRadius="md">
              <Flex align="center" mb={1}>
                <Icon as={FaLightbulb} color="yellow.500" mr={2} />
                <StatLabel>Annual Production</StatLabel>
              </Flex>
              <StatNumber fontSize="xl">{annualProduction} kWh</StatNumber>
              <StatHelpText>Based on 4.5 sun hours/day</StatHelpText>
            </Stat>
          </SimpleGrid>
        </Box>
        
        {/* Right side - Technical Specifications */}
        <Box>
          <Text fontWeight="bold" fontSize="md" mb={3} color="gray.700">
            System Specifications
          </Text>
          
          <VStack align="stretch" spacing={4} bg={useColorModeValue('gray.50', 'gray.700')} p={4} borderRadius="md">
            <SpecificationItem 
              label="System Size" 
              value={`${systemSize} kW`} 
              subtext="DC Capacity"
              icon={FaChartLine}
              iconColor="blue.500"
            />
            
            <Divider />
            
            <SpecificationItem 
              label="Solar Panels" 
              value={`${numberOfPanels} x 400W`} 
              subtext="High-efficiency Mono PERC panels"
              icon={FaSolarPanel}
              iconColor="blue.500"
            />
            
            <Divider />
            
            <SpecificationItem 
              label="Space Requirements" 
              value={`${estimatedRoofArea} m²`} 
              subtext={`${Math.round(estimatedRoofArea * 10.764)} sq.ft of clear roof area`}
              icon={FaRulerCombined}
              iconColor="gray.500"
            />
            
            <Divider />
            
            <SpecificationItem 
              label="Energy Production" 
              value={`${annualProduction} kWh/year`} 
              subtext={`${Math.round(annualProduction/12)} kWh/month average`}
              icon={FaLightbulb}
              iconColor="yellow.500"
            />
          </VStack>
          
          <Box mt={4} p={3} bg="green.50" borderRadius="md" borderLeft="4px solid" borderColor="green.400">
            <Text fontSize="sm" color="gray.700">
              <Text as="span" fontWeight="bold">Perfect for: </Text>
              {systemSize <= 3 ? 
                "Small homes, apartments with limited roof space" :
                systemSize <= 6 ? 
                  "Medium to large homes with average electricity consumption" :
                  "Large homes, small businesses with high energy requirements"
              }
            </Text>
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
}

// Helper component for specification items
function SpecificationItem({ label, value, subtext, icon, iconColor }) {
  return (
    <HStack spacing={3} align="start">
      <Icon as={icon} color={iconColor} boxSize={6} mt={1} />
      <Box>
        <Text fontSize="sm" color="gray.600">{label}</Text>
        <Text fontWeight="bold" fontSize="lg">{value}</Text>
        <Text fontSize="xs" color="gray.500">{subtext}</Text>
      </Box>
    </HStack>
  );
} 