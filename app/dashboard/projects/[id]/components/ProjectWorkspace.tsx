"use client";

import MonacoEditor from "./MonacoEditor";
import { useState } from "react";

type FileType = {
  id: string;
  name: string;
  language: string;
  content: string;
};

type Props = {
  files: FileType[];
};


export default function ProjectWorkspace({
  files,
}: Props) {

  const [selectedFile, setSelectedFile] =
    useState<FileType | null>(null);


  async function openFile(file: FileType) {

    const res = await fetch(
      `/api/files/${file.id}`
    );

    const data = await res.json();

    setSelectedFile(data);
  }


  return (
    <div className="flex flex-1">


      {/* Explorer */}

      <div className="w-72 border-r bg-white p-4">

        <h2 className="mb-4 font-bold">
          Explorer
        </h2>


        {files.map((file) => (

          <div
            key={file.id}
            onClick={() => openFile(file)}
            className="cursor-pointer rounded px-3 py-2 hover:bg-gray-100"
          >

            📄 {file.name}

          </div>

        ))}


      </div>



      {/* Workspace */}

      <div className="flex-1 p-8">

        {!selectedFile ? (

          <div className="text-center text-gray-500">

            Select a file to open

          </div>

        ) : (

          <div>

            <h1 className="text-2xl font-bold">
              {selectedFile.name}
            </h1>


            <p className="mt-2 text-gray-500">
              Language: {selectedFile.language}
            </p>


           <div className="mt-6 overflow-hidden rounded-lg border">

            <MonacoEditor
             fileId={selectedFile.id}
             value={selectedFile.content || ""}
             language={selectedFile.language}
            />

         </div>


          </div>

        )}

      </div>


    </div>
  );
}