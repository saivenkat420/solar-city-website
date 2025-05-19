// Follow this setup guide to integrate the Twilio API with your Supabase project:
// https://supabase.com/docs/guides/functions/deploy

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const TWILIO_ACCOUNT_SID = Deno.env.get("TWILIO_ACCOUNT_SID") || "";
const TWILIO_AUTH_TOKEN = Deno.env.get("TWILIO_AUTH_TOKEN") || "";
const TWILIO_FROM_NUMBER = Deno.env.get("TWILIO_FROM_NUMBER") || "";
const ADMIN_PHONE_NUMBER = Deno.env.get("ADMIN_PHONE_NUMBER") || "";

interface ContactRequest {
  record: {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    interested_in?: string;
    city?: string;
    state?: string;
    created_at: string;
  };
  type: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  try {
    const { record, type } = await req.json() as ContactRequest;

    if (!record) {
      return new Response(JSON.stringify({ error: "No record data provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER || !ADMIN_PHONE_NUMBER) {
      console.error("Twilio configuration missing");
      return new Response(
        JSON.stringify({ error: "Twilio configuration incomplete" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Format date
    const submissionDate = new Date(record.created_at).toLocaleString();

    // Create SMS message
    const smsBody = `New contact from Solar City website: 
${record.name} (${record.phone})
${record.interested_in ? `Interested in: ${record.interested_in}` : ""}
${record.city && record.state ? `Location: ${record.city}, ${record.state}` : ""}
Submitted: ${submissionDate}`;

    // Send SMS via Twilio
    const twilioEndpoint = `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`;
    
    // Convert credentials to base64 for Basic Auth
    const auth = btoa(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`);
    
    const formData = new URLSearchParams();
    formData.append('To', ADMIN_PHONE_NUMBER);
    formData.append('From', TWILIO_FROM_NUMBER);
    formData.append('Body', smsBody);
    
    const response = await fetch(twilioEndpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`Twilio API error: ${result.message || response.statusText}`);
    }

    return new Response(JSON.stringify({ success: true, sid: result.sid }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error sending SMS notification:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}); 