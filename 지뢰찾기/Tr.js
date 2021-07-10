import React, { useContext, memo } from "react";
import { TableContext } from "./MineSweeper";
import Td from "./Td";

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);

  return (
    <tr>
      {tableData[rowIndex] &&
        Array(tableData[rowIndex].length)
          .fill()
          .map((td, idx) => <Td key={idx} rowIndex={rowIndex} colIndex={idx} />)}
    </tr>
  );
});

export default Tr;
