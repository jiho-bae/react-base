import React, { useState } from "react";
import Try from "./Try";

function getNumbers() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const result = [];
  for (let i = 0; i < 4; i++) {
    const chosenNumber = numbers.splice(Math.floor(Math.random() * (10 - i)), 1)[0];
    result.push(chosenNumber);
  }
  return result;
}

const NumberBaseballGame = () => {
  const [answer, setAnswer] = useState(getNumbers);
  const [value, setValue] = useState("");
  const [tries, setTries] = useState([]);
  const [msg, setMsg] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (value.length < 4) {
      setValue("");
      setMsg("숫자 4개를 입력하세요");
      return;
    }
    if (value === answer.join("")) {
      alert("✅ 홈런!\n게임 재시작");
      setAnswer(getNumbers());
      setTries([]);
      setValue("");
      setMsg("");
      return;
    }
    if (tries.length >= 9) {
      alert(`❌ 아웃! 정답: ${answer.join(",")}\n 게임 재시작`);
      setAnswer(getNumbers());
      setTries([]);
      setValue("");
      setMsg("");
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
      setTries([...tries, { try: value, result: `맞춘 갯수 : ${strike + ball}개, ${strike} 스트라이크, ${ball} 볼` }]);
      setValue("");
      setMsg("다시 시도하세요!");
    }
  };

  const onChange = (e) => setValue(e.target.value);
  return (
    <>
      <h4>숫자야구 게임</h4>
      <p>숫자 4개를 맞추시오.</p>
      <span>
        시도 횟수 : {tries.length}, 남은 횟수 : {10 - tries.length}
      </span>
      <form onSubmit={onSubmit}>
        <input type="text" maxLength={4} value={value} onChange={onChange} />
        <button>정답 확인</button>
      </form>
      <div>{msg}</div>
      <ul>
        {tries.map((v) => (
          <Try value={v} key={v.try + v.result} />
        ))}
      </ul>
    </>
  );
};

export default NumberBaseballGame;
