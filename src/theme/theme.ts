import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    solar: {
      50: '#fff8e1',
      100: '#ffecb3',
      200: '#ffe082',
      300: '#ffd54f',
      400: '#ffca28',
      500: '#ffc107', // Primary yellow
      600: '#ffb300',
      700: '#ffa000',
      800: '#ff8f00',
      900: '#ff6f00',
    },
    sky: {
      50: '#e3f2fd',
      100: '#bbdefb',
      200: '#90caf9',
      300: '#64b5f6',
      400: '#42a5f5',
      500: '#2196f3', // Primary blue
      600: '#1e88e5',
      700: '#1976d2',
      800: '#1565c0',
      900: '#0d47a1',
    },
  },
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'xl',
        _hover: {
          transform: 'translateY(-2px)',
          boxShadow: 'lg',
        },
        _active: {
          transform: 'translateY(0)',
        },
      },
      variants: {
        primary: {
          bg: 'linear-gradient(135deg, solar.500 0%, solar.600 100%)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(135deg, solar.600 0%, solar.700 100%)',
          },
        },
        secondary: {
          bg: 'linear-gradient(135deg, sky.500 0%, sky.600 100%)',
          color: 'white',
          _hover: {
            bg: 'linear-gradient(135deg, sky.600 0%, sky.700 100%)',
          },
        },
      },
    },
    Card: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          backdropFilter: 'blur(10px)',
          bg: 'whiteAlpha.800',
          boxShadow: 'lg',
          _hover: {
            transform: 'translateY(-4px)',
            boxShadow: 'xl',
          },
          transition: 'all 0.3s ease',
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
});

export default theme; 