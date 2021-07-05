import React, { Component } from "react";
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

class Lotto extends Component {
  state = {
    numbers: getNumbers(),
    balls: [],
    bonus: null,
    redo: false,
  };

  render() {
    const { balls, bonus, redo } = this.state;

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
        <button onClick={redo ? this.onClickRedo : () => {}}>한번 더</button>
      </>
    );
  }
}

export default Lotto;
