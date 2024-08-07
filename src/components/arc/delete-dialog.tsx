import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteIcon, Trash2 } from "lucide-react";

function DeleteDialog({ handleDelete }: { handleDelete: any }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className=" w-full" variant="destructive">
            <Trash2 />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete arc</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this arc?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-end">
            <div className=" flex gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Close
                </Button>
              </DialogClose>
              <Button onClick={handleDelete} variant="destructive">
                Delete
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
