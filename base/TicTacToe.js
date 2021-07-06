import React, { useEffect, useCallback, useReducer } from "react";
import Table from "./Table";

const initialState = {
  winner: "",
  turn: "O",
  tableData: [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ],
  recentCell: [-1, -1],
};

export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_TABLE = "RESET_TABLE";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      };
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]];
      tableData[action.row][action.col] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.col],
      };
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn === "O" ? "X" : "O",
      };
    case RESET_TABLE:
      return {
        ...state,
        winner: action.winner === "" ? action.winner : state.winner,
        turn: "O",
        tableData: [
          ["", "", ""],
          ["", "", ""],
          ["", "", ""],
        ],
        recentCell: [-1, -1],
      };
    default:
      return state;
  }
};
const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, recentCell } = state;

  const onClickTable = useCallback(() => {}, []);

  useEffect(() => {
    console.log("??");
    const [row, col] = recentCell;
    if (row < 0) return;
    let win = false;
    if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) win = true;
    if (tableData[0][col] === turn && tableData[1][col] === turn && tableData[2][col] === turn) win = true;
    if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) win = true;
    if (tableData[2][0] === turn && tableData[1][1] === turn && tableData[0][2] === turn) win = true;
    if (win) {
      dispatch({ type: SET_WINNER, winner: turn });
      dispatch({ type: RESET_TABLE });
    } else {
      let isFull = true;
      tableData.forEach((row) => {
        row.forEach((col) => {
          if (!col) isFull = false;
        });
      });
      if (isFull) {
        dispatch({ type: RESET_TABLE, winner: "" });
      } else {
        dispatch({ type: CHANGE_TURN });
      }
    }
  }, [recentCell]);
  return (
    <>
      <h4>틱택토(3x3 삼목게임)</h4>
      <Table onClick={onClickTable} tableData={state.tableData} dispatch={dispatch} />
      {state.winner && <div>{state.winner}님의 승리입니다.</div>}
    </>
  );
};

export default TicTacToe;
