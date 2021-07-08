import React, { useReducer, useMemo, createContext } from "react";
import InputForm from "./InputForm";
import Table from "./Table";

export const START_GAME = "START_GAME";
export const CLICK_NORMAL = "CLICK_NORMAL";
export const CLICK_MINE = "CLICK_MINE";

export const FLAG_CELL = "FLAG_CELL";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMALIZE_CELL = "NORMALIZE_CELL";

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
  halted: true,
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
  halted: false,
  msg: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME: {
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
        halted: false,
        msg: `${action.row} x ${action.col} 크기 테이블이 생성되었습니다.`,
      };
    }
    case CLICK_NORMAL: {
      const tableData = [...state.tableData];
      tableData.forEach((row, idx) => {
        tableData[idx] = [...state.tableData[idx]];
      });
      const checked = [];
      const checkAround = (row, col) => {
        if ([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION].includes(tableData[row][col]))
          return;
        if (row < 0 || row >= tableData.length || col < 0 || col >= tableData[0].length) return;
        if (checked.includes(`${row},${col}`)) return;
        else checked.push(`${row},${col}`);
        let around = [];
        const [dx, dy] = [
          [-1, -1, -1, 0, 1, 1, 1, 0],
          [-1, 0, 1, 1, 1, 0, -1, -1],
        ];
        for (let i = 0; i < 8; i++) {
          const [nx, ny] = [row + dx[i], col + dy[i]];
          if (nx < 0 || nx >= tableData.length) continue;
          around.push(tableData[nx][ny]);
        }
        const cntMine = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        tableData[row][col] = cntMine;
        if (cntMine === 0) {
          const near = [];
          for (let i = 0; i < 8; i++) {
            const [nx, ny] = [row + dx[i], col + dy[i]];
            if (nx < 0 || nx >= tableData.length) continue;
            near.push([nx, ny]);
          }
          near.forEach(([x, y]) => {
            if (tableData[x][y] !== CODE.OPENED) checkAround(x, y);
          });
        } else {
        }
      };
      checkAround(action.row, action.col);
      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
        msg: `펑!`,
      };
    }
    case FLAG_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.MINE) {
        tableData[action.row][action.col] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.col] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      };
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.FLAG_MINE) {
        tableData[action.row][action.col] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.col] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData,
      };
    }
    case NORMALIZE_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.QUESTION_MINE) {
        tableData[action.row][action.col] = CODE.MINE;
      } else {
        tableData[action.row][action.col] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData,
      };
    }
    default:
      return state;
  }
};

const MineSweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(
    () => ({ tableData: state.tableData, halted: state.halted, dispatch }),
    [state.tableData, state.halted]
  );

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
