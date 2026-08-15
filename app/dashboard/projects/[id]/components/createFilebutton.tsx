"use client";

import { useState } from "react";
import CreateFileModal from "./CreateFileModal";

type FileType = {
  id: string;
  name: string;
  language: string;
  content: string;
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

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        + File
      </button>

      {open && (
        <CreateFileModal
          projectId={projectId}
          onClose={() => setOpen(false)}
          onFileCreated={(file) => {
            // Send newly created file to FileExplorer
            onFileCreated?.(file);

            // Close modal
            setOpen(false);
          }}
        />
      )}
    </>
  );
}