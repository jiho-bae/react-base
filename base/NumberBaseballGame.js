const React = require("react");

const NumberBaseballGame = () => {
  return (
    <>
      <h4>숫자야구 게임</h4>
      <p></p>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <button>정답 확인</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = NumberBaseballGame;
