import React, { useCallback } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = ({ rowIdx, colIdx, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    console.log(rowIdx, colIdx);
    if (cellData) return;
    dispatch({ type: CLICK_CELL, row: rowIdx, col: colIdx });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
};

export default Td;
