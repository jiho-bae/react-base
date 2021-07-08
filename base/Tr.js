import React, { useContext, memo } from "react";
import { TableContext } from "./MineSweeper";
import Td from "./Td";

const Tr = memo(({ rowIdx }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {tableData[rowIdx] &&
        Array(tableData[rowIdx].length)
          .fill()
          .map((td, idx) => <Td key={idx} rowIdx={rowIdx} colIdx={idx} />)}
    </tr>
  );
});

export default Tr;
