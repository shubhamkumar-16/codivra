
"use client";

import { useState } from "react";
import CreateFileButton from "./createFilebutton";
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
};

type Props = {
  files: FileType[];
  folders: Folder[];  
  projectId: string;
  activeFileId?: string;
  onFileSelect?: (file: FileType) => void;

  // Called after a file has been successfully renamed
  onFileRenamed?: (fileId: string, newName: string) => void;
};

export default function FileExplorer({
  files,
  folders,
  projectId,
  activeFileId,
  onFileSelect,
  onFileRenamed,
}: Props) {
  const [renameFile, setRenameFile] =
    useState<FileType | null>(null);

  return (
    <>
      <aside className="w-full rounded-xl bg-white shadow">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-4">

          <h2 className="font-semibold text-gray-800">
            Explorer
          </h2>

          <CreateFileButton projectId={projectId} />

        </div>

        {/* Empty State */}
        {folders.length === 0 && files.length === 0 && (
          <p className="px-4 py-4 text-sm text-gray-500">
            No files yet
          </p>
        )}

        {/* Folder List */}
        {folders.map((folder) => (
          <div
            key={folder.id}
            className="mb-1 rounded px-4 py-2 font-medium text-gray-700 hover:bg-gray-100"
          >
            📁 {folder.name}
          </div>
        ))}

        {/* File List */}
        <div className="p-2">

          {files.map((file) => {
            const isActive = activeFileId === file.id;

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
                  onClick={() => onFileSelect?.(file)}
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
                  onClick={() => setRenameFile(file)}
                  className="mr-2 rounded px-2 py-1 text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-gray-200 hover:text-gray-800"
                  title="Rename file"
                >
                  ✎
                </button>

              </div>
            );
          })}

        </div>

      </aside>

      {/* Rename Modal */}
      {renameFile && (
        <RenameFileModal
          fileId={renameFile.id}
          currentName={renameFile.name}
          onClose={() => setRenameFile(null)}
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