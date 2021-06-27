const React = require("react");
const { Component } = React;

class WordChainGame extends Component {
  state = {
    word: "김말이",
    value: "",
    result: "",
  };

  onChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { value, word } = this.state;
    if (value.length < 2) {
      this.setState({
        result: `2글자 이상의 단어를 입력하세요. 입력한 단어 : ${value}`,
        value: "",
      });
      return;
    }
    if (word[word.length - 1] === value[0]) {
      this.setState({
        result: `정답. 이전 제시어 : ${word}`,
        word: value,
        value: "",
      });
    } else {
      this.setState({
        result: `규칙에 어긋납니다. 입력한 단어 : ${value}`,
        value: "",
      });
    }
  };

  render() {
    const { word, value, result } = this.state;
    return (
      <>
        <h4>끝말잇기 게임(Webpack)</h4>
        <p>제시어 : {word}</p>
        <form onSubmit={this.onSubmit}>
          <input type="text" value={value} onChange={this.onChange} />
          <button>정답 확인</button>
        </form>
        <div>{result}</div>
      </>
    );
  }
}

module.exports = WordChainGame;
