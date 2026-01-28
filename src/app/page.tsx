import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col justify-center items-center gap-4 h-[90vh]">
        <h1>Hello World!</h1>
        <div className="space-x-4">
          <Button>
            <Link href="/login">Login</Link>
          </Button>
          <Button>
            <Link href="/login">SignUp</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
