import { setRequestLocale } from "next-intl/server";
import { getLogs } from "@/lib/data";
import type { Locale } from "@/lib/types";
import HeroSection from "@/components/hero/HeroSection";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const logs = await getLogs(locale as Locale);

  return <HeroSection logs={logs} />;
}
