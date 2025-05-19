"use client";

import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Input,
  Select,
  VStack,
  HStack,
  useColorModeValue,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Flex,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { allInverters } from '../data/inverters';
import {
  loom_solar_products,
  adani_solar_products,
  tata_solar_products,
  waaree_solar_products,
} from '../data/solarProducts';
import { allBatteries } from '../data/batteries';
import { mountingSystems } from '../data/mountingSystems';

const MotionCard = motion(Card);
const MotionBox = motion(Box);
const MotionImage = motion(Image);

// Combined products data
const allSolarPanels = [
  ...loom_solar_products,
  ...adani_solar_products,
  ...tata_solar_products,
  ...waaree_solar_products,
];

const PRODUCT_IMAGES = {
  'solar-panels': '/images/products/solar-panel-img.jpg',
  'inverters': '/images/products/solar-inverter-img.jpg',
  'batteries': '/images/products/solar-battery-img.jpg',
  'mounting-systems': '/images/products/solar-mounting-system-img.jpg'
};

interface ProductDisplayProps {
  productType: 'solar-panels' | 'inverters' | 'batteries' | 'mounting-systems';
}

const hoverTransition = {
  duration: 0.3,
  ease: "easeOut"
};

const cardVariants = {
  hover: {
    y: -8,
    transition: hoverTransition
  }
};

const imageVariants = {
  hover: {
    scale: 1.05,
    transition: hoverTransition
  }
};

