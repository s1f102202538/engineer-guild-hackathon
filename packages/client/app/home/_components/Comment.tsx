'use client';

import React, { useContext } from 'react';
import Image from 'next/image';
import { CommentContext, UserDataContext } from '../page';
import Typewriter from './Typewriter';

const Comment = () => {
  const comment = useContext(CommentContext);
  const userData = useContext(UserDataContext);

  // userData.name が存在する場合のみ表示する
  const displayComment = comment !== '' ? comment : userData?.name ? `${userData.name}さん、おかえりなさい!` : ''; // userData がまだない場合は空文字

  return (
    <div className="relative w-full max-w-lg h-64 p-4">
      <div className="bg-green-100 rounded-xl p-3 ml-8 overflow-auto break-words">
        <p className="font-semibold text-md">
          <Typewriter text={displayComment} speed={50} />
        </p>
      </div>
      {/* キャラクター */}
      <div className="absolute bottom-16 left-0 p-2 drop-shadow-xl">
        <Image src="/images/dog.png" alt="dog" width={60} height={60} className="mr-2 cursor-pointer" />
      </div>
    </div>
  );
};

export default Comment;
