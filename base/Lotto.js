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
    reDo: false,
  };
  timeouts = [];

  getLottoNumbers = () => {
    const { numbers } = this.state;
    const len = numbers.length;
    for (let i = 0; i < len - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return { balls: [...prevState.balls, numbers[i]] };
        });
      }, (i + 1) * 1000);
    }
    this.timeouts[len - 1] = setTimeout(() => {
      this.setState({
        bonus: numbers[len - 1],
        reDo: true,
      });
    }, len * 1000);
  };

  componentDidMount() {
    this.getLottoNumbers();
  }

  componentWillUnmount() {
    this.timeouts.forEach((timeout) => clearTimeout(timeout));
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("update!");
    if (!this.state.balls.length) {
      this.getLottoNumbers();
    }
  }

  onClickReDo = () => {
    this.setState({
      numbers: getNumbers(),
      balls: [],
      bonus: null,
      reDo: false,
    });
    this.timeouts = [];
  };
  render() {
    const { balls, bonus, reDo } = this.state;

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
        {reDo && <button onClick={this.onClickReDo}>한번 더</button>}
      </>
    );
  }
}

export default Lotto;
