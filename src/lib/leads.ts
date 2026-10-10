import fs from "fs/promises";
import path from "path";

export interface LeadSubmission {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  zipCode: string;
  budgetRange: string;
  timeline: string;
  description: string;
  status: "New" | "Contacted" | "Consultation Scheduled" | "Quoted" | "Won" | "Lost";
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

/**
 * Ensures the data directory and leads storage file exist
 */
async function ensureStorageExists(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(LEADS_FILE);
    } catch {
      await fs.writeFile(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (error) {
    console.error("Failed to initialize leads storage:", error);
  }
}

/**
 * Reads all stored leads from the database file
 */
export async function getLeads(): Promise<LeadSubmission[]> {
  await ensureStorageExists();
  try {
    const data = await fs.readFile(LEADS_FILE, "utf-8");
    return JSON.parse(data) as LeadSubmission[];
  } catch (error) {
    console.error("Error reading leads file:", error);
    return [];
  }
}

/**
 * Sends a structured event payload to an external automation webhook (n8n, Activepieces, Make, Zapier)
 */
export async function triggerWebhook(event: string, payload: Record<string, unknown>): Promise<{
  triggered: boolean;
  statusCode?: number;
  error?: string;
}> {
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;
  if (!webhookUrl) {
    return { triggered: false, error: "No LEAD_WEBHOOK_URL environment variable configured." };
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "FormaBathCo-Automation/1.0",
      },
      body: JSON.stringify({
        event,
        source: "Forma Bath Co. Landing Page",
        timestamp: new Date().toISOString(),
        data: payload,
      }),
      // Short timeout for fast user experience
      signal: AbortSignal.timeout(6000),
    });

    return { triggered: true, statusCode: response.status };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn("External automation webhook delivery error:", message);
    return { triggered: false, error: message };
  }
}

/**
 * Saves a new validated lead submission to persistent storage
 * and automatically dispatches to n8n / Activepieces webhook if configured
 */
export async function saveLead(
  leadInput: Omit<LeadSubmission, "id" | "createdAt" | "status">
): Promise<{ lead: LeadSubmission; webhookResult: { triggered: boolean; statusCode?: number; error?: string } }> {
  await ensureStorageExists();

  const newLead: LeadSubmission = {
    ...leadInput,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    createdAt: new Date().toISOString(),
    status: "New",
  };

  const leads = await getLeads();
  leads.unshift(newLead);
  await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");

  // Webhook Automation Integration (n8n, Activepieces, CRM)
  const webhookResult = await triggerWebhook("lead.submitted", {
    lead: newLead,
    notificationSummary: `🚀 New Lead: ${newLead.name} (${newLead.email}, ${newLead.phone || "No phone"}) | Project: ${newLead.projectType} | Budget: ${newLead.budgetRange} | Location: ${newLead.zipCode}`,
  });

  return { lead: newLead, webhookResult };
}
