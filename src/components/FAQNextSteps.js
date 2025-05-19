import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  List,
  ListItem,
  ListIcon,
  Divider,
  Badge,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCheckCircle, FaQuestionCircle, FaArrowRight, FaFileDownload, FaCalendarAlt, FaClock, FaUsers, FaSolarPanel, FaWrench } from 'react-icons/fa';
import Link from 'next/link';

// FAQ data
const faqs = [
  {
    question: "How long does the installation process take?",
    answer: "For residential systems (2-5kW), installation typically takes 2-3 days. Commercial installations (>10kW) may take 5-7 days depending on complexity. After installation, grid connection and inspection usually takes another 2-3 weeks."
  },
  {
    question: "What happens during power outages?",
    answer: "Grid-tied systems without batteries will shut down during power outages for safety reasons. If you opt for a battery backup system, you'll continue to have power for essential loads during outages."
  },
  {
    question: "How do I maintain my solar system?",
    answer: "Solar panels require minimal maintenance. Regular cleaning (every 2-3 months) to remove dust and debris is recommended. We offer Annual Maintenance Contracts (AMC) that include scheduled cleaning, system checks, and preventive maintenance."
  },
  {
    question: "What warranties do you offer?",
    answer: "Our solar panels come with a 25-year performance warranty. Inverters typically have 5-10 year warranties, and batteries 5-8 years depending on the model. We also offer optional extended warranties for complete peace of mind."
  },
  {
    question: "What about net metering?",
    answer: "We handle all paperwork and coordination with your local DISCOM to set up net metering. This allows you to sell excess power back to the grid, maximizing your savings. Net metering approval typically takes 3-4 weeks."
  },
  {
    question: "Are there any government subsidies available?",
    answer: "Yes, the Ministry of New and Renewable Energy (MNRE) offers subsidies for residential installations up to 10kW. Subsidy amounts vary from 20-40% depending on system size and location. Our team will help you apply for all eligible subsidies."
  }
];

// Next steps data
const nextSteps = [
  {
    title: "Free Site Survey & Assessment",
    description: "Our engineer will visit your location to assess roof space, shade analysis, and optimal system design",
    icon: FaUsers,
    timeline: "Within 48 hours of request",
    highlight: true
  },
  {
    title: "Detailed Quotation",
    description: "Receive a customized proposal with detailed component specifications, costs, and savings analysis",
    icon: FaFileDownload,
    timeline: "1-2 days after site survey"
  },
  {
    title: "Order & Installation",
    description: "Once approved, we'll order components and schedule the installation at your convenience",
    icon: FaSolarPanel,
    timeline: "7-14 days from agreement"
  },
  {
    title: "Grid Connection & Commissioning",
    description: "We'll handle all paperwork for net metering and commission your system for operation",
    icon: FaWrench,
    timeline: "2-3 weeks after installation"
  }
];

export default function FAQNextSteps() {
  const cardBg = useColorModeValue('white', 'gray.800');
  const nextStepBg = useColorModeValue('gray.50', 'gray.700');
  const highlightBg = useColorModeValue('orange.50', 'orange.900');
  const highlightBorder = useColorModeValue('orange.300', 'orange.600');
  
  return (
    <Box p={4} bg={cardBg} rounded="md" boxShadow="sm" w="100%">
      <HStack justify="space-between" align="center" mb={4}>
        <Text fontWeight="bold" fontSize="lg" color="purple.500">
          FAQs & Next Steps
        </Text>
        <Button 
          size="sm" 
          rightIcon={<Icon as={FaArrowRight} />} 
          colorScheme="purple" 
          variant="outline"
        >
          Contact Us
        </Button>
      </HStack>
      <Text fontSize="sm" color="gray.500" mb={6}>
        Common questions and what to expect in your solar journey
      </Text>
      
      {/* Two-column layout on larger screens */}
      <Box 
        display={{ base: 'block', lg: 'flex' }} 
        gap={8}
      >
        {/* FAQs Section - Left Column */}
        <Box flex="1" mb={{ base: 6, lg: 0 }}>
          <HStack mb={3}>
            <Icon as={FaQuestionCircle} color="purple.400" />
            <Text fontWeight="bold" fontSize="md">
              Frequently Asked Questions
            </Text>
          </HStack>
          
          <Accordion allowToggle>
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} border="1px solid" borderColor="gray.200" mb={2} borderRadius="md">
                <h2>
                  <AccordionButton py={3} _expanded={{ bg: 'purple.50', color: 'purple.700' }}>
                    <Box flex="1" textAlign="left" fontWeight="medium">
                      {faq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize="sm" color="gray.600">
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
        
        {/* Next Steps Section - Right Column */}
        <Box flex="1">
          <HStack mb={3}>
            <Icon as={FaCheckCircle} color="green.400" />
            <Text fontWeight="bold" fontSize="md">
              Your Solar Journey: Next Steps
            </Text>
          </HStack>
          
          <VStack spacing={4} align="stretch">
            {nextSteps.map((step, idx) => (
              <Box 
                key={idx} 
                p={4} 
                bg={step.highlight ? highlightBg : nextStepBg} 
                borderRadius="md"
                borderWidth={step.highlight ? 1 : 0}
                borderColor={step.highlight ? highlightBorder : 'transparent'}
                position="relative"
              >
                {step.highlight && (
                  <Badge 
                    position="absolute" 
                    top={-2} 
                    right={3} 
                    colorScheme="orange"
                    px={2}
                  >
                    First Step
                  </Badge>
                )}
                
                <HStack spacing={3} mb={2}>
                  <Icon as={step.icon} color={step.highlight ? "orange.500" : "green.500"} boxSize={5} />
                  <Text fontWeight="bold" fontSize="md">
                    {step.title}
                  </Text>
                </HStack>
                
                <Text fontSize="sm" color="gray.600" ml={8}>
                  {step.description}
                </Text>
                
                <HStack spacing={1} mt={2} ml={8}>
                  <Icon as={FaClock} color="gray.400" boxSize={3} />
                  <Text fontSize="xs" color="gray.500">
                    Timeline: {step.timeline}
                  </Text>
                </HStack>
              </Box>
            ))}
            
            <Box p={4} textAlign="center">
              <Button 
                as={Link}
                href="/contact"
                colorScheme="green" 
                size="md" 
                leftIcon={<Icon as={FaCalendarAlt} />}
                variant="solid"
                shadow="md"
                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
              >
                Schedule Your Free Site Survey
              </Button>
              <Text fontSize="xs" color="gray.500" mt={2}>
                No obligation • Free detailed assessment
              </Text>
            </Box>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
} 