"use client";

import { Box } from '@chakra-ui/react';
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
        py={8}
        bg="gray.50"
        borderTop="1px"
        borderColor="gray.200"
      >
        <Box
          maxW="container.xl"
          mx="auto"
          px={4}
          textAlign="center"
          color="gray.600"
        >
          © {new Date().getFullYear()} Solar City. All rights reserved.
        </Box>
      </Box>
    </Box>
  );
};

export default Layout; 