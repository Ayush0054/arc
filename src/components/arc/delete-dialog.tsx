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

function DeleteDialog({ handleDelete }: { handleDelete: any }) {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className=" w-full" variant="destructive">
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete arc</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this arc?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="sm:justify-start">
            <div className=" flex gap-2">
              <Button onClick={handleDelete} variant="destructive">
                Delete
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeleteDialog;
