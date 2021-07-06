import React from "react";
import Tr from "./Tr";

const Table = ({ onClick, tableData, dispatch }) => {
  return (
    <table onClick={onClick}>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, idx) => (
            <Tr key={idx} rowData={tableData[idx]} rowIdx={idx} dispatch={dispatch} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
