"use client";

import { useState } from "react";
import MonacoEditor from "./MonacoEditor";
import Tabs from "./Tabs";
import FileExplorer from "./FileExplorer";

type FileType = {
  id: string;
  name: string;
  language: string;
  content: string;
};

type FolderType = {
  id: string;
  name: string;
};

type Props = {
  files: FileType[];
  folders?: FolderType[];
  projectId?: string;
};

export default function ProjectWorkspace({
  files,
  folders = [],
  projectId = "",
}: Props) {
  const [selectedFile, setSelectedFile] =
    useState<FileType | null>(null);

  const [openFiles, setOpenFiles] =
    useState<FileType[]>([]);

  // Open a file
  function openFile(file: FileType) {
    const alreadyOpen = openFiles.some(
      (item) => item.id === file.id
    );

    if (!alreadyOpen) {
      setOpenFiles((prev) => [
        ...prev,
        file,
      ]);
    }

    setSelectedFile(file);
  }

  // Select a tab
  function selectTab(id: string) {
    const file = openFiles.find(
      (item) => item.id === id
    );

    if (file) {
      setSelectedFile(file);
    }
  }

  // Close a tab
  function closeTab(id: string) {
    const index = openFiles.findIndex(
      (file) => file.id === id
    );

    if (index === -1) {
      return;
    }

    const updatedFiles =
      openFiles.filter(
        (file) => file.id !== id
      );

    setOpenFiles(updatedFiles);

    if (selectedFile?.id === id) {
      const nextFile =
        updatedFiles[index] ??
        updatedFiles[index - 1] ??
        null;

      setSelectedFile(nextFile);
    }
  }

  // Rename a file
  function handleFileRenamed(
    fileId: string,
    newName: string
  ) {
    // Update open tabs
    setOpenFiles((prev) =>
      prev.map((file) =>
        file.id === fileId
          ? {
              ...file,
              name: newName,
            }
          : file
      )
    );

    // Update currently selected file
    setSelectedFile((prev) =>
      prev?.id === fileId
        ? {
            ...prev,
            name: newName,
          }
        : prev
    );
  }

  // Delete a file
  function handleFileDeleted(
    fileId: string
  ) {
    const index = openFiles.findIndex(
      (file) => file.id === fileId
    );

    // Remove deleted file from open tabs
    const updatedFiles =
      openFiles.filter(
        (file) => file.id !== fileId
      );

    setOpenFiles(updatedFiles);

    // If deleted file was currently selected
    if (selectedFile?.id === fileId) {
      const nextFile =
        updatedFiles[index] ??
        updatedFiles[index - 1] ??
        null;

      setSelectedFile(nextFile);
    }
  }

  return (
    <div className="flex h-full min-h-150 w-full">

      {/* File Explorer */}

      <div className="w-64 shrink-0 border-r bg-gray-50">

        <FileExplorer
          files={files}
          folders={folders}
          projectId={projectId}
          activeFileId={selectedFile?.id}
          onFileSelect={openFile}
          onFileRenamed={handleFileRenamed}
          onFileDeleted={handleFileDeleted}
        />

      </div>

      {/* Editor Area */}

      <div className="flex min-w-0 flex-1 flex-col">

        {/* Tabs */}

        <Tabs
          files={openFiles.map(
            (file) => ({
              id: file.id,
              name: file.name,
            })
          )}
          activeId={
            selectedFile?.id ?? ""
          }
          onSelect={selectTab}
          onClose={closeTab}
        />

        {/* Editor */}

        <div className="min-h-0 flex-1">

          {!selectedFile ? (

            <div className="flex h-full min-h-125 items-center justify-center text-gray-500">
              Select a file from the Explorer
            </div>

          ) : (

            <div className="flex h-full flex-col">

              {/* File Information */}

              <div className="border-b bg-white px-4 py-3">

                <h2 className="font-semibold">
                  {selectedFile.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {selectedFile.language}
                </p>

              </div>

              {/* Monaco Editor */}

              <div className="min-h-0 flex-1">

                <MonacoEditor
                  key={selectedFile.id}
                  fileId={selectedFile.id}
                  value={selectedFile.content}
                  language={selectedFile.language}
                />

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}