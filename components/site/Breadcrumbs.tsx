import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const t = useTranslations("nav");
  return (
    <nav aria-label="breadcrumb" className="font-term text-lg text-dim">
      <Link href="/" className="text-amber hover:text-amber-soft">
        ~ {t("breadcrumb_home")}
      </Link>
      {items.map((item, i) => (
        <span key={i}>
          <span className="text-line-2"> / </span>
          {item.href ? (
            <Link href={item.href} className="hover:text-amber">
              {item.label}
            </Link>
          ) : (
            <span className="text-fg">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
