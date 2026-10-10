import { NextRequest, NextResponse } from "next/server";
import { triggerWebhook } from "@/lib/leads";

/**
 * Diagnostic & Demo endpoint for testing n8n / Activepieces / Zapier webhooks
 * Usage:
 *   GET /api/webhook-test -> Tests connection with mock lead
 *   POST /api/webhook-test -> Sends custom payload to configured LEAD_WEBHOOK_URL
 */
export async function GET() {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json(
      {
        configured: false,
        message:
          "LEAD_WEBHOOK_URL is not set in environment. Set it in .env.local to connect n8n, Activepieces, or Zapier.",
        samplePayload: {
          event: "lead.test",
          source: "Forma Bath Co. Landing Page",
          timestamp: new Date().toISOString(),
          data: {
            name: "John Doe",
            email: "john@example.com",
            phone: "(555) 234-5678",
            projectType: "Full Master Bath Rebuild & Millwork",
            budgetRange: "$26,000 – $44,000 (Full Master)",
            zipCode: "90210",
          },
        },
      },
      { status: 200 }
    );
  }

  const result = await triggerWebhook("lead.test", {
    type: "manual_test_ping",
    message: "Forma Bath Co. webhook connection test",
    sampleLead: {
      name: "Demo Homeowner",
      email: "demo@formabathco.com",
      phone: "(555) 382-7491",
      projectType: "Curbless Walk-In Shower Conversion",
      budgetRange: "$26,000 – $44,000",
      zipCode: "90210",
    },
  });

  return NextResponse.json({
    configured: true,
    targetUrl: webhookUrl.replace(/(\/\/[^/]{4})[^/]+/, "$1***"),
    result,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await triggerWebhook(body.event || "custom.trigger", body.data || body);
    return NextResponse.json({ result });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
