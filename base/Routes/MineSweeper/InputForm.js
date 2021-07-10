import React, { useState, useCallback, useContext, memo } from "react";
import { START_GAME, TableContext } from "./MineSweeper";

const InputForm = memo(() => {
  const [row, setRow] = useState("");
  const [col, setCol] = useState("");
  const [mine, setMine] = useState("");
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback((event) => {
    setRow(event.target.value);
  }, []);
  const onChangeCol = useCallback((event) => {
    setCol(event.target.value);
  }, []);
  const onChangeMine = useCallback((event) => {
    setMine(event.target.value);
  }, []);

  const onClickBtn = useCallback(
    (event) => {
      dispatch({ type: START_GAME, row, col, mine });
      setRow("");
      setCol("");
      setMine("");
    },
    [row, col, mine]
  );

  return (
    <>
      <input type="number" placeholder="가로 길이" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="세로 길이" value={col} onChange={onChangeCol} />
      <input type="number" placeholder="지뢰 개수" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작하기</button>
    </>
  );
});

export default InputForm;
