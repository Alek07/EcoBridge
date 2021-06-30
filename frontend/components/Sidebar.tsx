import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

function Sidebar() {
  // routing de next
  const router = useRouter();

  return (
    <aside className="bg-gray-300 sm:w-1/3 xl:w-1/5 sm:min-h-screen p-5">
      <div className="text-center mb-5">
        <Image src="/logoAIG.png" alt="Logo AIG" width="auto" height="95%" />
        <p className="text-gray-800 text-xl text-center font-bold">
          EcoBridge
        </p>
      </div>

      <nav className="mt-5 list-none">
        <li
          className={
            router.pathname === "/aboutus"
              ? "bg-gray-800 p-3 rounded text-white"
              : "p-2"
          }
        >
          <Link href="/">
            <a className="block">ABOUT US</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/resources"
              ? "bg-gray-800 p-3 rounded text-white"
              : "p-2"
          }
        >
          <Link href="/resources">
            <a className="block">RESOURCES</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/learn"
              ? "bg-gray-800 p-3 rounded text-white"
              : "p-2"
          }
        >
          <Link href="/learn">
            <a className="block">LEARN</a>
          </Link>
        </li>
        <li
          className={
            router.pathname === "/events"
              ? "bg-gray-800 p-3 rounded text-white"
              : "p-2"
          }
        >
          <Link href="/events">
            <a className="block">EVENTS</a>
          </Link>
        </li>
      </nav>
    </aside>
  );
}

export default Sidebar;
