"use client";

type FileTab = {
  id: string;
  name: string;
};

type Props = {
  files: FileTab[];
  activeId: string;
  onSelect: (id: string) => void;
};

export default function Tabs({
  files,
  activeId,
  onSelect,
}: Props) {
  if (files.length === 0) {
    return (
      <div className="border-b bg-gray-900 px-4 py-3 text-sm text-gray-400">
        No file opened
      </div>
    );
  }

  return (
    <div className="flex overflow-x-auto border-b bg-gray-900">

      {files.map((file) => (
        <button
          key={file.id}
          onClick={() => onSelect(file.id)}
          className={`border-r px-5 py-3 text-sm whitespace-nowrap transition ${
            activeId === file.id
              ? "bg-gray-800 text-white border-b-2 border-blue-500"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"
          }`}
        >
          📄 {file.name}
        </button>
      ))}

    </div>
  );
}