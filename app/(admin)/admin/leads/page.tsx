import AdminShell from "@/components/admin/AdminShell";
import SupabaseNotice from "@/components/admin/SupabaseNotice";
import { isSupabaseConfigured, requireAdmin } from "@/lib/supabase/server";
import { deleteLead, updateLeadStatus } from "../actions";
import type { ContactRow } from "@/lib/types";

const STATUS_LABEL: Record<ContactRow["status"], string> = {
  new: "nuevo",
  contacted: "contactado",
  quoted: "presupuestado",
  closed: "cerrado",
};

const NEXT_STATUS: Record<ContactRow["status"], ContactRow["status"]> = {
  new: "contacted",
  contacted: "quoted",
  quoted: "closed",
  closed: "new",
};

export default async function LeadsAdminPage() {
  if (!isSupabaseConfigured()) return <SupabaseNotice />;

  const supabase = await requireAdmin();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });
  const leads = (data ?? []) as ContactRow[];

  return (
    <AdminShell>
      <h1 className="font-pixel mb-6 text-[0.7rem] text-amber">
        LEADS ({leads.length})
      </h1>

      {leads.length === 0 ? (
        <p className="font-term text-xl text-dim">
          Sin contactos todavía. Los formularios de contacto y boletín caen
          aquí.
        </p>
      ) : (
        <ul className="space-y-3">
          {leads.map((lead) => (
            <li key={lead.id} className="pixel-border bg-panel p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-term text-xl text-fg">
                    {lead.name ?? lead.email}
                    <span className="ml-2 text-base text-dim">
                      {new Date(lead.created_at).toLocaleDateString("es-VE")}
                    </span>
                  </p>
                  <p className="font-term text-base text-dim">
                    {lead.email}
                    {lead.service && (
                      <span className="text-amber"> · {lead.service}</span>
                    )}
                    <span className="text-phosphor">
                      {" "}
                      · {lead.source === "newsletter" ? "boletín" : "contacto"}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <form action={updateLeadStatus}>
                    <input type="hidden" name="id" value={lead.id} />
                    <input
                      type="hidden"
                      name="status"
                      value={NEXT_STATUS[lead.status]}
                    />
                    <button
                      title="Clic para avanzar de estado"
                      className={`font-term border px-2 py-1 text-base ${
                        lead.status === "new"
                          ? "border-amber text-amber"
                          : lead.status === "closed"
                            ? "border-line text-dim"
                            : "border-phosphor text-phosphor"
                      }`}
                    >
                      {STATUS_LABEL[lead.status]}
                    </button>
                  </form>
                  <a
                    href={`mailto:${lead.email}${lead.service ? `?subject=${encodeURIComponent(`Presupuesto — ${lead.service}`)}` : ""}`}
                    className="font-term text-lg text-amber underline decoration-dotted"
                  >
                    Escribir
                  </a>
                  <form action={deleteLead}>
                    <input type="hidden" name="id" value={lead.id} />
                    <button className="font-term text-lg text-alert hover:underline">
                      Borrar
                    </button>
                  </form>
                </div>
              </div>
              {lead.message && (
                <p className="font-term border-line mt-3 border-t pt-3 text-lg text-dim">
                  {lead.message}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
