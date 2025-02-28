// Tutorial.tsx
'use client';
import React, {useState,useEffect} from 'react';
import Joyride, { Step, CallBackProps } from 'react-joyride';

const Tutorial = () => {
  const [run, setRun] = useState(false);

  // 初回訪問の場合にチュートリアルを表示する
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setRun(true);
    }
  }, []);

  const steps: Step[] = [
    {
      target: '.check-weight',
      content: (
        <>
          ここでは体重チェックができ、
          <br />
          現在の体重と目標体重が確認できます！
        </>
      ),
    },
    {
      target: '.endure-calories',
      content: (
        <>
          ここで今日の我慢カロリーを
          <br />
          確認しましょう！
        </>
      ),
    },
    {
      target: '.add-endure-calories',
      content: (
        <>
          記録ボタンで我慢できた食品を入力すると
          <br />
          我慢カロリーを追加できます！
          <br />
          たくさん記録しましょう！
        </>
      ),
    },
    {
      target: '.comment',
      content: (
        <>
          我慢できると
          <br />
          キャラクターがあなたを褒めてくれます！
        </>
      ),
    },
    {
      target: '.navbar-chat',
      content: (
        <>
          こちらはチャットページです！
          <br />
          おやつを食べたくなった時や夜食したくなった時は
          <br />
          ここで会話してみましょう！
        </>
      ),
    },
    {
      target: '.navbar-chart',
      content: (
        <>
          こちらはチャートページです！
          <br />
          今まで我慢できたカロリーを
          <br />
          確認しましょう！
        </>
      ),
    },
  ];


  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (['finished', 'skipped'].includes(status)) {
      setRun(false);
      localStorage.setItem('hasSeenTutorial', 'true');
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      continuous={true}
      scrollToFirstStep={true}
      showSkipButton={true}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#08c4a6', // 緑色
          zIndex: 10000,
        },
        buttonNext: {
          backgroundColor: '#08c4a6',
        },
      }}
    />
  );
};

export default Tutorial;
