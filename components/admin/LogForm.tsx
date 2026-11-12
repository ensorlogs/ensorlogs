"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { LogRow } from "@/lib/types";
import { saveLog } from "@/app/(admin)/admin/actions";

const inputCls =
  "font-term mt-1 w-full border-2 border-line bg-ink-2 px-3 py-2 text-lg text-fg outline-none focus:border-amber";
const labelCls = "font-term block text-lg text-dim";

function ContentField({
  name,
  label,
  defaultValue,
}: {
  name: string;
  label: string;
  defaultValue: string;
}) {
  const [preview, setPreview] = useState(false);
  const [value, setValue] = useState(defaultValue);

  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-term text-lg text-dim">{label}</span>
        <button
          type="button"
          onClick={() => setPreview((v) => !v)}
          className="font-term text-base text-amber underline decoration-dotted"
        >
          {preview ? "Editar" : "Preview"}
        </button>
      </div>
      {preview ? (
        <div className="log-body font-term mt-1 min-h-40 border-2 border-line bg-ink-2 p-3 text-lg text-fg">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          name={name}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={10}
          className={`${inputCls} resize-y font-mono`}
        />
      )}
      {preview && <input type="hidden" name={name} value={value} />}
    </div>
  );
}

export default function LogForm({ log }: { log?: LogRow }) {
  const [type, setType] = useState<"log" | "story">(log?.type ?? "log");

  return (
    <form action={saveLog} className="space-y-5">
      {log && <input type="hidden" name="id" value={log.id} />}

      <div className="pixel-border bg-ink-2 p-4">
        <span className="font-term text-lg text-dim">Tipo de entrada</span>
        <div className="font-term mt-2 flex gap-4 text-xl">
          <label className="flex items-center gap-2 text-fg">
            <input
              type="radio"
              name="type"
              value="log"
              checked={type === "log"}
              onChange={() => setType("log")}
              className="h-4 w-4 accent-amber"
            />
            Log (texto)
          </label>
          <label className="flex items-center gap-2 text-fg">
            <input
              type="radio"
              name="type"
              value="story"
              checked={type === "story"}
              onChange={() => setType("story")}
              className="h-4 w-4 accent-amber"
            />
            Video log (vertical)
          </label>
        </div>
      </div>

      {type === "story" && (
        <div className="pixel-border space-y-4 bg-ink-2 p-4">
          <label className={labelCls}>
            Video (sube a Storage)
            <input
              name="video"
              type="file"
              accept="video/*"
              className={`${inputCls} file:font-term file:mr-3 file:border-0 file:bg-amber file:px-3 file:py-1 file:text-ink`}
            />
          </label>
          <label className={labelCls}>
            …o URL de video externa
            <input
              name="video_url"
              defaultValue={log?.video_url ?? ""}
              placeholder="https://…"
              className={inputCls}
            />
          </label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className={labelCls}>
              Thumbnail URL
              <input
                name="thumbnail_url"
                defaultValue={log?.thumbnail_url ?? ""}
                className={inputCls}
              />
            </label>
            <label className={labelCls}>
              Plataforma
              <input
                name="platform"
                defaultValue={log?.platform ?? "web"}
                className={inputCls}
              />
            </label>
            <label className={labelCls}>
              Posición en feed
              <input
                name="position"
                type="number"
                defaultValue={log?.position ?? 0}
                className={inputCls}
              />
            </label>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Título (ES) *
          <input
            name="title_es"
            required
            defaultValue={log?.title_es}
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Título (EN)
          <input name="title_en" defaultValue={log?.title_en} className={inputCls} />
        </label>
        <label className={labelCls}>
          Slug
          <input
            name="slug"
            placeholder="auto desde el título"
            defaultValue={log?.slug}
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Categoría
          <input
            name="category"
            placeholder="domotica / ia / construtech / tourism"
            defaultValue={log?.category ?? "general"}
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Extracto (ES)
          <input name="excerpt_es" defaultValue={log?.excerpt_es ?? ""} className={inputCls} />
        </label>
        <label className={labelCls}>
          Extracto (EN)
          <input name="excerpt_en" defaultValue={log?.excerpt_en ?? ""} className={inputCls} />
        </label>
      </div>

      <ContentField
        name="content_es"
        label={type === "story" ? "Detalle — qué estabas haciendo (ES)" : "Contenido Markdown (ES) *"}
        defaultValue={log?.content_es ?? ""}
      />
      <ContentField
        name="content_en"
        label="Contenido Markdown (EN)"
        defaultValue={log?.content_en ?? ""}
      />

      <label className="font-term flex items-center gap-3 text-xl text-fg">
        <input
          type="checkbox"
          name="published"
          defaultChecked={log?.published ?? false}
          className="h-5 w-5 accent-amber"
        />
        Publicado
      </label>

      <button
        type="submit"
        className="font-pixel pixel-border-amber bg-amber px-5 py-3 text-[0.6rem] text-ink"
      >
        GUARDAR →
      </button>
    </form>
  );
}
