"use client";

import { useState, useEffect } from 'react';
import { Box, Container, Grid, Heading, Text, VStack, Skeleton, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Icon } from '@chakra-ui/react';
import { FaSolarPanel, FaTools, FaComments } from 'react-icons/fa';

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
];

export const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flipped, setFlipped] = useState<number | null>(null);
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.600', 'gray.200');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Box py={20} bg="gray.50">
        <Container maxW="container.xl">
          <VStack spacing={12}>
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
    <Box py={20} bg="gray.50">
      <Container maxW="container.xl">
        <VStack spacing={12}>
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            bgGradient="linear(to-r, solar.500, sky.500)"
            bgClip="text"
          >
            Our Services
          </Heading>

          <Grid
            templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
            gap={{ base: 4, md: 8 }}
            width="100%"
          >
            {services.map((service, index) => (
              <Box
                key={service.title}
                height={{ base: '220px', sm: '260px', md: '300px' }}
                onMouseEnter={() => setFlipped(index)}
                onMouseLeave={() => setFlipped(null)}
                tabIndex={0}
                onFocus={() => setFlipped(index)}
                onBlur={() => setFlipped(null)}
                role="article"
                aria-label={`${service.title} service card`}
                style={{ outline: 'none', perspective: '1000px' }}
              >
                <Box
                  height="100%"
                  width="100%"
                  position="relative"
                  style={{
                    transition: 'transform 0.6s',
                    transformStyle: 'preserve-3d',
                    borderRadius: '1rem',
                    transform: flipped === index ? 'rotateY(180deg)' : 'none',
                  }}
                >
                  {/* Front */}
                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    bg={bgColor}
                    borderRadius="xl"
                    p={{ base: 3, sm: 4, md: 6 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <MotionBox
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Icon
                        as={service.icon}
                        w={{ base: 8, sm: 10, md: 12 }}
                        h={{ base: 8, sm: 10, md: 12 }}
                        color="solar.500"
                        aria-hidden="true"
                      />
                    </MotionBox>
                    <Heading as="h3" size={{ base: 'sm', md: 'md' }} mt={4} textAlign="center">
                      {service.title}
                    </Heading>
                    <Text textAlign="center" color={textColor} mt={2} fontSize={{ base: 'sm', md: 'md' }}>
                      {service.description}
                    </Text>
                  </Box>
                  {/* Back */}
                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    bg="whiteAlpha.900"
                    borderRadius="xl"
                    p={{ base: 3, sm: 4, md: 6 }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <Text textAlign="center" color={textColor} fontSize={{ base: 'sm', md: 'md' }}>
                      {service.details}
                    </Text>
                  </Box>
                </Box>
              </Box>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Services; 