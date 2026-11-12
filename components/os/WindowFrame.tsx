type WindowFrameProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  accent?: "amber" | "phosphor" | "sky";
};

const accentBar: Record<NonNullable<WindowFrameProps["accent"]>, string> = {
  amber: "bg-amber text-ink",
  phosphor: "bg-phosphor text-ink",
  sky: "bg-sky text-ink",
};

/** Static retro-OS window used for cards and section blocks. */
export default function WindowFrame({
  title,
  children,
  className = "",
  accent = "amber",
}: WindowFrameProps) {
  return (
    <div className={`pixel-border bg-panel ${className}`}>
      <div
        className={`flex items-center justify-between px-3 py-2 font-pixel text-[0.55rem] tracking-widest uppercase ${accentBar[accent]}`}
      >
        <span className="truncate">{title}</span>
        <span className="flex gap-1.5" aria-hidden>
          <i className="block h-2 w-2 border border-ink/60" />
          <i className="block h-2 w-2 border border-ink/60" />
          <i className="block h-2 w-2 bg-ink/60" />
        </span>
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}
