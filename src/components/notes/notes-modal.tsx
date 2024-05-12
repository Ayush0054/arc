import React from "react";
import { Card } from "@/components/ui/card";
import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { motion } from "framer-motion";

import {
  BlockNoteView,
  defaultColorScheme,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { useState } from "react";
import { CopyIcon, StarsIcon, X } from "lucide-react";
import { Button } from "../ui/button";

function NotesModal({ setShowNotes }: { setShowNotes: any }) {
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
    <div
      className="fixed inset-0 bg-gray-100 flex justify-center bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <div className=" min-h-[90vh] min-w-[90vw] m-12  border shadow-md  flex flex-col bg-white rounded-xl  gap-3 border-gray-300">
          <Card className=" min-h-[90vh] min-w-[90vw]   ">
            <div className=" m-10 flex justify-end gap-3 ">
              <Button className=" flex gap-2 font-bold text-base">
                Ai <StarsIcon />
              </Button>
              <Button variant="outline" className=" flex gap-1">
                Copy <CopyIcon size={18} />
              </Button>
              <button
                onClick={() => {
                  setShowNotes(false);
                }}
              >
                <X />
              </button>
            </div>
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
        </div>
      </motion.div>
    </div>
  );
}

export default NotesModal;

// to save notes
// localstorage : arcid + notes :  notes
// db : arcid and notes
