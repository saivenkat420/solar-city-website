"use client";

import { useState, useRef } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  useColorModeValue,
  Badge,
  Icon,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';
import ProductDisplay from './ProductDisplay';
import { Product, products, STOCK_IMAGE } from '../data/catalogue';

const MotionBox = motion(Box);

export const Catalogue = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBorderColor = useColorModeValue('solar.500', 'solar.400');
  const shadowColor = useColorModeValue('rgba(0, 0, 0, 0.1)', 'rgba(255, 255, 255, 0.1)');

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: currentScroll + (direction === 'left' ? -scrollAmount : scrollAmount),
        behavior: 'smooth'
      });
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };

  return (
    <Box py={10} bg={bg} id="catalogue">
      <Container maxW="container.xl">
        <VStack spacing={8}>
          <Heading
            as="h2"
            size="xl"
            textAlign="center"
            bgGradient="linear(to-r, solar.500, sky.500)"
            bgClip="text"
          >
            Solar Solutions
          </Heading>
          <Text
            textAlign="center"
            maxW="2xl"
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
          >
            We partner with India's leading solar manufacturers to bring you the best quality products at competitive prices. All our solutions come with comprehensive warranties and expert installation.
          </Text>

          <Box position="relative" width="100%" px={{ base: 2, md: 6 }}>
            <IconButton
              aria-label="Scroll left"
              icon={<ChevronLeftIcon />}
              position="absolute"
              left={{ base: -2, md: -4 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              onClick={() => handleScroll('left')}
              display={{ base: 'none', md: 'flex' }}
              size="lg"
              colorScheme="solar"
              variant="ghost"
              _hover={{ bg: 'solar.50' }}
            />

            <Box
              ref={scrollContainerRef}
              overflowX="auto"
              overflowY="hidden"
              whiteSpace="nowrap"
              scrollBehavior="smooth"
              css={{
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
                scrollbarWidth: 'none',
              }}
              py={6}
            >
              <HStack spacing={6} display="inline-flex" pb={4}>
                {products.map((product) => (
                  <MotionBox
                    key={product.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    cursor="pointer"
                    onClick={() => handleProductClick(product)}
                    minW={{ base: '260px', sm: '300px' }}
                    maxW={{ base: '260px', sm: '300px' }}
                    height="fit-content"
                    bg={useColorModeValue('white', 'gray.800')}
                    borderRadius="2xl"
                    overflow="hidden"
                    border="1px solid"
                    borderColor={hoveredCard === product.id ? hoverBorderColor : borderColor}
                    boxShadow={hoveredCard === product.id 
                      ? `0 12px 28px ${shadowColor}`
                      : `0 4px 12px ${shadowColor}`}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    onMouseEnter={() => setHoveredCard(product.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View ${product.name} details`}
                  >
                    <Box position="relative" height="160px">
                      <Image
                        src={product.image}
                        alt={product.name}
                        height="100%"
                        width="100%"
                        objectFit="cover"
                        fallbackSrc={STOCK_IMAGE}
                        style={{
                          transition: 'transform 0.3s ease-in-out'
                        }}
                        _groupHover={{ transform: 'scale(1.05)' }}
                      />
                      <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        bg="linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 100%)"
                      />
                    </Box>
                    <VStack p={4} align="start" spacing={3} width="100%">
                      <HStack justify="space-between" width="100%">
                        <Badge
                          colorScheme="solar"
                          fontSize="xs"
                          px={2}
                          py={1}
                          borderRadius="full"
                        >
                          {product.category}
                        </Badge>
                        <Icon
                          as={ChevronRightIcon}
                          w={5}
                          h={5}
                          color={hoveredCard === product.id ? 'solar.500' : 'gray.400'}
                          style={{
                            transition: 'all 0.3s ease',
                            transform: hoveredCard === product.id ? 'translateX(4px)' : 'none'
                          }}
                        />
                      </HStack>
                      <Heading
                        size="md"
                        fontWeight="semibold"
                        color={useColorModeValue('gray.800', 'white')}
                      >
                        {product.name}
                      </Heading>
                      <Text
                        fontSize="sm"
                        color={useColorModeValue('gray.600', 'gray.300')}
                        whiteSpace="normal"
                      >
                        {product.description}
                      </Text>
                    </VStack>
                  </MotionBox>
                ))}
              </HStack>
            </Box>

            <IconButton
              aria-label="Scroll right"
              icon={<ChevronRightIcon />}
              position="absolute"
              right={{ base: -2, md: -4 }}
              top="50%"
              transform="translateY(-50%)"
              zIndex={2}
              onClick={() => handleScroll('right')}
              display={{ base: 'none', md: 'flex' }}
              size="lg"
              colorScheme="solar"
              variant="ghost"
              _hover={{ bg: 'solar.50' }}
            />
          </Box>
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="5xl" motionPreset="slideInBottom">
        <ModalOverlay backdropFilter="blur(10px) brightness(0.8)" />
        <ModalContent borderRadius="2xl" boxShadow="2xl" overflow="hidden" maxW="5xl" bg={useColorModeValue('white', 'gray.800')}>
          <Box bgGradient="linear(to-r, solar.500, sky.500)" h="8px" w="100%" />
          <ModalHeader pt={6} pb={2} fontWeight="bold" fontSize={{ base: '2xl', md: '2xl', lg: '2xl' }} textAlign="center">
            {selectedProduct?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10} px={{ base: 4, md: 10 }}>
            {selectedProduct?.name === 'Solar Panels' ? (
              <ProductDisplay productType="solar-panels" />
            ) : selectedProduct?.name === 'Inverters' ? (
              <ProductDisplay productType="inverters" />
            ) : selectedProduct?.name === 'Battery Storage' ? (
              <ProductDisplay productType="batteries" />
            ) : selectedProduct?.name === 'Mounting Systems' ? (
              <ProductDisplay productType="mounting-systems" />
            ) : (
              <Text textAlign="center" color="gray.500">
                Coming soon...
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}; 