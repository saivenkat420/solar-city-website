"use client";

import { Box, Container, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Icon } from '@chakra-ui/react';
import { FaSolarPanel, FaTools, FaComments } from 'react-icons/fa';
import Card from './Card';

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
            gap={8}
            width="100%"
          >
            {services.map((service, index) => (
              <MotionBox
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  height="300px"
                  position="relative"
                  perspective="1000px"
                  _hover={{
                    '& > div': {
                      transform: 'rotateY(180deg)',
                    },
                  }}
                >
                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    transition="transform 0.6s"
                    transformStyle="preserve-3d"
                    backfaceVisibility="hidden"
                  >
                    <VStack spacing={4} align="center" justify="center" height="100%">
                      <MotionBox
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Icon
                          as={service.icon}
                          w={12}
                          h={12}
                          color="solar.500"
                        />
                      </MotionBox>
                      <Heading as="h3" size="md">
                        {service.title}
                      </Heading>
                      <Text textAlign="center" color="gray.600">
                        {service.description}
                      </Text>
                    </VStack>
                  </Box>

                  <Box
                    position="absolute"
                    width="100%"
                    height="100%"
                    transition="transform 0.6s"
                    transformStyle="preserve-3d"
                    backfaceVisibility="hidden"
                    transform="rotateY(180deg)"
                    bg="whiteAlpha.900"
                    borderRadius="xl"
                    p={6}
                  >
                    <VStack spacing={4} align="center" justify="center" height="100%">
                      <Text textAlign="center" color="gray.700">
                        {service.details}
                      </Text>
                    </VStack>
                  </Box>
                </Card>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default Services; 