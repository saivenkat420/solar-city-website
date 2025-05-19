import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Extract form data
    const { 
      name, 
      email, 
      phone, 
      interestedIn,
      street,
      city,
      district,
      state,
      pincode 
    } = body;
    
    // Validate data
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required fields' },
        { status: 400 }
      );
    }
    
    // Insert into Supabase with all fields directly
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        { 
          name, 
          email: email || '', 
          phone,
          interested_in: interestedIn || '',
          street: street || '',
          city: city || '',
          district: district || '',
          state: state || '',
          pincode: pincode || ''
        }
      ]);
    
    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save contact information' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 