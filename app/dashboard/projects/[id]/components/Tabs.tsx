"use client";

type FileTab = {
  id: string;
  name: string;
};

type Props = {
  files: FileTab[];
  activeId: string;
  onSelect: (id: string) => void; 
  onClose: (id: string) => void;
};

export default function Tabs({
  files,
  activeId,
  onSelect,
  onClose,
}: Props) {
  return (
    <div className="flex overflow-x-auto border-b bg-gray-900">
      {files.map((file) => {
        const isActive = activeId === file.id;

        return (
          <div
            key={file.id}
            className={`flex items-center border-r border-gray-700 ${
              isActive
                ? "bg-gray-800"
                : "bg-gray-900"
            }`}
          >
            <button
              type="button"
              onClick={() => onSelect(file.id)}
              className={`px-4 py-3 text-sm whitespace-nowrap ${
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              📄 {file.name}
            </button>

            <button
              type="button"
              onClick={() => onClose(file.id)}
              className="mr-2 rounded px-2 py-1 text-gray-400 hover:bg-gray-700 hover:text-white"
              title={`Close ${file.name}`}
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
}