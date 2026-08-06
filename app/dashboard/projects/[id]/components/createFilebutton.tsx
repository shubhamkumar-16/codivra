"use client";

import { useState } from "react";
import CreateFileModal from "./CreateFileModal";

type Props = {
  projectId: string;
};

export default function CreateFileButton({ projectId }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        + File
      </button>

      {open && (
        <CreateFileModal
          projectId={projectId}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}