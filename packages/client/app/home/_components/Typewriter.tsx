'use client';

import React, { useState, useEffect } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number; // 1文字表示にかかる時間（ミリ秒、デフォルトは50ms）
};

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    setDisplayedText(''); // テキスト更新時にリセット
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex >= text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <span>{displayedText}</span>;
};

export default Typewriter;
