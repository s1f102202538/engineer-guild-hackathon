import { Plus } from 'lucide-react';
import React from 'react';

const PostButton = () => {
  return (
    <button
      className="fixed bottom-20 right-4 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#8BC34A] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      aria-label="Add new item"
    >
      <Plus className="h-6 w-6" />
    </button>
  );
};

export default PostButton;
