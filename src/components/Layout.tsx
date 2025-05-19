"use client";

import { Box, Image, Flex, Text, HStack } from '@chakra-ui/react';
import { memo } from 'react';
import dynamic from 'next/dynamic';
import JsonLd from './JsonLd';

// Dynamically import components with no SSR to avoid hydration issues
const Navbar = dynamic(() => import('./Navbar'), { ssr: true });
const InAppNotifications = dynamic(() => import('./InAppNotifications'), { ssr: false });

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = memo(({ children }: LayoutProps) => {
  const currentYear = new Date().getFullYear();
  
  return (
    <>
      <JsonLd type="Organization" />
      <JsonLd type="WebSite" />
      <JsonLd type="LocalBusiness" />
      <JsonLd type="BreadcrumbList" />
      
      <Box minH="100vh" as="div" role="presentation">
        <header>
          <Navbar />
          <Box 
            position="fixed" 
            top="60px" 
            right="20px" 
            zIndex="1000"
          >
            <InAppNotifications />
          </Box>
        </header>
        <Box as="main" pt="60px" role="main">
          {children}
        </Box>
        <Box
          as="footer"
          py={{ base: 4, md: 8 }}
          bg="gray.50"
          borderTop="1px"
          borderColor="gray.200"
          role="contentinfo"
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
            <Image 
              src="/solarcity.svg" 
              alt="Solar City Logo" 
              height={{ base: '28px', sm: '36px' }} 
              width="auto" 
              mr={{ base: 0, sm: 2 }} 
              mb={{ base: 2, sm: 0 }}
              loading="lazy" 
            />
            <Text fontSize={{ base: 'xs', sm: 'sm', md: 'md' }} color="gray.600" textAlign="center">
              © {currentYear} Solar City. All rights reserved.
            </Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
});

Layout.displayName = 'Layout';

export default Layout; 