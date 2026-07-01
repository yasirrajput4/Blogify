import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

/**
 * RTE — identical name/control/label/defaultValue props and Controller
 * wiring as before; onEditorChange still feeds react-hook-form directly.
 * Only the wrapper chrome and the editor's internal content_style changed,
 * so the writing surface visually matches the "browser-css" reading
 * styles defined in index.css (same serif body, terracotta links).
 */
export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-1.5 pl-0.5 text-sm font-medium text-ink-soft">
          {label}
        </label>
      )}

      <div className="rounded-md border border-rule overflow-hidden focus-within:border-terracotta focus-within:ring-1 focus-within:ring-terracotta/30 transition-colors duration-150">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="7rchf2m4zyej881u76ica9hbnpulcczhz0msdh28f4jghuh5"
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                skin: "oxide",
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                  "anchor",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                // Mirrors the .browser-css reading styles so what you write
                // previews close to how it will actually be read.
                content_style: `
                  body {
                    font-family: Fraunces, Georgia, serif;
                    font-size: 17px;
                    line-height: 1.85;
                    color: #4A4339;
                    max-width: 720px;
                    margin: 2rem auto;
                    padding: 0 1rem;
                  }
                  a { color: #C1502E; }
                  blockquote {
                    border-left: 2px solid #C1502E;
                    padding-left: 1.5rem;
                    color: #8B6F5C;
                    font-style: italic;
                  }
                `,
              }}
              onEditorChange={onChange}
            />
          )}
        />
      </div>
    </div>
  );
}
