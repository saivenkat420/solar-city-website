'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
  Box,
  Button,
  Badge,
  Text,
  VStack,
  HStack,
  Heading,
  Flex,
  Icon,
  useToast,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

interface Notification {
  id: string;
  title: string;
  message: string;
  created_at: string;
  read_at: string | null;
  type: string;
  related_record: any;
}

export default function InAppNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Fetch notifications when component mounts
  useEffect(() => {
    fetchNotifications();
    
    // Subscribe to new notifications
    const subscription = supabase
      .channel('notification-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
        },
        (payload) => {
          // Add new notification to state
          const newNotification = payload.new as Notification;
          setNotifications((prev) => [newNotification, ...prev]);
          setUnreadCount((prev) => prev + 1);
          
          // Show toast for new notification
          toast({
            title: newNotification.title,
            description: newNotification.message,
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        }
      )
      .subscribe();
    
    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchNotifications = async () => {
    setIsLoading(true);
    try {
      // Get the current user
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      if (!userData.user) {
        console.error('No authenticated user found');
        setIsLoading(false);
        return;
      }
      
      // Fetch notifications for the current user
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false })
        .limit(20);
      
      if (error) throw error;
      
      setNotifications(data || []);
      setUnreadCount(data?.filter(n => !n.read_at).length || 0);
    } catch (error: any) {
      console.error('Error fetching notifications:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => n.id === id ? { ...n, read_at: new Date().toISOString() } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error: any) {
      console.error('Error marking notification as read:', error.message);
    }
  };

  const markAllAsRead = async () => {
    try {
      const { data: userData } = await supabase.auth.getUser();
      
      if (!userData.user) return;
      
      const { error } = await supabase
        .from('notifications')
        .update({ read_at: new Date().toISOString() })
        .eq('user_id', userData.user.id)
        .is('read_at', null);
      
      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => !n.read_at ? { ...n, read_at: new Date().toISOString() } : n)
      );
      setUnreadCount(0);
    } catch (error: any) {
      console.error('Error marking all notifications as read:', error.message);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <>
      <Button
        position="relative"
        variant="ghost"
        colorScheme="blue"
        onClick={onOpen}
        aria-label="Notifications"
      >
        <Icon as={BellIcon} boxSize={6} />
        {unreadCount > 0 && (
          <Badge
            position="absolute"
            top="-8px"
            right="-8px"
            colorScheme="red"
            borderRadius="full"
            fontSize="xs"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            Notifications
            {unreadCount > 0 && (
              <Badge ml={2} colorScheme="red" borderRadius="full">
                {unreadCount} new
              </Badge>
            )}
          </DrawerHeader>

          <DrawerBody>
            {isLoading ? (
              <Text>Loading notifications...</Text>
            ) : notifications.length === 0 ? (
              <Text color="gray.500">No notifications yet</Text>
            ) : (
              <VStack spacing={4} align="stretch">
                {notifications.map((notification) => (
                  <Box
                    key={notification.id}
                    p={4}
                    borderWidth="1px"
                    borderRadius="md"
                    borderLeftWidth="4px"
                    borderLeftColor={notification.read_at ? "gray.200" : "blue.500"}
                    bg={notification.read_at ? "white" : "blue.50"}
                    onClick={() => !notification.read_at && markAsRead(notification.id)}
                    _hover={{ bg: notification.read_at ? "gray.50" : "blue.100" }}
                    cursor="pointer"
                    transition="all 0.2s"
                  >
                    <Flex justify="space-between" align="center">
                      <Heading size="sm" mb={1}>
                        {notification.title}
                        {!notification.read_at && (
                          <Badge ml={2} colorScheme="blue">New</Badge>
                        )}
                      </Heading>
                      <Text fontSize="xs" color="gray.500">
                        {formatDate(notification.created_at)}
                      </Text>
                    </Flex>
                    <Text>{notification.message}</Text>

                    {notification.type === 'contact_form' && notification.related_record && (
                      <Box mt={2} fontSize="sm">
                        <Text fontWeight="bold">Contact details:</Text>
                        <Text>Name: {notification.related_record.name}</Text>
                        <Text>Phone: {notification.related_record.phone}</Text>
                        {notification.related_record.email && (
                          <Text>Email: {notification.related_record.email}</Text>
                        )}
                      </Box>
                    )}
                  </Box>
                ))}
              </VStack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button 
              variant="outline" 
              mr={3} 
              onClick={onClose}
            >
              Close
            </Button>
            <Button 
              colorScheme="blue" 
              onClick={markAllAsRead}
              isDisabled={unreadCount === 0}
            >
              Mark all as read
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
} 