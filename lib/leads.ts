import { isSupabaseConfigured } from "@/lib/supabase/client";
import { createServiceClient } from "@/lib/supabase/admin";

export type LeadInput = {
  email: string;
  name?: string;
  service?: string;
  message?: string;
  source: "contact" | "newsletter";
};

/** Best-effort lead capture into Supabase `contacts` — never throws. */
export async function saveLead(lead: LeadInput) {
  if (!isSupabaseConfigured()) return;
  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("contacts").insert({
      email: lead.email,
      name: lead.name ?? null,
      service: lead.service ?? null,
      message: lead.message ?? null,
      source: lead.source,
    });
    if (error) console.warn("[leads] insert failed:", error.message);
  } catch (err) {
    console.warn("[leads] insert failed:", err);
  }
}
