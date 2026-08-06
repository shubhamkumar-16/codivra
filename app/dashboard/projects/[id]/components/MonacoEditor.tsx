"use client";

import Editor from "@monaco-editor/react";


type Props = {
  value: string;
  language: string;
};


export default function MonacoEditor({
  value,
  language,
}: Props) {


  return (
    <Editor
      height="70vh"
      language={language}
      value={value}
      theme="vs-dark"

      options={{
        minimap: {
          enabled: true,
        },

        fontSize: 16,

        automaticLayout: true,
      }}
    />
  );
}