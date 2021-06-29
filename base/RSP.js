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

class RSP extends Component {
  state = {
    result: "",
    score: 0,
    imgCoord: 0,
  };
  interval;

  componentDidMount() {
    this.interval = setInterval(() => {
      const { imgCoord } = this.state;
      console.log(imgCoord);
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
    }, 100);
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onClickBtn = () => {};

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
        <div>{result}</div>
        <div>현재 점수 : {score}</div>
      </>
    );
  }
}

export default RSP;
