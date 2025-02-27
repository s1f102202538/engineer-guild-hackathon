'use client';

import { Home, PawPrint, ChartNoAxesCombined } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const pathname = usePathname();

  const linkClasses = (href: string) => {
    const baseClasses = 'flex h-full w-full items-center justify-center hover:bg-green-700 active:bg-green-800';
    return pathname === href ? `${baseClasses} bg-green-900` : baseClasses;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 flex h-16 items-center justify-around bg-green-500 text-white rounded-t-xl">
      <Link href="/home" className={linkClasses('/home')}>
        <Home className="h-6 w-6" />
      </Link>
      <Link href="/chat" className={linkClasses('/chat')} aria-label="Menu">
        <PawPrint className="h-6 w-6" />
      </Link>
      <Link href="/chart" className={linkClasses('/settings')} aria-label="Notifications">
        <ChartNoAxesCombined className="h-6 w-6" />
      </Link>
    </nav>
  );
};

export default Navbar;
