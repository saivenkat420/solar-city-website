// Follow this setup guide to integrate with your Supabase project:
// https://supabase.com/docs/guides/functions/deploy

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const SLACK_WEBHOOK_URL = Deno.env.get("SLACK_WEBHOOK_URL") || "";

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

    if (!SLACK_WEBHOOK_URL) {
      console.error("SLACK_WEBHOOK_URL not set");
      return new Response(
        JSON.stringify({ error: "Webhook URL configuration missing" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Format date
    const submissionDate = new Date(record.created_at).toLocaleString();

    // Build Slack message
    const slackMessage = {
      text: "New Contact Form Submission",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "🔔 New Contact Form Submission",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Name:* ${record.name}\n*Phone:* ${record.phone}\n*Email:* ${
              record.email || "Not provided"
            }${
              record.interested_in
                ? `\n*Interested In:* ${record.interested_in}`
                : ""
            }${
              record.city && record.state
                ? `\n*Location:* ${record.city}, ${record.state}`
                : ""
            }\n*Submission Time:* ${submissionDate}`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Message:*\n${record.message || "No message provided"}`,
          },
        },
        {
          type: "divider",
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: "Sent from Solar City Website",
            },
          ],
        },
      ],
    };

    // Send Slack notification
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(slackMessage),
    });

    if (!response.ok) {
      throw new Error(`Slack API error: ${response.statusText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error sending Slack notification:", error);
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