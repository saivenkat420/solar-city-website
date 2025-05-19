import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
  },
  space: {
    section: { base: '3rem', md: '5rem', lg: '7rem' },
    element: { base: '1rem', md: '1.5rem', lg: '2rem' },
  },
  colors: {
    solar: {
      50: '#FFF7E5',
      100: '#FFE4B2',
      200: '#FFD180',
      300: '#FFBE4D',
      400: '#FFAB1A',
      500: '#FF9800',
      600: '#E68900',
      700: '#CC7A00',
      800: '#B36B00',
      900: '#995C00',
    },
    sky: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
  },
  components: {
    Heading: {
      baseStyle: {
        fontWeight: '700',
        letterSpacing: '-0.02em',
        lineHeight: '1.2',
      },
      sizes: {
        '2xl': {
          fontSize: { base: '2.5rem', md: '3.5rem', lg: '4rem' },
          lineHeight: { base: '1.2', md: '1.1' },
        },
        xl: {
          fontSize: { base: '2rem', md: '2.5rem', lg: '3rem' },
          lineHeight: '1.2',
        },
        lg: {
          fontSize: { base: '1.5rem', md: '2rem', lg: '2.25rem' },
          lineHeight: '1.3',
        },
        md: {
          fontSize: { base: '1.25rem', md: '1.5rem', lg: '1.75rem' },
          lineHeight: '1.4',
        },
      },
    },
    Text: {
      baseStyle: {
        fontSize: { base: 'md', md: 'lg' },
        lineHeight: '1.6',
      },
    },
    Container: {
      baseStyle: {
        maxW: { base: '100%', md: '90%', lg: '1200px' },
        px: { base: '1rem', md: '2rem', lg: '2.5rem' },
      },
    },
    Button: {
      baseStyle: {
        fontWeight: '600',
        borderRadius: 'full',
      },
      sizes: {
        lg: {
          fontSize: { base: 'md', md: 'lg' },
          px: { base: '6', md: '8' },
          py: { base: '4', md: '5' },
        },
        md: {
          fontSize: { base: 'sm', md: 'md' },
          px: { base: '5', md: '6' },
          py: { base: '3', md: '4' },
        },
      },
    },
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: '#1A1A1A',
      },
    },
  },
}); 