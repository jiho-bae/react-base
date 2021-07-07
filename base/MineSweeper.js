import React, { useReducer, useMemo, createContext } from "react";
import InputForm from "./InputForm";
import Table from "./Table";

export const START_GAME = "START_GAME";

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
};

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const plantMine = (row, col, mine) => {
  const candidate = new Array(row * col).fill().map((_, i) => i);
  const shuffle = [];
  while (mine > shuffle.length) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < col; j++) {
      data[i][j] = CODE.NORMAL;
    }
  }
  shuffle.forEach((val) => {
    const rowIdx = Math.floor(val / col);
    const colIdx = val % col;
    data[rowIdx][colIdx] = CODE.MINE;
  });
  return data;
};

const initialState = {
  tableData: [],
  timer: 0,
  result: "",
  msg: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      if (action.row < 1 || action.col < 1)
        return {
          ...state,
          msg: "올바른 가로, 세로 크기를 입력하세요.",
        };
      if (action.row * action.col < action.mine)
        return {
          ...state,
          msg: "입력한 지뢰의 개수가 너무 많습니다.",
        };
      return {
        ...state,
        tableData: plantMine(action.row, action.col, action.mine),
        msg: `${action.row} x ${action.col} 크기 테이블이 생성되었습니다.`,
      };
    default:
      return state;
  }
};

const MineSweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ tableData: state.tableData, dispatch }), [state.tableData]);

  return (
    <TableContext.Provider value={value}>
      <h4>지뢰찾기</h4>
      <InputForm />
      {state.msg && <div>{state.msg}</div>}
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSweeper;
