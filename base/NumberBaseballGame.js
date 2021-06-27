const React = require("react");
const { Component } = React;

function getNumbers() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = [];
  for (let i = 0; i < 4; i++) {
    const chosenNumber = numbers.splice(Math.floor(Math.random() * (10 - i)), 1)[0];
    result.push(chosenNumber);
  }
  return result;
}

class NumberBaseballGame extends Component {
  state = {
    answer: getNumbers(),
    value: "",
    tries: [],
    msg: "",
  };

  onSubmit = (e) => {
    const { answer, value, tries } = this.state;
    e.preventDefault();
    if (value.length < 4) {
      this.setState({
        value: "",
        msg: "숫자 4개를 입력하세요",
      });
      return;
    }
    if (value === answer.join("")) {
      alert("✅ 홈런!\n게임 재시작");
      this.setState({
        answer: getNumbers(),
        tries: [],
        value: "",
        msg: "",
      });
      return;
    }
    if (tries.length >= 9) {
      alert(`❌ 아웃! 정답: ${answer.join(",")}\n 게임 재시작`);
      this.setState({
        answer: getNumbers(),
        tries: [],
        value: "",
        msg: "",
      });
    } else {
      const answerArray = value.split("").map(Number);
      let strike = 0,
        ball = 0;
      for (let i = 0; i < 4; i++) {
        if (answerArray[i] === answer[i]) {
          strike += 1;
        } else if (answer.includes(answerArray[i])) {
          ball += 1;
        }
      }
      this.setState({
        tries: [...tries, { try: value, result: `맞춘 갯수 : ${strike + ball}개, ${strike} 스트라이크, ${ball} 볼` }],
        value: "",
        msg: "다시 시도하세요!",
      });
    }
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { answer, value, tries, msg } = this.state;
    return (
      <>
        <h4>숫자야구 게임</h4>
        <p>숫자 4개를 맞추시오.</p>
        <span>
          시도 횟수 : {tries.length}, 남은 횟수 : {10 - tries.length}
        </span>
        <form onSubmit={this.onSubmit}>
          <input type="text" maxLength={4} value={value} onChange={this.onChange} />
          <button>정답 확인</button>
        </form>
        <div>{msg}</div>
        <ul>
          {tries.map((v) => (
            <li>
              <span>
                입력한 숫자 : {v.try}, <span>{v.result}</span>
              </span>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

module.exports = NumberBaseballGame;
