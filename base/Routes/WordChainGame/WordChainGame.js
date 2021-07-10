const React = require("react");
const { useState } = React;
const WordChainGame = () => {
  const [word, setWord] = useState("리액트훅스");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.length < 2) {
      setResult(`2글자 이상 단어를 입력하세요. 입력한 단어 : ${value}`);
      setValue("");
      return;
    }
    if (word[word.length - 1] === value[0]) {
      setResult(`정답. 이전 제시어 : ${word}`);
      setWord(value);
      setValue("");
    } else {
      setResult(`규칙에 어긋납니다. 입력한 단어 : ${value}`);
      setValue("");
    }
  };

  return (
    <>
      <h4>끝말잇기 게임</h4>
      <p>제시어 : {word}</p>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button>정답 확인</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordChainGame;