export default function ProductDisplay({ productType }: ProductDisplayProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter1, setSelectedFilter1] = useState('');
  const [selectedFilter2, setSelectedFilter2] = useState('');
  const [selectedFilter3, setSelectedFilter3] = useState('');

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const cardBg = useColorModeValue('white', 'gray.700');
  const textColor = useColorModeValue('gray.600', 'gray.300');

  // Define filters based on product type
  const getFilters = () => {
    if (productType === 'solar-panels') {
      return {
        title: 'Solar Panels',
        subtitle: 'Explore our wide range of high-quality solar panels from leading manufacturers',
        filter1: {
          name: 'Company',
          options: [...new Set(allSolarPanels.map(p => p.Company))],
        },
        filter2: {
          name: 'Technology',
          options: [...new Set(allSolarPanels.map(p => p.Technology))],
        },
        filter3: {
          name: 'Application',
          options: [...new Set(allSolarPanels.map(p => p.Application))],
        },
      };
    } else if (productType === 'inverters') {
      return {
        title: 'Solar Inverters',
        subtitle: 'Browse our selection of high-quality solar inverters from trusted manufacturers',
        filter1: {
          name: 'Brand',
          options: [...new Set(allInverters.map(p => p.brand))],
        },
        filter2: {
          name: 'Technology',
          options: [...new Set(allInverters.map(p => p.technology))],
        },
        filter3: {
          name: 'Application',
          options: [...new Set(allInverters.map(p => p.application))],
        },
      };
    } else if (productType === 'batteries') {
      return {
        title: 'Solar Batteries',
        subtitle: 'Discover our range of reliable solar batteries for your energy storage needs',
        filter1: {
          name: 'Brand',
          options: [...new Set(allBatteries.map(p => p.brand))],
        },
        filter2: {
          name: 'Technology',
          options: [...new Set(allBatteries.map(p => p.technology))],
        },
        filter3: {
          name: 'Application',
          options: [...new Set(allBatteries.map(p => p.application))],
        },
      };
    } else {
      return {
        title: 'Mounting Systems',
        subtitle: 'Explore our range of solar panel mounting solutions for various applications',
        filter1: {
          name: 'Brand',
          options: [...new Set(mountingSystems.map(p => p.brand))],
        },
        filter2: {
          name: 'Material',
          options: [...new Set(mountingSystems.map(p => p.material))],
        },
        filter3: {
          name: 'Application',
          options: [...new Set(mountingSystems.flatMap(p => p.applications))],
        },
      };
    }
  };

  const filters = getFilters();

  // Filter products based on type and search criteria
  const getFilteredProducts = () => {
    if (productType === 'solar-panels') {
      return allSolarPanels.filter(product => {
        const matchesSearch = 
          product['Product Name'].toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.Wattage.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter1 = !selectedFilter1 || product.Company === selectedFilter1;
        const matchesFilter2 = !selectedFilter2 || product.Technology === selectedFilter2;
        const matchesFilter3 = !selectedFilter3 || product.Application === selectedFilter3;

        return matchesSearch && matchesFilter1 && matchesFilter2 && matchesFilter3;
      });
    } else if (productType === 'inverters') {
      return allInverters.filter(inverter => {
        const matchesSearch = 
          inverter.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inverter.capacity.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter1 = !selectedFilter1 || inverter.brand === selectedFilter1;
        const matchesFilter2 = !selectedFilter2 || inverter.technology === selectedFilter2;
        const matchesFilter3 = !selectedFilter3 || inverter.application === selectedFilter3;

        return matchesSearch && matchesFilter1 && matchesFilter2 && matchesFilter3;
      });
    } else if (productType === 'batteries') {
      return allBatteries.filter(battery => {
        const matchesSearch = 
          battery.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          battery.capacity.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter1 = !selectedFilter1 || battery.brand === selectedFilter1;
        const matchesFilter2 = !selectedFilter2 || battery.technology === selectedFilter2;
        const matchesFilter3 = !selectedFilter3 || battery.application === selectedFilter3;

        return matchesSearch && matchesFilter1 && matchesFilter2 && matchesFilter3;
      });
    } else {
      return mountingSystems.filter(system => {
        const matchesSearch = 
          system.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
          system.productTypes.some(type => type.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesFilter1 = !selectedFilter1 || system.brand === selectedFilter1;
        const matchesFilter2 = !selectedFilter2 || system.material === selectedFilter2;
        const matchesFilter3 = !selectedFilter3 || system.applications.includes(selectedFilter3);

        return matchesSearch && matchesFilter1 && matchesFilter2 && matchesFilter3;
      });
    }
  };

  const filteredProducts = getFilteredProducts();

  const renderProductCard = (product: any, index: number) => {
    const commonCardProps = {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      whileHover: "hover",
      variants: cardVariants,
      transition: { duration: 0.3, delay: index * 0.1 },
      bg: cardBg,
      borderRadius: "xl",
      overflow: "hidden",
      boxShadow: "lg",
      border: "1px solid",
      borderColor: borderColor,
      position: "relative",
      _before: {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        bgGradient: "linear(to-r, solar.400, sky.400)",
        borderTopRadius: "xl"
      }
    };

    const commonImageProps = {
      height: "200px",
      width: "100%",
      objectFit: "cover",
      variants: imageVariants
    };

    if (productType === 'solar-panels') {
      return (
        <MotionCard {...commonCardProps}>
          <Box position="relative" overflow="hidden">
            <MotionImage
              src={PRODUCT_IMAGES['solar-panels']}
              alt={product['Product Name']}
              fallbackSrc={PRODUCT_IMAGES['solar-panels']}
              {...commonImageProps}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(to-b, transparent 50%, rgba(0,0,0,0.2))"
            />
          </Box>
          <CardHeader pb={2}>
            <Flex justify="space-between" align="center">
              <Badge
                colorScheme="solar"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
              >
                {product.Company}
              </Badge>
              <Badge
                colorScheme="sky"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
              >
                {product.Wattage}
              </Badge>
            </Flex>
          </CardHeader>
          <CardBody pt={0} px={6} pb={6}>
            <VStack align="start" spacing={3}>
              <Heading size="md" fontWeight="bold" lineHeight="tight">
                {product['Product Name']}
              </Heading>
              <Box bg={useColorModeValue('gray.50', 'gray.700')} p={3} borderRadius="md" width="100%">
                <VStack align="start" spacing={2}>
                  <Text color={textColor} fontSize="sm">
                    <Text as="span" fontWeight="medium">Technology:</Text> {product.Technology}
                  </Text>
                  <Text color={textColor} fontSize="sm">
                    <Text as="span" fontWeight="medium">Application:</Text> {product.Application}
                  </Text>
                  {product.Warranty && (
                    <Text color={textColor} fontSize="sm">
                      <Text as="span" fontWeight="medium">Warranty:</Text> {product.Warranty}
                    </Text>
                  )}
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </MotionCard>
      );
    } else if (productType === 'inverters') {
      return (
        <MotionCard {...commonCardProps}>
          <Box position="relative" overflow="hidden">
            <MotionImage
              src={PRODUCT_IMAGES['inverters']}
              alt={product.modelName}
              fallbackSrc={PRODUCT_IMAGES['inverters']}
              {...commonImageProps}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(to-b, transparent 50%, rgba(0,0,0,0.2))"
            />
          </Box>
          <CardHeader pb={2}>
            <Flex justify="space-between" align="center">
              <Badge
                colorScheme="solar"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
              >
                {product.brand}
              </Badge>
              <Badge
                colorScheme="sky"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
              >
                {product.capacity}
              </Badge>
            </Flex>
          </CardHeader>
          <CardBody pt={0} px={6} pb={6}>
            <VStack align="start" spacing={3}>
              <Heading size="md" fontWeight="bold" lineHeight="tight">
                {product.modelName}
              </Heading>
              <Box bg={useColorModeValue('gray.50', 'gray.700')} p={3} borderRadius="md" width="100%">
                <VStack align="start" spacing={2}>
                  <Text color={textColor} fontSize="sm">
                    <Text as="span" fontWeight="medium">Technology:</Text> {product.technology}
                  </Text>
                  <Text color={textColor} fontSize="sm">
                    <Text as="span" fontWeight="medium">Application:</Text> {product.application}
                  </Text>
                  <Text color={textColor} fontSize="sm">
                    <Text as="span" fontWeight="medium">Warranty:</Text> {product.warranty}
                  </Text>
                </VStack>
              </Box>
              {product.features && (
                <Box width="100%">
                  <Text color={textColor} fontSize="sm" fontWeight="medium" mb={2}>
                    Key Features:
                  </Text>
                  <VStack align="start" spacing={1}>
                    {product.features.map((feature: string, i: number) => (
                      <Text key={i} color={textColor} fontSize="sm" display="flex" alignItems="center">
                        <Box as="span" color="solar.500" mr={2}>•</Box>
                        {feature}
                      </Text>
                    ))}
                  </VStack>
                </Box>
              )}
            </VStack>
          </CardBody>
        </MotionCard>
      );
    } else if (productType === 'batteries') {
      return (
        <MotionCard {...commonCardProps}>
          <Box position="relative" overflow="hidden">
            <MotionImage
              src={PRODUCT_IMAGES['batteries']}
              alt={product.modelName}
              fallbackSrc={PRODUCT_IMAGES['batteries']}
              {...commonImageProps}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(to-b, transparent 50%, rgba(0,0,0,0.2))"
            />
          </Box>
          <CardHeader pb={2}>
            <Flex justify="space-between" align="center">
              <Badge
                colorScheme="solar"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
              >
                {product.brand}
              </Badge>
              <Badge
                colorScheme="sky"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
              >
                {product.capacity}
              </Badge>
            </Flex>
          </CardHeader>
          <CardBody pt={0} px={6} pb={6}>
            <VStack align="start" spacing={3}>
              <Heading size="md" fontWeight="bold" lineHeight="tight">
                {product.modelName}
              </Heading>
              <Box bg={useColorModeValue('gray.50', 'gray.700')} p={3} borderRadius="md" width="100%">
                <VStack align="start" spacing={2}>
                  <Text color={textColor} fontSize="sm">
                    <Text as="span" fontWeight="medium">Technology:</Text> {product.technology}
                  </Text>
                  <Text color={textColor} fontSize="sm">
                    <Text as="span" fontWeight="medium">Application:</Text> {product.application}
                  </Text>
                  <Text color={textColor} fontSize="sm">
                    <Text as="span" fontWeight="medium">Warranty:</Text> {product.warranty}
                  </Text>
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </MotionCard>
      );
    } else {
      return (
        <MotionCard {...commonCardProps}>
          <Box position="relative" overflow="hidden">
            <MotionImage
              src={PRODUCT_IMAGES['mounting-systems']}
              alt={product.brand}
              fallbackSrc={PRODUCT_IMAGES['mounting-systems']}
              {...commonImageProps}
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear(to-b, transparent 50%, rgba(0,0,0,0.2))"
            />
          </Box>
          <CardHeader pb={2}>
            <Flex justify="space-between" align="center">
              <Badge
                colorScheme="solar"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
              >
                {product.brand}
              </Badge>
              <Badge
                colorScheme="sky"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
                boxShadow="sm"
              >
                {product.material}
              </Badge>
            </Flex>
          </CardHeader>
          <CardBody pt={0} px={6} pb={6}>
            <VStack align="start" spacing={3}>
              <Box width="100%">
                <Text color={textColor} fontSize="sm" fontWeight="medium" mb={1}>
                  Product Types:
                </Text>
                <Flex wrap="wrap" gap={2}>
                  {product.productTypes.map((type: string, i: number) => (
                    <Badge
                      key={i}
                      colorScheme="gray"
                      fontSize="xs"
                      px={2}
                      py={1}
                      borderRadius="md"
                    >
                      {type}
                    </Badge>
                  ))}
                </Flex>
              </Box>
              <Box bg={useColorModeValue('gray.50', 'gray.700')} p={3} borderRadius="md" width="100%">
                <VStack align="start" spacing={2}>
                  <Text color={textColor} fontSize="sm">
                    <Text as="span" fontWeight="medium">Applications:</Text>
                    <br />
                    {product.applications.join(', ')}
                  </Text>
                  <Box>
                    <Text color={textColor} fontSize="sm" fontWeight="medium">
                      Features:
                    </Text>
                    <VStack align="start" spacing={1} mt={1}>
                      {product.features.map((feature: string, i: number) => (
                        <Text key={i} color={textColor} fontSize="sm" display="flex" alignItems="center">
                          <Box as="span" color="solar.500" mr={2}>•</Box>
                          {feature}
                        </Text>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </Box>
              {product.website && (
                <Text
                  color="solar.500"
                  fontSize="sm"
                  fontWeight="medium"
                  cursor="pointer"
                  _hover={{ textDecoration: 'underline' }}
                >
                  Visit Website →
                </Text>
              )}
            </VStack>
          </CardBody>
        </MotionCard>
      );
    }
  };

  return (
    <Box as="section" py={8} bg={useColorModeValue('gray.50', 'gray.900')}>
      <Container maxW="container.xl">
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading
              as="h2"
              size="lg"
              mb={2}
              bgGradient="linear(to-r, solar.500, sky.500)"
              bgClip="text"
              fontWeight="bold"
            >
              {filters.title}
            </Heading>
            <Text color={textColor} fontSize="md">
              {filters.subtitle}
            </Text>
          </Box>

          {/* Filters */}
          <Box
            p={4}
            bg={bgColor}
            borderRadius="lg"
            boxShadow="md"
            border="1px solid"
            borderColor={borderColor}
          >
            <SimpleGrid columns={{ base: 1, md: 4 }} spacing={3}>
              <Input
                placeholder={`Search ${productType}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="md"
              />
              <Select
                placeholder={`Select ${filters.filter1.name}`}
                value={selectedFilter1}
                onChange={(e) => setSelectedFilter1(e.target.value)}
                size="md"
              >
                {filters.filter1.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              <Select
                placeholder={`Select ${filters.filter2.name}`}
                value={selectedFilter2}
                onChange={(e) => setSelectedFilter2(e.target.value)}
                size="md"
              >
                {filters.filter2.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
              <Select
                placeholder={`Select ${filters.filter3.name}`}
                value={selectedFilter3}
                onChange={(e) => setSelectedFilter3(e.target.value)}
                size="md"
              >
                {filters.filter3.options.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </Select>
            </SimpleGrid>
          </Box>

          {/* Products Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
            {filteredProducts.map((product, index) => renderProductCard(product, index))}
          </SimpleGrid>

          {filteredProducts.length === 0 && (
            <Box textAlign="center" py={8}>
              <Text color={textColor} fontSize="md">
                No products found matching your criteria
              </Text>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
} 