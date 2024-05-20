import React, { useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { motion } from "framer-motion";

import {
  BlockNoteView,
  defaultColorScheme,
  useCreateBlockNote,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { getNotes, saveNotes } from "@/app/actions/action";

function NotesModal({
  setShowNotes,
  arcid,
  notes,
}: {
  setShowNotes: any;
  arcid: any;
  notes: any;
}) {
  const [blocks, setBlocks] = useState<Block[]>();
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");
  // const editor = useCreateBlockNote({
  //   initialContent: [
  //     {
  //       type: "paragraph",
  //       content: "Welcome to this demo!",
  //     },
  //     {
  //       type: "heading",
  //       content: "This is a heading block",
  //     },
  //     {
  //       type: "paragraph",
  //       content: "This is a paragraph block",
  //     },
  //     {
  //       type: "paragraph",
  //     },
  //   ],
  // });
  console.log(notes[0]?.content);
  const callNotes = async () => {
    const res = await getNotes(arcid);
    console.log(res);
  };
  const setNotes = async () => {
    setInitialContent(notes[0]?.content);
  };

  useEffect(() => {
    setNotes();
    callNotes();
  }, []);
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  if (editor === undefined) {
    return "Loading content...";
  }
  console.log(editor.document);
  const save = async () => {
    //@ts-ignore
    const response = await saveNotes(arcid, editor.document);
    console.log(response);
  };
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
              <Button onClick={save}>Save</Button>

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
