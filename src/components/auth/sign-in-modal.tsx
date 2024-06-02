import { SignIn, SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { X } from "lucide-react";

function SignInModal({ setAuthModal }: { setAuthModal: any }) {
  return (
    <div
      className="fixed inset-0 bg-gray-900 backdrop-blur-xl flex justify-center items-center bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className=" border shadow-md h-[200px]   max-h-[1000px] lg:w-[200px] flex flex-col  bg-black/40 rounded-xl mx-8 gap-3 border-gray-800">
        <div className=" m-4 flex justify-end ">
          <button
            onClick={() => {
              setAuthModal(false);
            }}
          >
            <X />
          </button>
        </div>
        <div className="container flex justify-center items-center mt-4 ">
          {/* <SignIn afterSignInUrl={"/home"} mode= /> */}
          <SignInButton mode="modal" afterSignInUrl={"/home"}>
            <Button variant="outline">Sign in</Button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}

export default SignInModal;
