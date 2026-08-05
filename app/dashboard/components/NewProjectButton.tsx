"use client";

import { useState } from "react";
import CreateProjectModal from "./CreateProjectModal";

export default function NewProjectButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        + New Project
      </button>

      {open && (
        <CreateProjectModal
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}