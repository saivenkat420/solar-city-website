"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import PrimaryButton from './PrimaryButton';
import { usePathname } from 'next/navigation';
import NextLink from 'next/link';

const MotionBox = motion(Box);

interface NavItem {
  label: string;
  href: string;
  children?: Array<NavItem>;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'About',
    href: '/#about',
  },
  {
    label: 'Services',
    href: '/#services',
  },
  {
    label: 'Quotation',
    href: '/quotation',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

// Debounce function to optimize scroll event handling
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string>('');

  const handleScroll = useCallback(debounce(() => {
    const services = document.getElementById('services');
    const about = document.getElementById('about');
    const scrollY = window.scrollY + 100; // offset for navbar
    let section = '';
    if (about && scrollY >= about.offsetTop) {
      section = '/#about';
    } else if (services && scrollY >= services.offsetTop) {
      section = '/#services';
    } else {
      section = '/';
    }
    setActiveSection(section);
  }, 100), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Box
      boxShadow="0 4px 24px rgba(0,0,0,0.08)"
      bg="rgba(255,255,255,0.85)"
      style={{ backdropFilter: 'blur(12px)' }}
      position="fixed"
      width="100%"
      zIndex={1000}
    >
      <Flex
        color={useColorModeValue('gray.600', 'white')}
        minH={{ base: '44px', md: '54px', lg: '64px' }}
        py={{ base: 0, md: 1 }}
        px={{ base: 2, sm: 4, md: 8 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        maxW="container.xl"
        mx="auto"
        gap={{ base: 2, md: 0 }}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          align="center"
          height={{ base: '38px', sm: '44px', md: '64px' }}
          minW={{ base: '100px', sm: '120px', md: '160px' }}
          justify={{ base: 'center', md: 'flex-start' }}
        >
          <Link
            as={NextLink}
            href="/"
            _hover={{ textDecoration: 'none' }}
            display="flex"
            alignItems="center"
            height="100%"
          >
            <Image 
              src="/solarcity.svg" 
              alt="Solar City Logo" 
              height="100%" 
              width="auto" 
              maxH={{ base: '38px', sm: '44px', md: '64px' }} 
              maxW={{ base: '100px', sm: '120px', md: '240px' }} 
              objectFit="contain"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.05)' }}
              loading="eager"
              fallbackSrc="https://via.placeholder.com/240x64?text=Solar+City"
            />
          </Link>
        </Flex>

        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10} align="center">
            <DesktopNav pathname={pathname} activeSection={activeSection} />
          </Flex>
        </Flex>

        <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6} align="center">
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
            display={{ md: 'none' }}
          />
        </Stack>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav pathname={pathname} activeSection={activeSection} />
      </Collapse>
    </Box>
  );
}

function DesktopNav({ pathname, activeSection }: { pathname: string, activeSection: string }) {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const activeColor = useColorModeValue('solar.500', 'sky.500');

  return (
    <Stack direction={'row'} spacing={4} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Link
          as={navItem.href.startsWith('/#') ? NextLink : undefined}
          key={navItem.label}
          p={2}
          href={navItem.href ?? '#'}
          fontSize={'md'}
          fontWeight={
            (pathname === navItem.href || activeSection === navItem.href) ? 700 : 500
          }
          color={
            (pathname === navItem.href || activeSection === navItem.href)
              ? activeColor
              : linkColor
          }
          borderBottom={
            (pathname === navItem.href || activeSection === navItem.href)
              ? '2px solid'
              : 'none'
          }
          borderColor={
            (pathname === navItem.href || activeSection === navItem.href)
              ? activeColor
              : 'transparent'
          }
          _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
          }}
          scroll={navItem.href.startsWith('/#') ? true : undefined}
          prefetch={false}
        >
          {navItem.label}
        </Link>
      ))}
    </Stack>
  );
}

function MobileNav({ pathname, activeSection }: { pathname: string, activeSection: string }) {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <Link
          as={navItem.href.startsWith('/#') ? NextLink : undefined}
          key={navItem.label}
          href={navItem.href ?? '#'}
          fontWeight={(pathname === navItem.href || activeSection === navItem.href) ? 700 : 500}
          color={(pathname === navItem.href || activeSection === navItem.href) ? 'solar.500' : useColorModeValue('gray.600', 'gray.200')}
          borderLeft={(pathname === navItem.href || activeSection === navItem.href) ? '4px solid' : 'none'}
          borderColor={(pathname === navItem.href || activeSection === navItem.href) ? 'solar.500' : 'transparent'}
          py={2}
          px={2}
          _hover={{ color: 'sky.500' }}
          scroll={navItem.href.startsWith('/#') ? true : undefined}
          prefetch={false}
        >
          {navItem.label}
        </Link>
      ))}
    </Stack>
  );
} 