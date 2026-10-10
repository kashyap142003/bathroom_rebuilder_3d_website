import { NextRequest, NextResponse } from "next/server";
import { saveLead } from "@/lib/leads";

// Basic rate limiting tracker (per IP in-memory)
const rateLimitMap = new Map<string, number>();

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    const lastRequestTime = rateLimitMap.get(ip) || 0;

    // Reject requests made within 2 seconds of each other
    if (now - lastRequestTime < 2000) {
      return NextResponse.json(
        { success: false, error: "Please wait a moment before submitting again." },
        { status: 429 }
      );
    }
    rateLimitMap.set(ip, now);

    const body = await request.json();
    const {
      name,
      email,
      phone,
      projectType,
      zipCode,
      budgetRange,
      timeline,
      description,
    } = body;

    // Field Validations
    if (!name || typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Please provide your full name (at least 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!projectType || typeof projectType !== "string") {
      return NextResponse.json(
        { success: false, error: "Please select a project type." },
        { status: 400 }
      );
    }

    if (!zipCode || typeof zipCode !== "string" || zipCode.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid ZIP code or location." },
        { status: 400 }
      );
    }

    // Sanitize values and persist lead + trigger automation webhook
    const { lead, webhookResult } = await saveLead({
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 150),
      phone: phone ? String(phone).trim().slice(0, 30) : undefined,
      projectType: projectType.trim().slice(0, 80),
      zipCode: zipCode.trim().slice(0, 20),
      budgetRange: budgetRange ? String(budgetRange).trim().slice(0, 60) : "Undisclosed",
      timeline: timeline ? String(timeline).trim().slice(0, 60) : "Flexible",
      description: description ? String(description).trim().slice(0, 2000) : "",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your estimate request has been received. Our team will contact you shortly.",
        leadId: lead.id,
        webhook: webhookResult,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Estimate API submission error:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred while processing your request." },
      { status: 500 }
    );
  }
}
