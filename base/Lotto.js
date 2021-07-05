import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import Ball from "./Ball";

function getNumbers() {
  console.log("getNumbers");
  const candidate = Array.from({ length: 45 }, (_, i) => i + 1);
  const shuffle = [];
  while (candidate.length) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const numbers = shuffle.slice(0, 6).sort((a, b) => a - b);
  return [...numbers, bonusNumber];
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getNumbers(), []);
  const [numbers, setNumbers] = useState(lottoNumbers);
  const [balls, setBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [reDo, setReDo] = useState(false);
  const timeouts = useRef([]);

  useEffect(() => {
    console.log("useEffect");
    const len = numbers.length;
    for (let i = 0; i < len - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        setBalls((prevBalls) => [...prevBalls, numbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[len - 1] = setTimeout(() => {
      setBonus(numbers[len - 1]);
      setReDo(true);
    }, len * 1000);
    return () => {
      timeouts.current.forEach((timeout) => clearTimeout(timeout));
    };
  }, [timeouts.current]);

  const onClickReDo = useCallback(() => {
    console.log("numbers :", numbers);
    setNumbers(getNumbers());
    setBalls([]);
    setBonus(null);
    setReDo(false);
    timeouts.current = [];
  }, [numbers]);

  return (
    <>
      <h4>로또 번호 게임</h4>
      <div>당첨 숫자</div>
      <div id="result">
        {balls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <br />
      <div>보너스 숫자</div>
      {bonus && <Ball number={bonus} />}
      <br />
      <br />
      {reDo && <button onClick={onClickReDo}>한번 더</button>}
    </>
  );
};

export default Lotto;
