"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { PostRow } from "@/lib/types";
import { savePost } from "@/app/(admin)/admin/actions";

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
          rows={12}
          className={`${inputCls} resize-y font-mono`}
        />
      )}
      {/* keep value submitted while previewing */}
      {preview && <input type="hidden" name={name} value={value} />}
    </div>
  );
}

export default function PostForm({ post }: { post?: PostRow }) {
  return (
    <form action={savePost} className="space-y-5">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelCls}>
          Título (ES) *
          <input
            name="title_es"
            required
            defaultValue={post?.title_es}
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Título (EN)
          <input name="title_en" defaultValue={post?.title_en} className={inputCls} />
        </label>
        <label className={labelCls}>
          Slug
          <input
            name="slug"
            placeholder="auto desde el título"
            defaultValue={post?.slug}
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Categoría
          <input
            name="category"
            placeholder="domotica / ia / construtech / tourism"
            defaultValue={post?.category ?? "general"}
            className={inputCls}
          />
        </label>
        <label className={labelCls}>
          Extracto (ES)
          <input name="excerpt_es" defaultValue={post?.excerpt_es ?? ""} className={inputCls} />
        </label>
        <label className={labelCls}>
          Extracto (EN)
          <input name="excerpt_en" defaultValue={post?.excerpt_en ?? ""} className={inputCls} />
        </label>
      </div>

      <ContentField
        name="content_es"
        label="Contenido Markdown (ES) *"
        defaultValue={post?.content_es ?? ""}
      />
      <ContentField
        name="content_en"
        label="Contenido Markdown (EN)"
        defaultValue={post?.content_en ?? ""}
      />

      <label className="font-term flex items-center gap-3 text-xl text-fg">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published ?? false}
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
