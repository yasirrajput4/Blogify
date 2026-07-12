import React, { useId } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-1.5 pl-0.5 text-sm font-medium text-ink-soft"
        >
          {label}
        </label>
      )}

      <div className="rounded-md border border-rule overflow-hidden focus-within:border-terracotta focus-within:ring-1 focus-within:ring-terracotta/30 transition-colors duration-150">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Editor
              id={id}
              apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
              // 'value' prop use karne se typing reverse nahi hogi
              value={value || defaultValue}
              onEditorChange={onChange}
              init={{
                height: 500,
                menubar: true,
                skin: "oxide",
                plugins: [
                  "image",
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
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
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
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
            />
          )}
        />
      </div>
    </div>
  );
}