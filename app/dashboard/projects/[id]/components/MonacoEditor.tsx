"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

type Props = {
  fileId: string;
  value: string;
  language: string;
};

export default function MonacoEditor({
  fileId,
  value,
  language,
}: Props) {
  const [code, setCode] = useState(value);
  const [saving, setSaving] = useState(false);

  async function saveFile() {
    try {
      setSaving(true);

      const res = await fetch(`/api/files/${fileId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: code,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to save file");
      }

      alert("File saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving file.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div>

      <div className="mb-3 flex justify-end">
        <button
          onClick={saveFile}
          disabled={saving}
          className="rounded bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <Editor
        height="70vh"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={(value) => setCode(value ?? "")}
        options={{
          minimap: {
            enabled: true,
          },
          fontSize: 16,
          automaticLayout: true,
        }}
      />
    </div>
  );
}