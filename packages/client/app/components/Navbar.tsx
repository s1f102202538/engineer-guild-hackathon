import { Home, Menu, Bell } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around bg-[#8BC34A] text-white">
      <Link href="/" className="flex h-full w-full items-center justify-center hover:bg-[#7CB342] active:bg-[#689F38]">
        <Home className="h-6 w-6" />
      </Link>
      <button
        className="flex h-full w-full items-center justify-center hover:bg-[#7CB342] active:bg-[#689F38]"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6" />
      </button>
      <button
        className="flex h-full w-full items-center justify-center hover:bg-[#7CB342] active:bg-[#689F38]"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6" />
      </button>
    </nav>
  );
};

export default Navbar;
