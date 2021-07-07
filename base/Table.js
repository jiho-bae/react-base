import React, { useContext } from "react";
import { TableContext } from "./MineSweeper";
import Tr from "./Tr";

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      <tbody>
        {Array(tableData.length)
          .fill()
          .map((tr, idx) => (
            <Tr key={idx} rowIdx={idx} />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
