import Link from "next/link";
import { signOut } from "@/app/(admin)/admin/actions";

const LINKS = [
  { href: "/admin", label: "Panel" },
  { href: "/admin/logs", label: "Logs" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-line border-b-2 bg-ink-2">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <span className="font-pixel text-[0.55rem] text-amber">
            ENSOR<span className="text-fg">.LOGS</span>
            <span className="ml-2 text-phosphor">ADMIN</span>
          </span>
          <nav className="flex items-center gap-4">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-term text-lg text-dim hover:text-amber"
              >
                {l.label}
              </Link>
            ))}
            <form action={signOut}>
              <button className="font-term text-lg text-alert hover:underline">
                Salir
              </button>
            </form>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
