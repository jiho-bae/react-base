import React, { Component } from "react";

const coords = {
  rock: "0",
  cessiors: "-142px",
  paper: "-284px",
};

const scores = {
  rock: 0,
  cessiors: 1,
  paper: -1,
};

const computerPick = (coord) => {
  return Object.entries(coords).find((v) => v[1] === coord)[0];
};

class RSP extends Component {
  state = {
    result: "",
    score: 0,
    imgCoord: 0,
  };
  interval;

  startgame = (time) => {
    return setInterval(() => {
      const { imgCoord } = this.state;
      if (imgCoord === coords.rock) {
        this.setState({
          imgCoord: coords.cessiors,
        });
      } else if (imgCoord === coords.cessiors) {
        this.setState({
          imgCoord: coords.paper,
        });
      } else {
        this.setState({
          imgCoord: coords.rock,
        });
      }
    }, time);
  };

  componentDidMount() {
    this.interval = this.startgame(100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onClickBtn = (pick) => {
    if (!this.interval) return;
    clearInterval(this.interval);
    this.interval = 0;
    const { imgCoord, score } = this.state;
    const myPick = scores[pick];
    const cPick = scores[computerPick(imgCoord)];
    const diff = myPick - cPick;
    if (!diff) {
      this.setState({
        result: "비겼습니다.",
      });
    } else if ([-1, 2].includes(diff)) {
      this.setState({
        result: "이겼습니다.",
        score: score + 1,
      });
    } else {
      this.setState({
        result: "졌습니다.",
        score: score - 1,
      });
    }
    setTimeout(() => {
      this.interval = this.startgame(100);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord } = this.state;
    return (
      <>
        <h4>가위바위보 게임</h4>
        <div
          id="computer"
          style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord}` }}
        ></div>
        <div>
          <br />
          <button id="scissors" className="btn" onClick={() => this.onClickBtn("scissors")}>
            가위
          </button>
          <button id="rock" className="btn" onClick={() => this.onClickBtn("rock")}>
            바위
          </button>
          <button id="paper" className="btn" onClick={() => this.onClickBtn("paper")}>
            보
          </button>
        </div>
        <br />
        <div>{result}</div>
        <div>현재 점수 : {score}</div>
      </>
    );
  }
}

export default RSP;
