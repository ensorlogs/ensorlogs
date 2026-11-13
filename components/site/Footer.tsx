import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const LEGAL_LINKS = [
  { key: "aviso", anchor: "aviso" },
  { key: "privacidad", anchor: "privacidad" },
  { key: "cookies", anchor: "cookies" },
  { key: "accesibilidad", anchor: "accesibilidad" },
] as const;

export default function Footer() {
  const t = useTranslations();
  return (
    <footer className="border-line border-t-2 bg-ink-2">
      <p className="font-term px-4 pt-3 pb-1 text-center text-sm text-line-2">
        <span className="text-amber">ENSOR.LOGS</span> — {t("footer.tagline")} ·{" "}
        {t("footer.built")} · {t("footer.rights", { year: new Date().getFullYear() })}
      </p>
      <nav className="font-term px-4 pb-3 text-center text-sm">
        {LEGAL_LINKS.map(({ key, anchor }, i) => (
          <span key={key}>
            {i > 0 && <span className="text-line-2"> · </span>}
            <Link
              href={`/legal#${anchor}`}
              className="text-dim hover:text-amber"
            >
              {t(`legal.${key}.title`)}
            </Link>
          </span>
        ))}
      </nav>
    </footer>
  );
}
