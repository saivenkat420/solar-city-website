/**
 * Script to check Supabase connection and environment variables
 * 
 * To run this script:
 * 1. Add this to package.json scripts: "check-supabase": "ts-node --project tsconfig.json src/scripts/checkSupabase.ts"
 * 2. Run: npm run check-supabase
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Main function to check Supabase
async function checkSupabase() {
  console.log('\n--- 🔍 Supabase Connection Diagnostic Tool ---\n');
  
  // Check environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('📋 Environment variables check:');
  console.log(`NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl ? '✅ Defined' : '❌ Not defined'}`);
  console.log(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseKey ? '✅ Defined' : '❌ Not defined'}`);
  
  if (!supabaseUrl || !supabaseKey) {
    console.log('\n❌ ERROR: Missing required Supabase environment variables.');
    console.log(`
    Please create or update your .env.local file with the following variables:
    
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    
    You can find these values in your Supabase project dashboard under Project Settings > API.
    `);
    return;
  }
  
  try {
    console.log('\n📡 Attempting to connect to Supabase...');
    
    // Create Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test connection with a simple query
    console.log('🔄 Testing connection with a simple query...');
    const { data, error, count } = await supabase
      .from('contacts')
      .select('*', { count: 'exact' })
      .limit(1);
    
    if (error) throw error;
    
    console.log(`✅ Connection successful! Found ${count} records in 'contacts' table.`);
    
    // Test inserting data
    console.log('\n🔄 Testing data insertion...');
    const testData = {
      name: 'Test User (Script)',
      email: 'script-test@example.com',
      phone: '9876543210',
      message: 'This is a test from the diagnostic script.'
    };
    
    const { data: insertData, error: insertError } = await supabase
      .from('contacts')
      .insert([testData])
      .select();
    
    if (insertError) throw insertError;
    
    console.log('✅ Test data inserted successfully!');
    console.log(insertData);
    
    // Display RLS (Row Level Security) policies
    console.log('\n🔒 Checking Row Level Security policies...');
    const { data: policies, error: policiesError } = await supabase
      .rpc('get_policies');
    
    if (policiesError) {
      console.log('⚠️ Could not check RLS policies. This may require admin privileges.');
    } else {
      const contactsPolicies = policies.filter((p: any) => p.table === 'contacts');
      if (contactsPolicies.length === 0) {
        console.log('⚠️ No RLS policies found for the contacts table.');
      } else {
        console.log('✅ Found RLS policies for contacts table:');
        contactsPolicies.forEach((policy: any) => {
          console.log(`   - ${policy.name}: ${policy.definition}`);
        });
      }
    }
    
    console.log('\n✅ All tests completed successfully!');
    
  } catch (error: any) {
    console.log('\n❌ ERROR connecting to Supabase:');
    console.log(error.message);
    
    // Common error troubleshooting
    if (error.message.includes('not found')) {
      console.log('\n⚠️ Possible issues:');
      console.log('1. The contacts table might not exist in your database');
      console.log('2. Your Supabase URL might be incorrect');
    } else if (error.message.includes('JWT')) {
      console.log('\n⚠️ Possible issues:');
      console.log('1. Your Supabase anon key might be incorrect or expired');
      console.log('2. The key might not have the necessary permissions');
    } else if (error.message.includes('permission denied')) {
      console.log('\n⚠️ Possible issues:');
      console.log('1. Row Level Security (RLS) might be preventing access');
      console.log('2. Your Supabase key might not have the necessary permissions');
      console.log('\nTry checking your RLS policies in the Supabase dashboard.');
    }
  }
}

// Run the check
checkSupabase().catch(console.error); 