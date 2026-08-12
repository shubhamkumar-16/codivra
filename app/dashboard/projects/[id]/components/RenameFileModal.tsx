"use client";

import { useState } from "react";

type Props = {
  projectId: string;
  fileId: string;
  currentName: string;
  onClose: () => void;
  onRenamed: (newName: string) => void;
};

export default function RenameFileModal({
  projectId,
  fileId,
  currentName,
  onClose,
  onRenamed,
}: Props) {
  const [name, setName] = useState(currentName);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRename(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("File name is required");
      return;
    }

    if (trimmedName === currentName) {
      onClose();
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/projects/${projectId}/files`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileId,
            name: trimmedName,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to rename file"
        );
      }

      console.log("File renamed successfully:", data);

      // Update Explorer / Tabs
      onRenamed(trimmedName);

      // Close modal
      onClose();

    } catch (error) {
      console.error("Rename error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        {/* Header */}

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-xl font-bold text-gray-900">
            Rename File
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-900"
          >
            ×
          </button>

        </div>

        {/* Form */}

        <form onSubmit={handleRename}>

          <label className="mb-2 block text-sm font-medium text-gray-700">
            File Name
          </label>

          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            className="w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-blue-500 disabled:bg-gray-100"
            placeholder="example.ts"
          />

          {/* Error */}

          {error && (
            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Buttons */}

          <div className="mt-6 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border px-4 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Renaming..." : "Rename"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}