"use client";

import { useState } from "react";
import MonacoEditor from "./MonacoEditor";
import Tabs from "./Tabs";

type FileType = {
  id: string;
  name: string;
  language: string;
  content: string;
};

type Props = {
  files: FileType[];
};

export default function ProjectWorkspace({ files }: Props) {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [openFiles, setOpenFiles] = useState<FileType[]>([]);

  function openFile(file: FileType) {
    const exists = openFiles.some((f) => f.id === file.id);

    if (!exists) {
      setOpenFiles((prev) => [...prev, file]);
    }

    setSelectedFile(file);
  }

  function selectTab(id: string) {
    const file = openFiles.find((f) => f.id === id);

    if (file) {
      setSelectedFile(file);
    }
  }

  return (
    <div className="flex h-[80vh] overflow-hidden rounded-xl border bg-white shadow">

      {/* ================= Explorer ================= */}

      <div className="w-72 border-r bg-white p-4">

        <h2 className="mb-4 text-lg font-bold">
          Explorer
        </h2>

        {files.length === 0 ? (
          <p className="text-sm text-gray-500">
            No files yet
          </p>
        ) : (
          files.map((file) => (
            <div
              key={file.id}
              onClick={() => openFile(file)}
              className={`mb-1 cursor-pointer rounded px-3 py-2 transition ${
                selectedFile?.id === file.id
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100"
              }`}
            >
              📄 {file.name}
            </div>
          ))
        )}

      </div>

      {/* ================= Workspace ================= */}

      <div className="flex flex-1 flex-col">

        {/* Tabs */}

        <Tabs
          files={openFiles.map((file) => ({
            id: file.id,
            name: file.name,
          }))}
          activeId={selectedFile?.id ?? ""}
          onSelect={selectTab}
        />

        {/* Editor */}

        <div className="flex-1 p-6">

          {!selectedFile ? (
            <div className="flex h-full items-center justify-center text-lg text-gray-500">
              Select a file from the Explorer
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold">
                {selectedFile.name}
              </h2>

              <p className="mt-2 text-gray-500">
                Language: {selectedFile.language}
              </p>

              <div className="mt-6 overflow-hidden rounded-lg border">
                <MonacoEditor
                  fileId={selectedFile.id}
                  value={selectedFile.content ?? ""}
                  language={selectedFile.language}
                />
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}