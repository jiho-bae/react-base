import React, { useCallback, useContext, useMemo, memo } from "react";
import { CODE, CLICK_MINE, CLICK_NORMAL, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL, TableContext } from "./MineSweeper";

const getTdStyle = (code) => {
  console.log("getTdText");
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: "#444",
      };
    case CODE.OPENED:
      return {
        background: "white",
      };
    case CODE.CLICKED_MINE:
      return {
        background: "tomato",
      };
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: "orange",
      };
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: "yellow",
      };
    default:
      return {
        background: "white",
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "❌";
    case CODE.CLICKED_MINE:
      return "💣";
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return "🏳";
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return "？";
    default:
      return code || "";
  }
};

const Td = memo(({ rowIdx, colIdx }) => {
  const { tableData, halted, dispatch } = useContext(TableContext);
  console.log("td rendered");
  const onClickTd = useCallback(() => {
    if (halted) return;
    switch (tableData[rowIdx][colIdx]) {
      case CODE.OPENED:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        return;
      case CODE.NORMAL:
        dispatch({ type: CLICK_NORMAL, row: rowIdx, col: colIdx });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIdx, col: colIdx });
        return;
    }
  }, [tableData[rowIdx][colIdx], halted]);

  const onRightClickTd = useCallback(
    (event) => {
      event.preventDefault();
      if (halted) return;
      switch (tableData[rowIdx][colIdx]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIdx, col: colIdx });
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          dispatch({ type: QUESTION_CELL, row: rowIdx, col: colIdx });
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: NORMALIZE_CELL, row: rowIdx, col: colIdx });
          return;
        case CODE.OPENED:
          return;
      }
    },
    [tableData[rowIdx][colIdx], halted]
  );

  return useMemo(
    () => (
      <td style={getTdStyle(tableData[rowIdx][colIdx])} onClick={onClickTd} onContextMenu={onRightClickTd}>
        {getTdText(tableData[rowIdx][colIdx])}
      </td>
    ),
    [tableData[rowIdx][colIdx]]
  );
});

export default Td;
