"use client";

import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import PrimaryButton from './PrimaryButton';

const MotionBox = motion(Box);

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const Hero = ({ title, subtitle, ctaText, ctaLink }: HeroProps) => {
  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      overflow="hidden"
      bg="linear-gradient(135deg, sky.500 0%, solar.500 100%)"
    >
      {/* Animated Sun Rays */}
      <MotionBox
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="600px"
        height="600px"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {[...Array(12)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            top="50%"
            left="50%"
            width="4px"
            height="200px"
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

      {/* Glassmorphic Overlay */}
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="blackAlpha.200"
        backdropFilter="blur(8px)"
      />

      {/* Content */}
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <VStack
          spacing={8}
          align="center"
          textAlign="center"
          color="white"
        >
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading
              as="h1"
              size="2xl"
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
              fontSize="xl"
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
          >
            <PrimaryButton
              as="a"
              href={ctaLink}
              size="lg"
              variant="primary"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
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