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
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { getNotes, saveNotes } from "@/app/actions/action";

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

  // Combined useEffect for initial setup
  useEffect(() => {
    const fetchNotes = async () => {
      const res = await getNotes(arcid);
      console.log(res);
      // Assuming res contains the notes in the desired format
      setInitialContent(res[0]?.content || []);
    };

    fetchNotes();
  }, [arcid]); // Dependency on arcid ensures this runs only when arcid changes

  const editor = useMemo(() => {
    if (initialContent === "loading" || initialContent === undefined) {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  const save = useCallback(async () => {
    if (editor) {
      //@ts-ignore
      const response = await saveNotes(arcid, editor.document);
      // Handle response and possibly update state to reflect changes
      console.log("Notes saved", response);
      // Optionally, fetch notes again to ensure UI is up-to-date
    }
  }, [arcid, editor]);

  if (!editor) {
    return "Loading content...";
  }

  return (
    <div
      className="fixed inset-0 bg-gray-100 flex justify-center bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <motion.div
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="min-h-[90vh] min-w-[90vw] m-12 border shadow-md flex flex-col bg-white rounded-xl gap-3 border-gray-300">
          <Card className="min-h-[90vh] min-w-[90vw]">
            <div className="m-10 flex justify-end gap-3">
              <Button onClick={save}>Save</Button>
              <button onClick={() => setShowNotes(false)}>
                <X />
              </button>
            </div>
            <BlockNoteView
              className="h-full pt-8"
              editor={editor}
              //@ts-ignore
              theme={defaultColorScheme}
              onChange={() => setBlocks(editor.document)}
              data-theming-css-demo
            />
          </Card>
        </div>
      </motion.div>
    </div>
  );
}

export default NotesModal;
