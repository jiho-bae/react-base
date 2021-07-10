import React, { useCallback, useContext, useMemo, memo } from "react";
import {
  CODE,
  CLICK_MINE,
  CLICK_NORMAL,
  CHANGE_FLAG_TO_QUESTION,
  CHANGE_QUESTION_TO_NORMAL,
  CHANGE_NORMAL_TO_FLAG,
  TableContext,
} from "./MineSweeper";

const getTdStyle = (code) => {
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
    case CODE.MINE:
      return "";
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

const Td = memo(({ rowIndex: row, colIndex: col }) => {
  const { tableData, halted, dispatch } = useContext(TableContext);
  const tdData = tableData[row][col];

  const onClickTd = useCallback(() => {
    if (halted) return;
    switch (tdData) {
      case CODE.OPENED:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
      case CODE.FLAG:
      case CODE.FLAG_MINE:
        return;
      case CODE.NORMAL:
        dispatch({ type: CLICK_NORMAL, row, col });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row, col });
        return;
    }
  }, [tdData, halted]);

  const onRightClickTd = useCallback(
    (event) => {
      event.preventDefault();
      if (halted) return;
      switch (tdData) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: CHANGE_FLAG_TO_QUESTION, row, col });
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          dispatch({ type: CHANGE_NORMAL_TO_FLAG, row, col });
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: CHANGE_QUESTION_TO_NORMAL, row, col });
          return;
        case CODE.OPENED:
          return;
      }
    },
    [tdData, halted]
  );

  return useMemo(
    () => (
      <td style={getTdStyle(tdData)} onClick={onClickTd} onContextMenu={onRightClickTd}>
        {getTdText(tdData)}
      </td>
    ),
    [tdData, halted]
  );
});

export default Td;
