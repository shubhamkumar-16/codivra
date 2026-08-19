"use client";

import { useEffect, useState } from "react";
import CreateFileModal from "./CreateFileModal";

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

  // Called when a file is successfully created
  onFileCreated?: (file: FileType) => void;
};

export default function CreateFileButton({
  projectId,
  onFileCreated,
}: Props) {
  const [open, setOpen] = useState(false);

  const [folders, setFolders] = useState<
    FolderType[]
  >([]);

  const [loadingFolders, setLoadingFolders] =
    useState(false);

  const [folderError, setFolderError] =
    useState("");

  // =========================
  // Load Folders
  // =========================

  useEffect(() => {
    if (!open) {
      return;
    }

    async function loadFolders() {
      try {
        setLoadingFolders(true);
        setFolderError("");

        const res = await fetch(
          `/api/projects/${projectId}/folders`
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(
            data.error ||
              "Failed to load folders"
          );
        }

        setFolders(data);

      } catch (error) {
        console.error(
          "LOAD FOLDERS ERROR:",
          error
        );

        if (error instanceof Error) {
          setFolderError(error.message);
        } else {
          setFolderError(
            "Failed to load folders"
          );
        }

      } finally {
        setLoadingFolders(false);
      }
    }

    loadFolders();
  }, [open, projectId]);

  return (
    <>
      {/* =========================
          Create File Button
      ========================= */}

      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        + File
      </button>

      {/* =========================
          Create File Modal
      ========================= */}

      {open && (
        <>
          {loadingFolders ? (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="rounded-xl bg-white px-6 py-5 shadow-lg">
                <p className="text-gray-700">
                  Loading folders...
                </p>
              </div>
            </div>
          ) : (
            <CreateFileModal
              projectId={projectId}
              folders={folders}
              onClose={() => {
                setOpen(false);
                setFolderError("");
              }}
              onFileCreated={(file) => {
                // Send newly created file
                // to FileExplorer
                onFileCreated?.(file);

                // Close modal
                setOpen(false);
              }}
            />
          )}
        </>
      )}

      {/* =========================
          Folder Error
      ========================= */}

      {folderError && open && (
        <div className="fixed bottom-5 right-5 z-[60] rounded-lg bg-red-50 px-4 py-3 shadow-lg">
          <p className="text-sm text-red-600">
            {folderError}
          </p>
        </div>
      )}
    </>
  );
}