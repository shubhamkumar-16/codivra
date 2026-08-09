"use client";

import CreateFileButton from "./createFilebutton";

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
};

export default function FileExplorer({
  files,
  folders,
  projectId,
  activeFileId,
  onFileSelect,
}: Props) {
  return (
    <aside className="w-full">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between border-b px-4 py-3">
        <h2 className="text-lg font-bold text-gray-900">
          Explorer
        </h2>

        <CreateFileButton projectId={projectId} />
      </div>

      {/* Empty State */}
      {folders.length === 0 && files.length === 0 && (
        <p className="px-4 text-sm text-gray-500">
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
      {files.map((file) => {
        const isActive = activeFileId === file.id;

        return (
          <button
            key={file.id}
            type="button"
            onClick={() => onFileSelect?.(file)}
            className={`mb-1 flex w-full items-center rounded px-4 py-2 text-left text-sm transition ${
              isActive
                ? "bg-blue-100 font-semibold text-blue-700"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <span className="mr-2">📄</span>

            <span className="truncate">
              {file.name}
            </span>
          </button>
        );
      })}
    </aside>
  );
}