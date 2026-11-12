import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("nav");

  return (
    <section className="flex flex-col items-center py-20 text-center">
      <p className="font-pixel text-4xl text-alert sm:text-6xl">404</p>
      <p className="font-pixel mt-4 text-[0.6rem] text-amber">
        GAME OVER — PAGE NOT FOUND
      </p>
      <p className="font-term mt-6 text-xl text-dim">
        &gt; route --not-found<span className="animate-blink">_</span>
      </p>
      <Link
        href="/"
        className="font-pixel pixel-border-amber mt-8 bg-amber px-4 py-3 text-[0.55rem] text-ink"
      >
        ← {t("home")}
      </Link>
    </section>
  );
}
