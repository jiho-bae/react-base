import React from "react";

class ReactionSpeed extends React.Component {
  state = {
    colorState: "blue",
    message: "클릭하면 시작합니다.",
    result: [],
  };
  timeout;
  startTime;
  endTime;

  onClick = () => {
    const { colorState, result } = this.state;
    if (colorState === "blue") {
      this.endTime = 0;
      this.setState({
        colorState: "red",
        message: "초록불로 바뀌면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          colorState: "green",
          message: "클릭하세요!",
        });
        this.startTime = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (colorState === "red") {
      this.setState({
        colorState: "blue",
        message: "다시 클릭하여 측정을 시작하세요.",
      });
      clearTimeout(this.timeout);
    } else if (colorState === "green") {
      this.endTime = new Date();
      this.setState({
        colorState: "blue",
        message: "클릭하면 시작합니다.",
        result: [...result, this.endTime - this.startTime],
      });
    }
  };

  onClickReset = () => {
    this.setState({
      result: [],
    });
  };
  render() {
    const { colorState, message, result } = this.state;
    return (
      <>
        <h4>반응속도 측정 게임</h4>
        <div id="screen" className={colorState} onClick={this.onClick}>
          {message}
        </div>
        <br />
        {result.length > 0 && <div>평균 반응속도 : {result.reduce((s, v) => s + v, 0) / result.length}ms</div>}
        {this.endTime > 0 && <div>현재 반응속도 : {this.endTime - this.startTime}ms </div>}
        {result.length > 0 && <button onClick={this.onClickReset}>초기화하기</button>}
      </>
    );
  }
}

export default ReactionSpeed;
