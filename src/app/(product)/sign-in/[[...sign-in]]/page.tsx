import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="container flex justify-center items-center  my-20">
      <SignIn afterSignInUrl={"/home"} />
    </div>
  );
}
