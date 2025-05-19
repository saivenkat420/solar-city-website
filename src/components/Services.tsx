"use client";

import { useState, useEffect } from 'react';
import { Box, Container, Grid, Heading, Text, VStack, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Icon } from '@chakra-ui/react';
import { FaSolarPanel, FaTools, FaComments, FaBatteryFull, FaChartLine, FaMoneyBillWave } from 'react-icons/fa';

const MotionBox = motion(Box);

interface Service {
  title: string;
  description: string;
  icon: any;
  details: string;
}

const services: Service[] = [
  {
    title: 'Solar Installation',
    description: 'Professional installation of solar panels for homes and businesses.',
    icon: FaSolarPanel,
    details: 'Our expert team handles everything from site assessment to final installation, ensuring optimal energy production.',
  },
  {
    title: 'Maintenance',
    description: 'Regular maintenance and repairs to keep your system running efficiently.',
    icon: FaTools,
    details: 'We offer comprehensive maintenance packages including cleaning, inspection, and performance optimization.',
  },
  {
    title: 'Consultation',
    description: 'Expert advice on solar solutions tailored to your needs.',
    icon: FaComments,
    details: 'Get personalized recommendations on system size, financing options, and energy savings calculations.',
  },
  {
    title: 'Battery Storage',
    description: 'Advanced battery solutions for energy independence and backup power.',
    icon: FaBatteryFull,
    details: 'Store excess solar energy for use at night or during outages with our reliable battery systems.',
  },
  {
    title: 'System Monitoring',
    description: '24/7 monitoring to ensure your solar system is always performing at its best.',
    icon: FaChartLine,
    details: 'Track your energy production and receive alerts for any issues with our smart monitoring platform.',
  },
  {
    title: 'Financing & Incentives',
    description: 'Flexible financing options and help with government incentives.',
    icon: FaMoneyBillWave,
    details: 'We guide you through available loans, subsidies, and tax benefits to make solar affordable.',
  },
];

export const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flipped, setFlipped] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const cardBg = useColorModeValue(
    'linear-gradient(135deg, white 0%, #f7fafc 100%)',
    'linear-gradient(135deg, gray.800 0%, gray.700 100%)'
  );
  const borderColor = useColorModeValue('solar.100', 'solar.900');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box py={10} bg="gray.50">
        <Container maxW="container.xl">
          <VStack spacing={6}>
            <Skeleton height="40px" width="300px" />
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
              gap={8}
              width="100%"
            >
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} height="300px" width="100%" />
              ))}
            </Grid>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box py={10} bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing={5}>
          <Heading
            as="h2"
            size="lg"
            textAlign="center"
            bgGradient="linear(to-r, solar.500, sky.500)"
            bgClip="text"
            
          >
            Our Services
          </Heading>
          <Text
            textAlign="center"
            fontSize="lg"
            color={textColor}
            maxW="2xl"
            
          >
            Discover our comprehensive range of solar energy solutions tailored to your needs
          </Text>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={{ base: 6, md: 8 }}
            width="100%"
          >
            {services.map((service, index) => (
              <MotionBox
                key={service.title}
                height={{ base: '280px', sm: '300px', md: '320px' }}
                onMouseEnter={() => {
                  setFlipped(index);
                  setHoveredIndex(index);
                }}
                onMouseLeave={() => {
                  setFlipped(null);
                  setHoveredIndex(null);
                }}
                tabIndex={0}
                onFocus={() => setFlipped(index)}
                onBlur={() => setFlipped(null)}
                role="article"
                aria-label={`${service.title} service card`}
                style={{ outline: 'none', perspective: '1000px' }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  height="100%"
                  width="100%"
                  position="relative"
                  style={{
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    transform: flipped === index ? 'rotateY(180deg)' : 'none',
                  }}
                >
                  {/* Front */}
                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    bgGradient={cardBg}
                    borderRadius="xl"
                    p={{ base: 6, md: 8 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    borderColor={hoveredIndex === index ? 'solar.500' : borderColor}
                    boxShadow={`0 8px 32px ${shadowColor}`}
                    transition="all 0.3s ease-in-out"
                    style={{ backfaceVisibility: 'hidden' }}
                    _hover={{
                      boxShadow: `0 12px 48px ${shadowColor}`,
                    }}
                  >
                    <MotionBox
                      initial={{ scale: 1 }}
                      animate={hoveredIndex === index ? {
                        scale: [1, 1.2, 1],
                        rotate: [0, 360],
                      } : {}}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        times: [0, 0.5, 1],
                      }}
                    >
                      <Icon
                        as={service.icon}
                        w={{ base: 12, md: 16 }}
                        h={{ base: 12, md: 16 }}
                        color="solar.500"
                        aria-hidden="true"
                      />
                    </MotionBox>
                    <Heading
                      as="h3"
                      size="md"
                      mt={6}
                      mb={3}
                      textAlign="center"
                      color={useColorModeValue('gray.800', 'white')}
                    >
                      {service.title}
                    </Heading>
                    <Text
                      textAlign="center"
                      color={textColor}
                      fontSize="md"
                      lineHeight="tall"
                    >
                      {service.description}
                    </Text>
                  </Box>

                  {/* Back */}
                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    bgGradient={cardBg}
                    borderRadius="xl"
                    p={{ base: 6, md: 8 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    border="1px solid"
                    borderColor={hoveredIndex === index ? 'solar.500' : borderColor}
                    boxShadow={`0 8px 32px ${shadowColor}`}
                    transition="all 0.3s ease-in-out"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    _hover={{
                      boxShadow: `0 12px 48px ${shadowColor}`,
                    }}
                  >
                    <Heading
                      as="h4"
                      size="sm"
                      mb={4}
                      color={useColorModeValue('solar.600', 'solar.400')}
                    >
                      Learn More
                    </Heading>
                    <Text
                      textAlign="center"
                      color={textColor}
                      fontSize="md"
                      lineHeight="tall"
                    >
                      {service.details}
                    </Text>
                  </Box>
                </Box>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Services; 