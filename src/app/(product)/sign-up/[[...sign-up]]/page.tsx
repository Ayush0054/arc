import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  // const router = useRouter();

  // const handleAfterSignUp = () => {
  //   router.push("/");
  // };
  return (
    <div className="container flex justify-center items-center my-20">
      <SignUp afterSignUpUrl={"/home"} />
    </div>
  );
}
