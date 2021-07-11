import React, { useState, useRef } from "react";

const ReactionSpeed = () => {
  const [colorState, setColorState] = useState("blue");
  const [message, setMessage] = useState("클릭하면 시작합니다.");
  const [result, setResult] = useState([]);
  const timeout = useRef(null),
    startTime = useRef(null),
    endTime = useRef(null);

  const onClick = () => {
    if (colorState === "blue") {
      endTime.current = 0;
      setColorState("red");
      setMessage("초록불로 바뀌면 클릭하세요");
      timeout.current = setTimeout(() => {
        setColorState("green");
        setMessage("클릭하세요!");
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (colorState === "red") {
      console.log("rerereere");
      setColorState("blue");
      setMessage("다시 클릭하여 측정을 시작하세요.");
      clearTimeout(timeout.current);
    } else if (colorState === "green") {
      endTime.current = new Date();
      setColorState("blue");
      setMessage("클릭하면 시작합니다.");
      setResult([...result, endTime.current - startTime.current]);
    }
  };

  const onClickReset = () => {
    setResult([]);
    clearTimeout(timeout.current);
    startTime.current = 0;
    endTime.current = 0;
  };

  return (
    <>
      <h4>반응속도 측정 게임</h4>
      <div id="screen" className={colorState} onClick={onClick}>
        {message}
      </div>
      <br />
      {result.length > 0 && <div>평균 반응속도 : {result.reduce((s, v) => s + v, 0) / result.length}ms</div>}
      {endTime.current > 0 && <div>현재 반응속도 : {endTime.current - startTime.current}ms </div>}
      {result.length > 0 && <button onClick={onClickReset}>초기화하기</button>}
    </>
  );
};
export default ReactionSpeed;
