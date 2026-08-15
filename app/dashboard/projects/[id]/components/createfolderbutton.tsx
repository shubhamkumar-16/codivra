"use client";

import { useState } from "react";

type Props = {
  projectId: string;
  onCreated?: () => void;
};

export default function CreateFolderButton({
  projectId,
  onCreated,
}: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Folder name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/projects/${projectId}/folders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create folder"
        );
      }

      // Clear input
      setName("");

      // Close modal
      setOpen(false);

      // Tell parent that folder was created
      onCreated?.();

    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to create folder");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Create Folder Button */}

      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setError("");
        }}
        className="rounded px-2 py-1 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-800"
        title="Create folder"
      >
        📁+
      </button>

      {/* Modal */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

            {/* Header */}

            <div className="mb-5 flex items-center justify-between">

              <h2 className="text-xl font-bold text-gray-900">
                Create Folder
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>

            </div>

            {/* Form */}

            <form onSubmit={handleSubmit}>

              <label className="mb-2 block text-sm font-medium text-gray-700">
                Folder Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="src"
                autoFocus
                className="w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-blue-500"
              />

              {/* Error */}

              {error && (
                <p className="mt-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              {/* Buttons */}

              <div className="mt-5 flex gap-3">

                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setError("");
                  }}
                  className="flex-1 rounded-lg border px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading
                    ? "Creating..."
                    : "Create Folder"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}
    </>
  );
}