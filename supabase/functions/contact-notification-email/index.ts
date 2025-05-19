// Follow this setup guide to integrate the Resend API with your Supabase project:
// https://resend.com/docs/send-with-supabase-edge-functions

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") || "";
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "notifications@example.com";
const TO_EMAIL = Deno.env.get("TO_EMAIL") || "admin@example.com";

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

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not set");
      return new Response(
        JSON.stringify({ error: "API key configuration missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Format the date nicely
    const submissionDate = new Date(record.created_at).toLocaleString();

    // Build email HTML
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p>You have received a new inquiry from your Solar City website.</p>
      
      <h3>Contact Details:</h3>
      <ul>
        <li><strong>Name:</strong> ${record.name}</li>
        <li><strong>Email:</strong> ${record.email || "Not provided"}</li>
        <li><strong>Phone:</strong> ${record.phone}</li>
        ${record.interested_in ? `<li><strong>Interested In:</strong> ${record.interested_in}</li>` : ""}
        ${record.city && record.state ? `<li><strong>Location:</strong> ${record.city}, ${record.state}</li>` : ""}
        <li><strong>Submission Time:</strong> ${submissionDate}</li>
      </ul>
      
      <h3>Message:</h3>
      <p>${record.message || "No message provided"}</p>
      
      <hr />
      <p>This is an automated notification from your Solar City website.</p>
    `;

    // Send email with Resend
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        subject: `New Contact Form: ${record.name}`,
        html: htmlContent,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}); 