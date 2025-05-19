"use client";

import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Input,
  Button,
  Container,
  Card,
  Tooltip,
  InputGroup,
  InputRightElement,
  IconButton,
  Flex,
  Image,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { FaInfoCircle, FaBuilding, FaHome } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const MotionCard = motion(Card);
const MotionBox = motion(Box);

const CONSUMER_CATEGORIES = [
  {
    id: 'residential',
    title: 'Residential',
    description: 'Houses & Apartments',
    icon: FaHome,
  },
  {
    id: 'commercial',
    title: 'Commercial',
    description: 'Offices & Shops',
    icon: FaBuilding,
  }
];

export const QuotationCalculator = () => {
  const [monthlyBill, setMonthlyBill] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in solar installation.\nMonthly Bill: ₹${monthlyBill}\nCategory: ${selectedCategory}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/+919505519594?text=${encodedMessage}`, '_blank');
  };

  const handleCalculate = () => {
    if (monthlyBill && selectedCategory) {
      router.push(`/quotation/result?billAmount=${encodeURIComponent(monthlyBill)}&category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  return (
    <Box minH="calc(100vh - 80px)" w="100%" py={4} bgGradient="linear(to-br, #f8fafc, #fff)">
      <Container maxW="lg" h="100%" p={0} centerContent>
        <Flex align="center" justify="center" minH="80vh" w="100%">
          <MotionBox
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring' }}
            whileHover={{ scale: 1.015, boxShadow: '0 8px 40px #f6ad5544' }}
            whileFocus={{ scale: 1.01, boxShadow: '0 8px 40px #f6ad5544' }}
            bg="rgba(255,255,255,0.85)"
            boxShadow="2xl"
            borderRadius="2xl"
            p={{ base: 4, md: 8 }}
            backdropFilter="blur(8px)"
            border="1px solid #f6ad5522"
            w="100%"
            maxW="500px"
          >
            <VStack spacing={6} align="center" justify="center" w="100%">
              {/* Heading and Subheading */}
              <Box textAlign="center">
                <Heading
                  size="lg"
                  bgGradient="linear(to-r, orange.400, skyblue)"
                  bgClip="text"
                  fontWeight="extrabold"
                  letterSpacing="tight"
                  mb={1}
                  lineHeight={1.1}
                >
                  Calculate Your Solar Savings
                </Heading>
                <Text fontSize="md" color="gray.500" fontWeight="medium">
                  Get an instant estimate for your solar investment
                </Text>
              </Box>

              {/* Monthly Bill Input */}
              <Card p={4} bg="gray.50" shadow="sm" borderRadius="lg" borderWidth={0} w="100%" maxW="400px">
                <HStack justify="space-between" align="center" mb={2}>
                  <Text fontSize="md" fontWeight="bold">
                    Monthly Electricity Bill
                  </Text>
                  <Tooltip
                    label="Enter average of your summer and winter electricity bills"
                    placement="top"
                    hasArrow
                  >
                    <Box as="span" display="inline-flex" alignItems="center">
                      <FaInfoCircle color="#a0aec0" size={16} />
                    </Box>
                  </Tooltip>
                </HStack>
                <InputGroup size="md">
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={monthlyBill}
                    onChange={(e) => setMonthlyBill(e.target.value)}
                    pr="3.5rem"
                    fontSize="md"
                    height="44px"
                    borderWidth={1}
                    borderColor="gray.200"
                    _focus={{ borderColor: 'orange.400', boxShadow: '0 0 0 1px #f6ad55' }}
                  />
                  <InputRightElement width="3.5rem" h="44px">
                    <Text color="gray.400" fontSize="md" mr={2}>₹</Text>
                  </InputRightElement>
                </InputGroup>
              </Card>

              {/* Consumer Category Heading */}
              <Text fontSize="lg" fontWeight="semibold" color="orange.500" mt={2} mb={-2} textAlign="center" letterSpacing="tight">
                Please Select Your Consumer Category Below:
              </Text>

              {/* Category Cards in a Row */}
              <HStack spacing={4} w="100%" maxW="600px" justify="center">
                {CONSUMER_CATEGORIES.map((category, idx) => (
                  <MotionCard
                    key={category.id}
                    p={4}
                    flex={1}
                    minW="140px"
                    maxW="180px"
                    cursor="pointer"
                    bg={selectedCategory === category.id ? 'orange.50' : 'white'}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.08, boxShadow: '0 8px 32px #f6ad5544' }}
                    whileTap={{ scale: 0.97 }}
                    borderWidth={selectedCategory === category.id ? 2 : 1}
                    borderColor={selectedCategory === category.id ? 'orange.400' : 'gray.200'}
                    boxShadow="md"
                    borderRadius="lg"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    gap={1}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx, duration: 0.4, type: 'spring' }}
                  >
                    <Box as={category.icon} boxSize={7} color={selectedCategory === category.id ? 'orange.400' : 'gray.400'} mb={1} />
                    <Text fontSize="md" fontWeight="bold" color={selectedCategory === category.id ? 'orange.700' : 'gray.700'}>
                      {category.title}
                    </Text>
                    <Text fontSize="sm" color={selectedCategory === category.id ? 'orange.600' : 'gray.500'} textAlign="center">
                      {category.description}
                    </Text>
                  </MotionCard>
                ))}
              </HStack>

              {/* Calculate Button */}
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 0 16px #f6ad55' }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ width: '100%', maxWidth: 400 }}
              >
                <Button
                  size="lg"
                  colorScheme="orange"
                  isDisabled={!monthlyBill || !selectedCategory}
                  height="48px"
                  fontSize="md"
                  borderRadius="lg"
                  boxShadow="md"
                  w="100%"
                  onClick={handleCalculate}
                >
                  Calculate Savings
                </Button>
              </motion.div>
            </VStack>
          </MotionBox>
        </Flex>

        {/* Solar Journey Steps Below Card */}
        <Box mt={10} mb={4} w="100%" display="flex" flexDirection="column" alignItems="center">
          <Heading size="md" color="gray.600" mb={6} fontWeight="extrabold" letterSpacing="tight">
            Your Solar Journey
          </Heading>
          <HStack spacing={0} w="100%" maxW="700px" justify="center" position="relative">
            {/* Step 1 */}
            <VStack spacing={2} flex={1} minW="180px" position="relative">
              <Text fontWeight="bold" color="gray.600" fontSize="sm" mb={1}>
                STEP 01
              </Text>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}>
                <Box bg="orange.400" color="white" borderRadius="full" boxSize="56px" display="flex" alignItems="center" justifyContent="center" fontSize="2xl" boxShadow="md">
                  <span role="img" aria-label="Calculator" style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧮</span>
                </Box>
              </motion.div>
              <Text color="gray.600" fontSize="md" textAlign="center">
                Give Your Values & Run the Calculator
              </Text>
            </VStack>
            {/* Arrow */}
            <Box flex={1} display="flex" alignItems="center" justifyContent="center" mx={-2} zIndex={0}>
              <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="12" x2="44" y2="12" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="44,6 48,12 44,18" fill="#CBD5E1" />
              </svg>
            </Box>
            {/* Step 2 */}
            <VStack spacing={2} flex={1} minW="180px" position="relative">
              <Text fontWeight="bold" color="gray.600" fontSize="sm" mb={1}>
                STEP 02
              </Text>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}>
                <Box bg="teal.400" color="white" borderRadius="full" boxSize="56px" display="flex" alignItems="center" justifyContent="center" fontSize="2xl" boxShadow="md">
                  <span role="img" aria-label="Survey" style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>📍</span>
                </Box>
              </motion.div>
              <Text color="gray.600" fontSize="md" textAlign="center">
                Schedule Your Site Survey
              </Text>
            </VStack>
            {/* Arrow */}
            <Box flex={1} display="flex" alignItems="center" justifyContent="center" mx={-2} zIndex={0}>
              <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="4" y1="12" x2="44" y2="12" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="4 4" />
                <polygon points="44,6 48,12 44,18" fill="#CBD5E1" />
              </svg>
            </Box>
            {/* Step 3 */}
            <VStack spacing={2} flex={1} minW="180px" position="relative">
              <Text fontWeight="bold" color="gray.600" fontSize="sm" mb={1}>
                STEP 03
              </Text>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}>
                <Box bg="yellow.400" color="white" borderRadius="full" boxSize="56px" display="flex" alignItems="center" justifyContent="center" fontSize="2xl" boxShadow="md">
                  <span role="img" aria-label="Solar" style={{ fontSize: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔆</span>
                </Box>
              </motion.div>
              <Text color="gray.600" fontSize="md" textAlign="center">
                Buy Solar and Reap Benefits
              </Text>
            </VStack>
          </HStack>
        </Box>

        {/* WhatsApp Button - Custom Icon */}
        <IconButton
          aria-label="Contact on WhatsApp"
          icon={<Image src="/WhatsApp Icon.jpeg" alt="WhatsApp" boxSize="28px" />}
          size="lg"
          bg="white"
          borderRadius="full"
          borderWidth={2}
          borderColor="#25D366"
          position="fixed"
          bottom="28px"
          right="32px"
          boxShadow="0 4px 16px #25D36633"
          onClick={handleWhatsAppClick}
          zIndex={999}
          _hover={{ bg: '#e6f9ef', transform: 'scale(1.08)' }}
          _active={{ bg: '#c6f6d5' }}
        />
      </Container>
    </Box>
  );
};

export default QuotationCalculator; 