"use client";

import { useState } from "react";

type Folder = {
  id: string;
  name: string;
};

type FileType = {
  id: string;
  name: string;
  language: string;
  content: string;
  folderId?: string | null;
};

type Props = {
  projectId: string;
  folders: Folder[];
  onClose: () => void;
  onFileCreated?: (file: FileType) => void;
};

export default function CreateFileModal({
  projectId,
  folders,
  onClose,
  onFileCreated,
}: Props) {
  const [name, setName] = useState("");
  const [language, setLanguage] = useState("typescript");
  const [folderId, setFolderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("File name is required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `/api/projects/${projectId}/files`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            language,
            folderId: folderId || null,
          }),
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(
          "Server returned an invalid response"
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to create file"
        );
      }

      onFileCreated?.(data);
      onClose();
    } catch (error) {
      console.error("CREATE FILE ERROR:", error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Failed to create file");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Create New File
          </h2>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="text-xl text-gray-400 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* File Name */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              File Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="e.g. main.ts"
              disabled={loading}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Language */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Programming Language
            </label>

            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value)
              }
              disabled={loading}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

          {/* Folder */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Folder
            </label>

            <select
              value={folderId}
              onChange={(event) =>
                setFolderId(event.target.value)
              }
              disabled={loading}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            >
              <option value="">
                Root / No Folder
              </option>

              {folders.map((folder) => (
                <option
                  key={folder.id}
                  value={folder.id}
                >
                  📁 {folder.name}
                </option>
              ))}
            </select>
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create File"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}