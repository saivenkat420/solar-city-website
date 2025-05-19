"use client";

import { Button, ButtonProps } from '@chakra-ui/react';

interface SubmitButtonProps extends ButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
}

const SubmitButton = ({ children, isLoading = false, ...props }: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      bg="orange.500"
      color="white"
      size="lg"
      height="60px"
      fontWeight="bold"
      width="100%"
      fontSize="md"
      py={6}
      px={8}
      my={4}
      isLoading={isLoading}
      loadingText="Sending..."
      borderRadius="md"
      boxShadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
      _hover={{
        bg: "orange.600",
        transform: 'translateY(-2px)',
        boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
      }}
      _active={{
        bg: "orange.700",
        transform: 'translateY(0)',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default SubmitButton; 