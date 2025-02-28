import React from 'react';
import Image from 'next/image';
import { useContext } from 'react';
import { CommentContext } from '../page';
import { UserDataContext } from '../page';

const Comment = () => {
  const comment = useContext(CommentContext);
  const userData = useContext(UserDataContext);

  const displayComment = comment !== '' ? comment : `${userData?.name}さん、おかえりなさい!`;

  return (
    <div className="relative w-full max-w-lg h-64 p-4 comment">
      <div className="bg-green-100 rounded-xl p-3 ml-8 overflow-auto break-words">
        <p className="font-semibold text-md">{displayComment}</p>
      </div>
      {/* caractor */}
      <div className="absolute bottom-16 left-0 p-2 drop-shadow-xl">
        <Image src="/images/dog.png" alt="dog" width={60} height={60} className="mr-2 cursor-pointer" />
      </div>
    </div>
  );
};

export default Comment;
