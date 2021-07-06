import React, { useState } from "react";
import Table from "./Table";

const TicTacToe = () => {
  const [winner, setWinner] = useState("");
  const [turn, setTurn] = useState("O");
  const [TableData, setTableData] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  return (
    <>
      <h4>틱택토(3x3 삼목게임)</h4>
      <Table />
      {winner && <div>{winner}님의 승리입니다.</div>}
    </>
  );
};

export default TicTacToe;
