import React, { useCallback } from "react";
import { CHANGE_TURN, CLICK_CELL } from "./TicTacToe";

const Td = ({ rowIdx, colIdx, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIdx, colIdx);
    dispatch({ type: CLICK_CELL, row: rowIdx, col: colIdx });
    dispatch({ type: CHANGE_TURN });
  }, []);

  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
