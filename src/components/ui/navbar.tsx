import Link from "next/link";
import { Button } from "./button";

const Navbar = () => {
  return (
    <header className="container mx-auto py-4 flex justify-between">
      <Link href="/"><h2 className="text-2xl font-semibold">Workdesk</h2></Link>
      <nav>
        <ul className="flex gap-4 items-center">
          <li className="">
            <Link href="/">Home</Link>
          </li>
          <li className="">
            <Link href="/">About</Link>
          </li>
          <li className="">
            <Link href="/">Contact</Link>
          </li>
          <li className="">
            <Link href="/"></Link>
          </li>
          <li className="">
            <Button>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </li>
          <li className="">
            <Button variant="secondary">
              <Link href="/login">Login</Link>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
