const React = require("react");
const { useState } = React;

const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (Number(value) === first * second) {
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setResult(`정답입니다 정답 : ${value}`);
      setValue("");
    } else {
      setValue("");
      setResult("정답이 아닙니다");
    }
  };

  return (
    <>
      <h4>구구단 문제(use Hooks)</h4>
      <p>
        {first} x {second} = ?
      </p>
      <form onSubmit={onSubmit}>
        <input type="number" value={value} onChange={onChange} />
        <button>정답 확인</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = GuGuDan;
