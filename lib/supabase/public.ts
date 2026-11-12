import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Cookie-less client for public, read-only data (published posts/stories).
 * Keeps public pages statically renderable — RLS allows anon SELECT.
 */
export function createPublicClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
