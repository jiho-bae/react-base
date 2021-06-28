import React from "react";

const Try = ({ value }) => {
  return (
    <li>
      <div>입력한 숫자 : {value.try}</div>
      <span>{value.result}</span>
      <div>--------------------------------</div>
    </li>
  );
};

export default Try;
