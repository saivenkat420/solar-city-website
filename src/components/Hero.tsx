"use client";

import { Box, Container, Heading, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PrimaryButton from './PrimaryButton';
import './hero-glow.css';

const MotionBox = motion(Box);

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const Hero = ({ title, subtitle, ctaText, ctaLink }: HeroProps) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl' });
  const subtitleSize = useBreakpointValue({ base: 'lg', md: 'xl' });
  const bgImage = useBreakpointValue({
    base: "/solar-city-hero-page-sm-img.jpg",
    sm: "/solar-city-hero-page-sm-img.jpg",
    md: "/solar-city-hero-page-md-img.jpg",
    lg: "/solar-city-hero-page-md-img.jpg",
    xl: "/solar-city-hero-page-md-img.jpg",
  });

  return (
    <Box
      position="relative"
      minH={{ base: '80vh', md: '100vh' }}
      display="flex"
      alignItems="center"
      overflow="hidden"
      bgImage={`url('${bgImage}')`}
      bgSize="cover"
      bgPosition="center"
      role="banner"
      aria-label="Hero section"
    >
      {/* Overlay for readability */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="rgba(0,0,0,0.45)"
        zIndex={0}
        aria-hidden="true"
      />

      {/* Animated Sun Rays */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width={{ base: '400px', md: '600px' }}
        height={{ base: '400px', md: '600px' }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        aria-hidden="true"
      >
        {[...Array(12)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            top="50%"
            left="50%"
            width="4px"
            height={{ base: '150px', md: '200px' }}
            bg="whiteAlpha.600"
            transform={`translate(-50%, -50%) rotate(${i * 30}deg)`}
            transformOrigin="bottom"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </MotionBox>

      {/* Content */}
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack
          spacing={{ base: 6, md: 8 }}
          align="center"
          textAlign="center"
          color="white"
          px={{ base: 4, md: 0 }}
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              as="h1"
              size={headingSize}
              fontWeight="bold"
              textShadow="2px 2px 4px rgba(0,0,0,0.2)"
            >
              {title}
            </Heading>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Text
              fontSize={subtitleSize}
              maxW="2xl"
              textShadow="1px 1px 2px rgba(0,0,0,0.2)"
            >
              {subtitle}
            </Text>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            width={{ base: '100%', md: 'auto' }}
            display="flex"
            justifyContent="center"
          >
            <PrimaryButton
              as="a"
              href={ctaLink}
              size={isMobile ? 'md' : 'lg'}
              variant="primary"
              width={{ base: '100%', md: 'auto' }}
              px={{ base: 6, md: 8 }}
              py={{ base: 4, md: 5 }}
              fontWeight="bold"
              fontSize={{ base: 'md', md: 'xl' }}
              boxShadow="0 0 12px 2px rgba(255, 193, 7, 0.25), 0 2px 8px rgba(0,0,0,0.10)"
              bgGradient="linear(to-r, solar.500, sky.500)"
              _hover={{
                bgGradient: 'linear(to-r, sky.500, solar.500)',
                boxShadow: '0 0 20px 6px rgba(255, 193, 7, 0.35), 0 4px 16px rgba(0,0,0,0.15)',
                transform: 'scale(1.04)',
                color: 'white',
              }}
              className="hero-glow hero-glow--medium"
              aria-label={ctaText}
            >
              {ctaText}
            </PrimaryButton>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
};

export default Hero; 