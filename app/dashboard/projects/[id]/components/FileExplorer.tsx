"use client";

import CreateFileButton from "./createFilebutton";

type Folder = {
  id: string;
  name: string;
};

type File = {
  id: string;
  name: string;
  language: string;
};

type Props = {
  files: File[];
  folders: Folder[];
  projectId: string;
};

export default function FileExplorer({
  files,
  folders,
  projectId,
}: Props) {
  return (
    <aside className="w-72 border-r bg-white p-4">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">

        <h2 className="text-lg font-bold">
          Explorer
        </h2>

        <CreateFileButton projectId={projectId} />

      </div>

      {/* Empty State */}
      {folders.length === 0 && files.length === 0 && (
        <p className="text-sm text-gray-500">
          No files yet
        </p>
      )}

      {/* Folder List */}
      {folders.map((folder) => (
        <div
          key={folder.id}
          className="mb-2 rounded px-2 py-2 font-medium hover:bg-gray-100"
        >
          📁 {folder.name}
        </div>
      ))}

      {/* File List */}
      {files.map((file) => (
        <div
          key={file.id}
          className="cursor-pointer rounded px-2 py-2 hover:bg-gray-100"
        >
          📄 {file.name}
        </div>
      ))}
    </aside>
  );
}