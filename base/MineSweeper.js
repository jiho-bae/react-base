import React, { useReducer, createContext } from "react";
import InputForm from "./InputForm";
import Table from "./Table";

export const TableContext = createContext({
  tableData: [],
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: 0,
  result: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const MineSweeper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TableContext.Provider value={{ tableData: state.tableData, dispatch }}>
      <h4>지뢰찾기</h4>
      <InputForm />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>
  );
};

export default MineSweeper;
