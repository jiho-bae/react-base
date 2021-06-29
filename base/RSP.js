import React, { useState, useRef, useEffect } from "react";

const coords = {
  rock: "0",
  scissors: "-142px",
  paper: "-284px",
};

const scores = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

const computerPick = (coord) => {
  return Object.entries(coords).find((v) => v[1] === coord)[0];
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [imgCoord, setImgCoord] = useState(coords.rock);
  const interval = useRef();

  const startgame = (time) => {
    return setInterval(() => {
      if (imgCoord === coords.rock) {
        setImgCoord(coords.scissors);
      } else if (imgCoord === coords.scissors) {
        setImgCoord(coords.paper);
      } else {
        setImgCoord(coords.rock);
      }
    }, time);
  };

  useEffect(() => {
    interval.current = startgame(100);
    return () => {
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  const onClickBtn = (pick) => () => {
    if (!interval.current) return;
    clearInterval(interval.current);
    interval.current = 0;
    const myPick = scores[pick];
    const cPick = scores[computerPick(imgCoord)];
    const diff = myPick - cPick;
    if (!diff) {
      setResult("비겼습니다.");
    } else if ([-1, 2].includes(diff)) {
      setResult("이겼습니다.");
      setScore((prevState) => prevState + 1);
    } else {
      setResult("졌습니다.");
      setScore((prevState) => prevState - 1);
    }
    setTimeout(() => {
      interval.current = startgame(100);
    }, 2000);
  };

  return (
    <>
      <h4>가위바위보 게임</h4>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord}` }}></div>
      <div>
        <br />
        <button id="scissors" className="btn" onClick={onClickBtn("scissors")}>
          가위
        </button>
        <button id="rock" className="btn" onClick={onClickBtn("rock")}>
          바위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("paper")}>
          보
        </button>
      </div>
      <br />
      <div>{result}</div>
      <div>현재 점수 : {score}</div>
    </>
  );
};

export default RSP;
