import React from 'react';

const Chat = () => {
  return (
    // todo 体重を動的に表示できるようにする。
    <div>
      <div className="bg-white rounded-[24px] shadow-lg p-4 items-center">
        <div>
          <span className="ml-2 text-xl font-bold">チャットしたい内容を選んでください</span>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 m-2">
          <div className="bg-beige-100 hover:bg-beige-300 p-2 py-6 rounded-lg text-center">我慢カロリー</div>
          <div className="bg-beige-100 hover:bg-beige-300 p-2 py-6 rounded-lg text-center">我慢したい</div>
          <div className="bg-beige-100 hover:bg-beige-300 p-2 py-6 rounded-lg text-center">チェック</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
