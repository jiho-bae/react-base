import React, { useCallback, memo } from "react";
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ rowIdx, colIdx, cellData, dispatch }) => {
  const onClickTd = useCallback(() => {
    if (cellData) return;
    dispatch({ type: CLICK_CELL, row: rowIdx, col: colIdx });
  }, [cellData]);

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
