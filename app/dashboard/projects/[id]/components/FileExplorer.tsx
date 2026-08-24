"use client";

import { useState } from "react";
import CreateFileButton from "./createFilebutton";
import CreateFolderButton from "./createfolderbutton";
import RenameFileModal from "./RenameFileModal";

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
  files: FileType[];
  folders: Folder[];
  projectId: string;
  activeFileId?: string;

  onFileSelect?: (file: FileType) => void;

  onFileRenamed?: (
    fileId: string,
    newName: string
  ) => void;

  onFileDeleted?: (
    fileId: string
  ) => void;

  onFileCreated?: (
    file: FileType
  ) => void;

  onFolderCreated?: (
    folder: Folder
  ) => void;
};

export default function FileExplorer({
  files,
  folders,
  projectId,
  activeFileId,
  onFileSelect,
  onFileRenamed,
  onFileDeleted,
  onFileCreated,
  onFolderCreated,
}: Props) {
  const [renameFile, setRenameFile] =
    useState<FileType | null>(null);

  const [deletingFileId, setDeletingFileId] =
    useState<string | null>(null);

  // =========================
  // Delete File
  // =========================

  async function handleDeleteFile(
    file: FileType
  ) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${file.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingFileId(file.id);

      const response = await fetch(
        `/api/projects/${projectId}/files`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fileId: file.id,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete file"
        );
      }

      onFileDeleted?.(file.id);
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        window.alert(error.message);
      } else {
        window.alert(
          "Failed to delete file"
        );
      }
    } finally {
      setDeletingFileId(null);
    }
  }

  // =========================
  // File Created
  // =========================

  function handleFileCreated(
    file: FileType
  ) {
    onFileCreated?.(file);
  }

  // =========================
  // Folder Created
  // =========================

  function handleFolderCreated(
    folder: Folder
  ) {
    onFolderCreated?.(folder);
  }

  // =========================
  // Render File
  // =========================

  function renderFile(file: FileType) {
    const isActive =
      activeFileId === file.id;

    const isDeleting =
      deletingFileId === file.id;

    return (
      <div
        key={file.id}
        className={`group mb-1 flex items-center rounded transition ${
          isActive
            ? "bg-blue-100"
            : "hover:bg-gray-100"
        }`}
      >
        {/* File */}

        <button
          type="button"
          onClick={() =>
            onFileSelect?.(file)
          }
          disabled={isDeleting}
          className={`flex min-w-0 flex-1 items-center px-2 py-2 text-left text-sm ${
            isActive
              ? "font-semibold text-blue-700"
              : "text-gray-700"
          }`}
        >
          <span className="mr-2">
            📄
          </span>

          <span className="truncate">
            {file.name}
          </span>
        </button>

        {/* Rename */}

        <button
          type="button"
          onClick={() =>
            setRenameFile(file)
          }
          disabled={isDeleting}
          className="mr-1 rounded px-2 py-1 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-200 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-30"
          title="Rename file"
        >
          ✎
        </button>

        {/* Delete */}

        <button
          type="button"
          onClick={() =>
            handleDeleteFile(file)
          }
          disabled={isDeleting}
          className="mr-2 rounded px-2 py-1 text-red-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-100 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          title="Delete file"
        >
          {isDeleting
            ? "..."
            : "🗑"}
        </button>
      </div>
    );
  }

  // =========================
  // Root Files
  // =========================

  const rootFiles = files.filter(
    (file) =>
      !file.folderId
  );

  return (
    <>
      <aside className="w-full rounded-xl bg-white shadow">

        {/* =========================
            Header
        ========================= */}

        <div className="flex items-center justify-between border-b px-4 py-4">

          <h2 className="font-semibold text-gray-800">
            Explorer
          </h2>

          <div className="flex items-center gap-2">

            <CreateFolderButton
              projectId={projectId}
              onCreated={
                handleFolderCreated
              }
            />

            <CreateFileButton
              projectId={projectId}
              onFileCreated={
                handleFileCreated
              }
            />

          </div>

        </div>

        {/* =========================
            Empty State
        ========================= */}

        {folders.length === 0 &&
          files.length === 0 && (
            <p className="px-4 py-4 text-sm text-gray-500">
              No files yet
            </p>
          )}

        {/* =========================
            Folders
        ========================= */}

        {folders.length > 0 && (
          <div className="p-2">

            {folders.map((folder) => {

              const folderFiles =
                files.filter(
                  (file) =>
                    file.folderId ===
                    folder.id
                );

              return (
                <div
                  key={folder.id}
                  className="mb-2"
                >

                  {/* Folder */}

                  <div className="flex items-center rounded px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">

                    <span className="mr-2">
                      📁
                    </span>

                    <span className="truncate">
                      {folder.name}
                    </span>

                  </div>

                  {/* Files inside folder */}

                  {folderFiles.length > 0 && (
                    <div className="ml-5 border-l pl-2">
                      {folderFiles.map(
                        (file) =>
                          renderFile(file)
                      )}
                    </div>
                  )}

                </div>
              );
            })}

          </div>
        )}

        {/* =========================
            Root Files
        ========================= */}

        {rootFiles.length > 0 && (
          <div className="p-2">

            {rootFiles.map(
              (file) =>
                renderFile(file)
            )}

          </div>
        )}

      </aside>

      {/* =========================
          Rename Modal
      ========================= */}

      {renameFile && (
        <RenameFileModal
          projectId={projectId}
          fileId={renameFile.id}
          currentName={renameFile.name}
          onClose={() =>
            setRenameFile(null)
          }
          onRenamed={(newName) => {

            onFileRenamed?.(
              renameFile.id,
              newName
            );

            setRenameFile(null);
          }}
        /> 
      )}
    </>
  ); 
}  