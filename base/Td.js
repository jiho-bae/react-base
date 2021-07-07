import React, { useContext } from "react";
import { CODE, TableContext } from "./MineSweeper";

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
    default:
      return {
        background: "grey",
      };
  }
};

const getTdText = (code) => {
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "❌";
    default:
      return "";
  }
};

const Td = ({ rowIdx, colIdx }) => {
  const { tableData } = useContext(TableContext);

  return <td style={getTdStyle(tableData[rowIdx][colIdx])}>{getTdText(tableData[rowIdx][colIdx])}</td>;
};

export default Td;
