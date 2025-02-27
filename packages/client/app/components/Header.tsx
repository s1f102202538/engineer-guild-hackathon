import React from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';

type HeaderProps = {
  title: string;
};

const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between bg-gradient-to-r from-green-400 to-green-500 p-4 shadow-md z-50">
        {/* ロゴを左端に配置し、/speakにリダイレクト */}
        <div className="flex items-center">
          <Link href="/home" aria-label="Navigate to Speak Page">
            {/* <Image src="/images/logo.png" alt="Logo" width={40} height={40} className="mr-2 cursor-pointer" />
             */}
            Logo
          </Link>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2">
          <h1 className="text-lg font-bold text-white whitespace-nowrap text-center">{title}</h1>
        </div>

        {/* アイコンを右端に配置 */}
        <div className="flex items-center space-x-2">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>
      <div className="h-16"></div> {/* ヘッダーの高さ分の余白を追加 */}
    </>
  );
};

export default Header;
