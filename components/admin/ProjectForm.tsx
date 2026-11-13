"use client";

import type { ProjectRow } from "@/lib/types";
import { saveProject } from "@/app/(admin)/admin/actions";

const inputCls =
  "font-term mt-1 w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg text-fg outline-none focus:border-amber";
const labelCls = "font-term block text-lg text-dim";

function Field({
  name,
  label,
  defaultValue,
  textarea,
  placeholder,
  required,
}: {
  name: string;
  label: string;
  defaultValue?: string | null;
  textarea?: boolean;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className={labelCls}>
      {label}
      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue ?? ""}
          rows={4}
          placeholder={placeholder}
          required={required}
          className={`${inputCls} resize-y`}
        />
      ) : (
        <input
          name={name}
          defaultValue={defaultValue ?? ""}
          placeholder={placeholder}
          required={required}
          className={inputCls}
        />
      )}
    </label>
  );
}

export default function ProjectForm({ project }: { project?: ProjectRow }) {
  return (
    <form action={saveProject} className="space-y-5">
      {project && <input type="hidden" name="id" value={project.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="name" label="Nombre *" defaultValue={project?.name} required />
        <Field
          name="slug"
          label="Slug (vacío = auto)"
          defaultValue={project?.slug}
          placeholder="mi-proyecto"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field name="tag_es" label="Tag ES" defaultValue={project?.tag_es} placeholder="PropTech · domótica" />
        <Field name="tag_en" label="Tag EN" defaultValue={project?.tag_en} />
      </div>

      <Field name="summary_es" label="Resumen ES" defaultValue={project?.summary_es} textarea />
      <Field name="summary_en" label="Resumen EN" defaultValue={project?.summary_en} textarea />
      <Field name="context_es" label="Contexto ES" defaultValue={project?.context_es} textarea />
      <Field name="context_en" label="Contexto EN" defaultValue={project?.context_en} textarea />
      <Field name="solution_es" label="Solución ES" defaultValue={project?.solution_es} textarea />
      <Field name="solution_en" label="Solución EN" defaultValue={project?.solution_en} textarea />
      <Field name="results_es" label="Resultados ES" defaultValue={project?.results_es} textarea />
      <Field name="results_en" label="Resultados EN" defaultValue={project?.results_en} textarea />

      <Field
        name="stack"
        label="Stack (separado por comas)"
        defaultValue={project?.stack?.join(", ")}
        placeholder="WordPress, CRM, IA"
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Field name="metric_value" label="Métrica (valor)" defaultValue={project?.metric_value} placeholder="65%" />
        <Field name="metric_es" label="Métrica ES" defaultValue={project?.metric_es} placeholder="mejora en ventas" />
        <Field name="metric_en" label="Métrica EN" defaultValue={project?.metric_en} />
      </div>

      <div className="pixel-border grid gap-4 bg-ink-2 p-4 sm:grid-cols-2">
        <Field
          name="image"
          label="Imagen (ruta /projects/… o URL)"
          defaultValue={project?.image}
          placeholder="/projects/mi-proyecto.webp"
        />
        <label className={labelCls}>
          …o subir imagen
          <input
            name="image_file"
            type="file"
            accept="image/*"
            className={`${inputCls} file:font-term file:mr-3 file:border-0 file:bg-amber file:px-3 file:py-1 file:text-ink`}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Field
          name="external_url"
          label="URL del sitio real"
          defaultValue={project?.external_url}
          placeholder="https://…"
        />
        <Field
          name="position"
          label="Posición"
          defaultValue={String(project?.position ?? 0)}
        />
        <label className="font-term mt-6 flex items-center gap-2 text-lg text-fg">
          <input
            type="checkbox"
            name="published"
            defaultChecked={project?.published ?? true}
            className="h-4 w-4 accent-amber"
          />
          Publicado
        </label>
      </div>

      <button
        type="submit"
        className="font-pixel pixel-border-amber bg-amber px-5 py-3 text-[0.6rem] text-ink"
      >
        GUARDAR →
      </button>
    </form>
  );
}
