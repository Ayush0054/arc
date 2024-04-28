"use client";
import { Card } from "@/components/ui/card";
import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import {
  BlockNoteView,
  defaultColorScheme,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { useState } from "react";

function Page() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: "Welcome to this demo!",
      },
      {
        type: "heading",
        content: "This is a heading block",
      },
      {
        type: "paragraph",
        content: "This is a paragraph block",
      },
      {
        type: "paragraph",
      },
    ],
  });
  return (
    <Card className=" min-h-[90vh]   m-8">
      <BlockNoteView
        className=" h-full pt-8 "
        editor={editor}
        //@ts-ignore
        theme={defaultColorScheme}
        onChange={() => {
          setBlocks(editor.document);
        }}
        data-theming-css-demo
      />
    </Card>
  );
}

export default Page;
