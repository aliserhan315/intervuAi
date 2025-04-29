import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAuthenticated, signOut } from "@/lib/actions/auth.action"; // Import signOut

const Rootlayout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      <nav className="flex justify-between ">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100 font-semibold text-lg">IntervuAI</h2>
        </Link>

        <form action={signOut}>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 cursor-pointer rounded-md transition-colors duration-200"
          >
            Sign Out
          </button>
        </form>
      </nav>

      {children}
    </div>
  );
};

export default Rootlayout;
