// to save notes
// localstorage : arcid + notes :  notes
// db : arcid and notes

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { motion } from "framer-motion";
import { BlockNoteView, defaultColorScheme } from "@blocknote/react";
import "@blocknote/react/style.css";
import { Copy, X } from "lucide-react";
import { Button } from "../ui/button";
import { getNotes, saveNotes } from "@/app/action";

function NotesModal({
  setShowNotes,
  arcid,
}: {
  setShowNotes: any;
  arcid: any;
}) {
  const [blocks, setBlocks] = useState<Block[] | undefined>();
  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");
  // console.log(initialContent);
  // Combined useEffect for initial setup
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getNotes(arcid);
        // console.log(res);
        // Assuming res contains the notes in the desired format
        setInitialContent(res[0]?.content || []);
      } catch (error) {
        console.error("Error fetching notes:", error);
        setInitialContent([]);
      }
    };

    fetchNotes();
  }, [arcid]); // Dependency on arcid ensures this runs only when arcid changes

  const editor = useMemo(() => {
    if (initialContent === "loading" || initialContent === undefined) {
      return undefined;
    }
    return BlockNoteEditor.create({
      initialContent:
        initialContent.length > 0
          ? initialContent
          : [
              {
                type: "paragraph",
                content: "Start typing your notes here...",
              },
            ],
    });
  }, [initialContent]);

  const save = useCallback(async () => {
    if (editor) {
      //@ts-ignore
      const response = await saveNotes(arcid, editor.document);
      // Handle response and possibly update state to reflect changes
      // console.log("Notes saved", response);
      // Optionally, fetch notes again to ensure UI is up-to-date
    }
  }, [arcid, editor]);

  // if (!editor) {
  //   return "Loading content...";
  // }
  const handleKeyPress = useCallback((event: any) => {
    if (event.shiftKey && event.key === "N") {
      event.preventDefault();
      setShowNotes(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    // Cleanup function
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);
  return (
    <div
      className="fixed inset-0 bg-gray-900 backdrop-blur-2xl flex justify-center bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {editor ? (
          <div className="min-h-[90vh] min-w-[90vw] lg:m-12 m-4  shadow-md flex flex-col  rounded-xl gap-3 ">
            <Card className="min-h-[90vh] min-w-[90vw] bg-[#111316]">
              <div className="m-10 flex justify-end gap-3">
                <Button onClick={save}>Save</Button>
                <button onClick={() => setShowNotes(false)}>
                  <X color="gray" />
                </button>
              </div>
              <BlockNoteView
                data-theming-css-variables-demo
                className="h-full pt-8"
                editor={editor}
                //@ts-ignore
                // theme={defaultColorScheme}
                onChange={() => setBlocks(editor.document)}
                data-theming-css-demo
              />
            </Card>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2 mt-32">
            <div className="h-5 w-5 animate-bounce rounded-full bg-green-500 [animation-delay:-0.3s]"></div>
            <div className="h-5 w-5 animate-bounce rounded-full bg-green-500 [animation-delay:-0.13s]"></div>
            <div className="h-5 w-5 animate-bounce rounded-full bg-green-500"></div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default NotesModal;
