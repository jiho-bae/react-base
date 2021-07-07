import React, { memo } from "react";
import Td from "./Td";

const Tr = memo(({ rowData, rowIdx, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill()
        .map((td, idx) => (
          <Td key={idx} rowIdx={rowIdx} colIdx={idx} dispatch={dispatch} cellData={rowData[idx]} />
        ))}
    </tr>
  );
});

export default Tr;
