import React from 'react';
import {
  Box,
  Text,
  Flex,
  HStack,
  VStack,
  Avatar,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { FaQuoteLeft, FaStar, FaCheck, FaMedal, FaCertificate, FaShieldAlt, FaHandshake } from 'react-icons/fa';

// Sample testimonial data
const testimonials = [
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    testimonial: "Installing solar with Solar City was the best decision we made. Our electricity bills are down by 85%, and the system paid for itself much faster than expected. The team was professional from start to finish.",
    system: '5kW Residential System'
  },
  {
    name: 'Priya Sharma',
    location: 'Bangalore',
    rating: 5,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    testimonial: "We're extremely happy with our solar installation. The process was smooth and the team addressed all our concerns. It's been a year and the system is performing even better than promised.",
    system: '3kW Residential System'
  },
  {
    name: 'Sunil Mehta',
    location: 'Mumbai',
    rating: 4,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    testimonial: "The Solar City team was very professional. The installation was completed on time and the after-sales service has been excellent. Our commercial building now has reliable power with significant savings.",
    system: '10kW Commercial System'
  }
];

// Trust badges data
const trustBadges = [
  {
    title: 'MNRE Approved',
    description: 'Certified by Ministry of New and Renewable Energy',
    icon: FaCertificate,
    color: 'green.500'
  },
  {
    title: '5-Star Rated',
    description: '4.8/5 average customer rating',
    icon: FaStar,
    color: 'yellow.500'
  },
  {
    title: '10+ Years Experience',
    description: 'Serving customers since 2012',
    icon: FaMedal,
    color: 'orange.500'
  },
  {
    title: 'Performance Guarantee',
    description: 'Backed by our generation guarantee',
    icon: FaShieldAlt,
    color: 'blue.500'
  },
  {
    title: 'Extended Warranty',
    description: 'Up to 25 years warranty on panels',
    icon: FaHandshake,
    color: 'purple.500'
  }
];

export default function TestimonialsTrustBadges() {
  const cardBg = useColorModeValue('white', 'gray.800');
  const quoteBg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box p={4} bg={cardBg} rounded="md" boxShadow="sm" w="100%">
      <Text fontWeight="bold" fontSize="lg" mb={2} color="blue.500">
        Customer Testimonials & Trust Badges
      </Text>
      <Text fontSize="sm" color="gray.500" mb={6}>
        What our customers say about us and our certifications
      </Text>

      {/* Testimonials Section */}
      <VStack spacing={6} align="stretch" mb={8}>
        {testimonials.map((testimonial, idx) => (
          <Box 
            key={idx} 
            p={4} 
            bg={quoteBg} 
            borderRadius="md" 
            position="relative"
            borderLeft="4px solid"
            borderColor="blue.400"
          >
            <Icon 
              as={FaQuoteLeft} 
              position="absolute" 
              top={3} 
              left={3} 
              color="blue.200" 
              boxSize={6} 
              opacity={0.3}
            />
            <Box pl={8}>
              <Text fontSize="md" fontStyle="italic" mb={3} color="gray.600">
                "{testimonial.testimonial}"
              </Text>
              
              <Flex justify="space-between" align="center">
                <HStack spacing={3}>
                  <Avatar src={testimonial.image} size="sm" name={testimonial.name} />
                  <Box>
                    <Text fontWeight="bold" fontSize="sm">{testimonial.name}</Text>
                    <Text fontSize="xs" color="gray.500">{testimonial.location} • {testimonial.system}</Text>
                  </Box>
                </HStack>
                
                <HStack spacing={1}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} as={FaStar} color="yellow.400" boxSize={4} />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Icon key={i} as={FaStar} color="gray.300" boxSize={4} />
                  ))}
                </HStack>
              </Flex>
            </Box>
          </Box>
        ))}
      </VStack>

      {/* Trust Badges Section */}
      <Text fontWeight="bold" fontSize="md" mb={4} color="gray.700">
        Our Certifications & Guarantees
      </Text>
      
      <SimpleGrid columns={{ base: 2, md: 3, lg: 5 }} spacing={4}>
        {trustBadges.map((badge, idx) => (
          <Box 
            key={idx} 
            borderWidth={1} 
            borderColor={borderColor} 
            p={3} 
            rounded="md" 
            textAlign="center"
          >
            <Icon as={badge.icon} boxSize={8} color={badge.color} mb={2} />
            <Text fontWeight="bold" fontSize="sm">{badge.title}</Text>
            <Text fontSize="xs" color="gray.500">{badge.description}</Text>
          </Box>
        ))}
      </SimpleGrid>
      
      {/* Partner Logos */}
      <Text fontWeight="bold" fontSize="md" mt={6} mb={4} color="gray.700">
        Our Partners & Suppliers
      </Text>
      
      <SimpleGrid columns={{ base: 3, md: 6 }} spacing={4}>
        {['Tata Power Solar', 'Luminous', 'Waaree Solar', 'Adani Solar', 'Havells', 'Solis'].map((partner, idx) => (
          <Box 
            key={idx} 
            p={2} 
            borderWidth={1} 
            borderColor={borderColor} 
            rounded="md" 
            display="flex" 
            alignItems="center" 
            justifyContent="center"
            h="60px"
          >
            {/* Placeholder for actual partner logos */}
            <Text fontSize="xs" fontWeight="bold" color="gray.500" textAlign="center">
              {partner}
            </Text>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
} 