import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Post } from "@/lib/types";

export default function LogCard({ post }: { post: Post }) {
  const t = useTranslations("logs");

  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <Link
      href={`/logs/${post.slug}`}
      className="pixel-border hover:border-amber group block bg-panel transition-colors"
    >
      <div className="border-line flex items-center justify-between border-b-2 px-3 py-1.5">
        <span className="font-pixel text-[0.5rem] text-phosphor">
          LOG_{String(post.logNumber).padStart(3, "0")}
        </span>
        <span className="font-term text-sm text-dim">{date}</span>
      </div>
      <div className="p-4">
        <h3 className="font-term group-hover:text-amber text-xl leading-tight text-fg transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="font-term mt-2 line-clamp-2 text-lg text-dim">
            {post.excerpt}
          </p>
        )}
        <p className="font-term mt-3 flex items-center justify-between text-base">
          <span className="border-line text-dim border px-1.5 py-0.5">
            #{post.category}
          </span>
          <span className="text-amber">{t("read")} →</span>
        </p>
      </div>
    </Link>
  );
}
