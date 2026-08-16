"use client";

import { useState } from "react";

type FileType = {
  id: string;
  name: string;
  language: string;
  content: string;
  folderId?: string | null;
};

type FolderType = {
  id: string;
  name: string;
};

type Props = {
  projectId: string;
  onClose: () => void;
  onFileCreated?: (file: FileType) => void;

  // Folders available in the current project
  folders?: FolderType[];
};

export default function CreateFileModal({
  projectId,
  onClose,
  onFileCreated,
  folders = [],
}: Props) {
  const [name, setName] = useState("");
  const [language, setLanguage] =
    useState("typescript");

  // null = project root
  const [folderId, setFolderId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  // =========================
  // Create File
  // =========================

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("File name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      console.log("Creating file...");
      console.log("Project ID:", projectId);
      console.log("File name:", trimmedName);
      console.log("Language:", language);
      console.log("Folder ID:", folderId);

      const res = await fetch(
        `/api/projects/${projectId}/files`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: trimmedName,
            language,

            // null means project root
            folderId,
          }),
        }
      );

      /*
       * Read response as text first.
       *
       * This prevents:
       * Unexpected token '<'
       *
       * if Next.js returns an HTML error page.
       */

      const responseText =
        await res.text();

      let data:
        | FileType
        | { error?: string }
        | null = null;

      try {
        data = responseText
          ? JSON.parse(responseText)
          : null;
      } catch {
        console.error(
          "API returned non-JSON response:",
          responseText
        );

        throw new Error(
          `API returned an invalid response (${res.status}). Check the API route.`
        );
      }

      // =========================
      // API Error
      // =========================

      if (!res.ok) {
        const errorMessage =
          data &&
          typeof data === "object" &&
          "error" in data &&
          data.error
            ? data.error
            : `Failed to create file (${res.status})`;

        throw new Error(errorMessage);
      }

      // =========================
      // Validate response
      // =========================

      if (
        !data ||
        typeof data !== "object" ||
        !("id" in data)
      ) {
        throw new Error(
          "File was created but the API returned an invalid file response."
        );
      }

      const createdFile =
        data as FileType;

      console.log(
        "File created successfully:",
        createdFile
      );

      // =========================
      // Send file to parent
      // =========================

      onFileCreated?.(createdFile);

      // =========================
      // Close modal
      // =========================

      onClose();

    } catch (err) {
      console.error(
        "CREATE FILE ERROR:",
        err
      );

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(
          "Failed to create file"
        );
      }

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6">

        {/* =========================
            Header
        ========================= */}

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold text-black">
            Create File
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-xl text-gray-500 hover:text-gray-900"
          >
            ✕
          </button>

        </div>

        {/* =========================
            Form
        ========================= */}

        <form onSubmit={handleSubmit}>

          {/* =========================
              File Name
          ========================= */}

          <label className="mb-1 block text-sm font-medium text-gray-700">
            File Name
          </label>

          <input
            className="mb-4 w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-blue-500"
            placeholder="app.ts"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          {/* =========================
              Language
          ========================= */}

          <label className="mb-1 block text-sm font-medium text-gray-700">
            Language
          </label>

          <select
            className="mb-4 w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-blue-500"
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
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

          {/* =========================
              Folder
          ========================= */}

          <label className="mb-1 block text-sm font-medium text-gray-700">
            Folder
          </label>

          <select
            className="mb-4 w-full rounded-lg border px-3 py-2 text-black outline-none focus:border-blue-500"
            value={folderId ?? ""}
            onChange={(e) => {
              const value = e.target.value;

              setFolderId(
                value === ""
                  ? null
                  : value
              );
            }}
          >

            {/* Project Root */}

            <option value="">
              Project Root
            </option>

            {/* Folders */}

            {folders.map((folder) => (
              <option
                key={folder.id}
                value={folder.id}
              >
                📁 {folder.name}
              </option>
            ))}

          </select>

          {/* =========================
              Folder information
          ========================= */}

          {folders.length === 0 && (
            <p className="mb-4 text-xs text-gray-500">
              No folders available. The file will be created in the project root.
            </p>
          )}

          {/* =========================
              Error
          ========================= */}

          {error && (
            <div className="mb-3 rounded-lg bg-red-50 px-3 py-2">

              <p className="text-sm text-red-600">
                {error}
              </p>

            </div>
          )}

          {/* =========================
              Create
          ========================= */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create File"}
          </button>

        </form>

      </div>

    </div>
  );
}