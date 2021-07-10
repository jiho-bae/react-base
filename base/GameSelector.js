import React from "react";
import GuGuDan from "./Routes/GuGuDan/GuGudan";
import LottoRecommender from "./Routes/LottoRecommender/Lotto";
import NumberBaseball from "./Routes/NumberBaseball/NumberBaseballGame";
import RSP from "./Routes/RSP/RSP";
import WordChainGame from "./Routes/WordChainGame/WordChainGame";
import ReactionSpeed from "./Routes/ReactionSpeed/ReactionSpeed";
import MineSweeper from "./Routes/MineSweeper/MineSweeper";
import TicTacToe from "./Routes/TicTacToe/TicTacToe";

const GameSelector = (props) => {
  const { name } = props.match.params;
  switch (name) {
    case "rsp":
      return <RSP />;
    case "word-chain-game":
      return <WordChainGame />;
    case "gugudan":
      return <GuGuDan />;
    case "lotto-recommender":
      return <LottoRecommender />;
    case "reaction-speed":
      return <ReactionSpeed />;
    case "number-baseball":
      return <NumberBaseball />;
    case "mine-sweeper":
      return <MineSweeper />;
    case "tictactoe":
      return <TicTacToe />;
    default:
      return (
        <div>
          <h2>해당 게임이 존재하지 않습니다.</h2>
        </div>
      );
  }
};
export default GameSelector;
