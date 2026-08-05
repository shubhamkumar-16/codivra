"use client";

type File = {
  id: string;
  name: string;
  language: string;
};


type Props = {
  files: File[];
};


export default function FileExplorer({ files }: Props) {

  return (
    <div className="w-64 border-r bg-white p-4">

      <h2 className="mb-4 font-bold">
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
            className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100"
          >

            📄 {file.name}

          </div>

        ))

      )}

    </div>
  );
}