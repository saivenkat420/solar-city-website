"use client";

import { Box, Image, Flex, Text } from '@chakra-ui/react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main" pt="60px">
        {children}
      </Box>
      <Box
        as="footer"
        py={{ base: 4, md: 8 }}
        bg="gray.50"
        borderTop="1px"
        borderColor="gray.200"
      >
        <Flex
          maxW="container.xl"
          mx="auto"
          px={{ base: 2, sm: 4, md: 8 }}
          direction={{ base: 'column', sm: 'row' }}
          align="center"
          justify="center"
          gap={2}
        >
          <Image src="/solarcity.svg" alt="Solar City Logo" height={{ base: '28px', sm: '36px' }} width="auto" mr={{ base: 0, sm: 2 }} mb={{ base: 2, sm: 0 }} />
          <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} color="gray.600" textAlign="center">
            © {new Date().getFullYear()} Solar City. All rights reserved.
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Layout; 