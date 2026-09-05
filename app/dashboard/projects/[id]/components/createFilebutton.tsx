"use client";

import { useState } from "react";
import CreateFileModal from "./CreateFileModal";

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
  onFileCreated?: (file: FileType) => void;
};

export default function CreateFileButton({
  projectId,
  folders,
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
          folders={folders}
          onClose={() => setOpen(false)}
          onFileCreated={(file) => {
            onFileCreated?.(file);
            setOpen(false);
          }}
        />
      )}
    </>
  );
}