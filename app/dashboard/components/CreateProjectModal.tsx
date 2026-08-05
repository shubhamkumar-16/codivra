"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  onClose: () => void;
};

export default function CreateProjectModal({ onClose }: Props) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("typescript");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      // close modal
      onClose();

      // refresh server component data
      router.refresh();

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

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-gray-900">
            Create Project
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-900"
          >
            ✕
          </button>

        </div>


        <form onSubmit={handleSubmit}>

          {/* Project Name */}
          <div className="mb-4">

            <label className="mb-1 block text-sm font-medium text-gray-700">
              Project Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Codivra Editor"
              className="w-full rounded-lg border px-3 py-2 text-black"
              required
            />

          </div>


          {/* Description */}
          <div className="mb-4">

            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Realtime collaboration platform"
              className="w-full rounded-lg border px-3 py-2 text-black"
              rows={3}
            />

          </div>


          {/* Language */}
          <div className="mb-5">

            <label className="mb-1 block text-sm font-medium text-gray-700">
              Language
            </label>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-black"
            >

              <option value="typescript">
                TypeScript
              </option>

              <option value="javascript">
                JavaScript
              </option>

              <option value="python">
                Python
              </option>

              <option value="java">
                Java
              </option>

              <option value="cpp">
                C++
              </option>

            </select>

          </div>


          {error && (
            <p className="mb-4 text-sm text-red-600">
              {error}
            </p>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
          >

            {loading
              ? "Creating..."
              : "Create Project"}

          </button>


        </form>

      </div>

    </div>
  );
}