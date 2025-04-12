import Link from "next/link";

import { auth } from "@/auth";
import { Button } from "./ui/button";
import { handleSignOut } from "@/actions/auth.action";

export default async function Navbar() {
  const session = await auth();
  console.log({ session });
  return (
    <nav className="flex justify-between items-center py-3 px-4 bg-white shadow-md">
      <Link href="/" className="text-xl font-bold">
        Auth.js
      </Link>

      <div className="flex items-center gap-4">
        <h1>Hello {session?.user?.name}</h1>
        {!session ? (
          <Link href="/sign-in">
            <Button variant="default">Sign In</Button>
          </Link>
        ) : (
          <form action={handleSignOut}>
            <Button variant="default" type="submit">
              Sign Out
            </Button>
          </form>
        )}
      </div>
    </nav>
  );
}
