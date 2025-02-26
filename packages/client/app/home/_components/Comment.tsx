import React from 'react';

const Comment = () => {
  return (
    <div className="relative w-full max-w-lg h-64 p-4">
      <div className="bg-green-100 rounded-xl p-3 ml-8 overflow-auto break-words">
        <p className="font-semibold text-md">
          texfasfaslfadslfjlsjfldsjf;lasdkfj;dlsdfsdfasfasfadfasdfasdfjfls;dkjf;ldjf;alsdjfl;asdjfladsjfads;lkfjldskjflksdjf;lksjfo;eijfn;;fjvo;dsfjl;sdjf;osdfj;osdjft
        </p>
      </div>
      {/* caractor */}
      <div className="absolute bottom-0 left-0 p-2">caractor</div>
    </div>
  );
};

export default Comment;
