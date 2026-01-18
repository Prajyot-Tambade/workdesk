import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center gap-4 h-screen">
      <h1>Hello World!</h1>
      <div className="space-x-4">
        <Button >
          <Link href="/login">Login</Link>
        </Button>
        <Button >
          <Link href="/login">SignUp</Link>
        </Button>
      </div>
    </main>
  );
}
