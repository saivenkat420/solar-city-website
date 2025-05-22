"use client";

import React from 'react';
import ClientContactWrapper from '../../components/ClientContactWrapper';
import ContactPageSchema from './contact-schema';

export default function ContactPage() {
  return (
    <>
      <ContactPageSchema />
      <ClientContactWrapper />
    </>
  );
} 