import React, { useState, useEffect } from 'react';
import { Box, Button, Icon, Text, Flex } from '@chakra-ui/react';
import { FaChevronDown } from 'react-icons/fa';

export default function ScrollInsightButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Function to check if user has scrolled to bottom
    const handleScroll = () => {
      // Calculate if we're near the bottom of the page
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
      
      // Use a threshold of 20px from bottom
      const isBottom = scrollTop + clientHeight >= scrollHeight - 20;
      
      // Update visibility state
      setIsVisible(!isBottom);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Call once to set initial state
    handleScroll();
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Scroll to next section when clicked
  const handleClick = () => {
    window.scrollBy({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <Box
      position="fixed"
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      zIndex={10}
      animation="fadeIn 0.3s ease-in-out"
      sx={{
        '@keyframes fadeIn': {
          '0%': { opacity: 0, transform: 'translate(-50%, 20px)' },
          '100%': { opacity: 1, transform: 'translate(-50%, 0)' }
        }
      }}
    >
      <Button
        onClick={handleClick}
        bg="orange.500"
        color="white"
        _hover={{ bg: 'orange.600' }}
        borderRadius="full"
        px={6}
        py={6}
        boxShadow="lg"
      >
        <Flex align="center">
          <Text mr={2}>See More Insights</Text>
          <Icon as={FaChevronDown} />
        </Flex>
      </Button>
    </Box>
  );
} 