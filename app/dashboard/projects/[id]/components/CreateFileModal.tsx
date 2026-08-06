"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  projectId: string;
  onClose: () => void;
};

export default function CreateFileModal({
  projectId,
  onClose,
}: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/projects/${projectId}/files`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create file");
      }

      router.refresh();
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6">

        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-black">
            Create File
          </h2>

          <button
            onClick={onClose}
            className="text-xl text-gray-500"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>

          <label className="mb-1 block text-sm font-medium text-gray-700">
            File Name
          </label>

          <input
            className="mb-4 w-full rounded-lg border px-3 py-2 text-black"
            placeholder="app.ts"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="mb-1 block text-sm font-medium text-gray-700">
            Language
          </label>

          <select
            className="mb-4 w-full rounded-lg border px-3 py-2 text-black"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="typescript">TypeScript</option>
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>

          {error && (
            <p className="mb-3 text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create File"}
          </button>

        </form>
      </div>
    </div>
  );
}