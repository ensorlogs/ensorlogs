import { NextRequest, NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin-emails";

// Handles the magic-link email: Supabase redirects here with ?token_hash&type=email
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");

  if (isSupabaseConfigured() && tokenHash && type === "email") {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: "email",
    });
    if (!error && isAdminEmail(data.user?.email)) {
      return NextResponse.redirect(`${origin}/admin`);
    }
    if (!error) await supabase.auth.signOut();
  }
  return NextResponse.redirect(`${origin}/admin/login?error=1`);
}
