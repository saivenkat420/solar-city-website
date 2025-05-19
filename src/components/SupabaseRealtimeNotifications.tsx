'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Badge,
  Alert,
  AlertIcon,
  Switch,
  FormControl,
  FormLabel,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Code,
} from '@chakra-ui/react';

export default function SupabaseRealtimeNotifications() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const toast = useToast();

  useEffect(() => {
    // Cleanup function to unsubscribe on component unmount
    return () => {
      unsubscribeFromChanges();
    };
  }, []);

  const subscribeToChanges = async () => {
    try {
      // Enable realtime subscriptions for this client
      await supabase.channel('schema-db-changes').subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setConnectionStatus('connected');
          toast({
            title: 'Realtime connected',
            description: 'You are now receiving real-time notifications',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      });

      // Subscribe to changes in the contacts table
      const subscription = supabase
        .channel('contacts-changes')
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'contacts',
          },
          (payload) => {
            // Handle the new record
            const newContact = payload.new;
            
            // Add to notifications list
            setNotifications((prev) => [newContact, ...prev].slice(0, 10));
            
            // Show toast notification
            toast({
              title: 'New Contact Submission',
              description: `${newContact.name} (${newContact.phone}) has submitted a contact form`,
              status: 'info',
              duration: 5000,
              isClosable: true,
            });
          }
        )
        .subscribe();

      setIsSubscribed(true);
      return subscription;
    } catch (error: any) {
      console.error('Error subscribing to changes:', error);
      toast({
        title: 'Subscription error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const unsubscribeFromChanges = async () => {
    try {
      // Remove all subscriptions
      await supabase.removeAllChannels();
      setIsSubscribed(false);
      setConnectionStatus('disconnected');
      toast({
        title: 'Unsubscribed',
        description: 'You are no longer receiving real-time notifications',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error('Error unsubscribing:', error);
    }
  };

  const handleToggleSubscription = () => {
    if (isSubscribed) {
      unsubscribeFromChanges();
    } else {
      subscribeToChanges();
    }
  };

  return (
    <Container maxW="container.lg" py={6}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg">Real-time Contact Notifications</Heading>
        
        <Box p={4} borderWidth="1px" borderRadius="lg">
          <FormControl display="flex" alignItems="center" mb={4}>
            <FormLabel htmlFor="subscription-toggle" mb="0">
              Enable real-time notifications
            </FormLabel>
            <Switch
              id="subscription-toggle"
              isChecked={isSubscribed}
              onChange={handleToggleSubscription}
              colorScheme="green"
            />
          </FormControl>
          
          <Alert status={connectionStatus === 'connected' ? 'success' : 'info'}>
            <AlertIcon />
            <Text>
              Status: 
              <Badge ml={2} colorScheme={connectionStatus === 'connected' ? 'green' : 'gray'}>
                {connectionStatus === 'connected' ? 'Connected' : 'Disconnected'}
              </Badge>
            </Text>
          </Alert>
          
          <Text fontSize="sm" mt={2}>
            {isSubscribed 
              ? 'You will receive notifications when new contact forms are submitted.' 
              : 'Enable notifications to see when new contact forms are submitted.'}
          </Text>
        </Box>

        <Box>
          <Heading size="md" mb={4}>Recent Notifications ({notifications.length})</Heading>
          
          {notifications.length > 0 ? (
            <Box overflowX="auto">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Phone</Th>
                    <Th>Interested In</Th>
                    <Th>Location</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {notifications.map((notification, index) => (
                    <Tr key={index}>
                      <Td>{notification.name}</Td>
                      <Td>{notification.email || '-'}</Td>
                      <Td>{notification.phone}</Td>
                      <Td>{notification.interested_in || '-'}</Td>
                      <Td>{notification.city}, {notification.state}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          ) : (
            <Text>No notifications yet. New contact submissions will appear here.</Text>
          )}
        </Box>
        
        <Box mt={4} p={4} bg="gray.50" borderRadius="md">
          <Heading size="sm" mb={2}>How It Works:</Heading>
          <Text fontSize="sm">
            This component uses Supabase's Realtime feature to subscribe to database changes.
            When a new contact form is submitted, you'll receive an instant notification without refreshing the page.
          </Text>
          <Text fontSize="sm" mt={2}>
            Technical details: Uses PostgreSQL's publication/subscription (pub/sub) system via Supabase Realtime.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
} 