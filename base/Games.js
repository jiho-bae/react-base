import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import GuGuDan from "./Routes/GuGuDan/GuGudan";
import LottoRecommender from "./Routes/LottoRecommender/Lotto";
import NumberBaseball from "./Routes/NumberBaseball/NumberBaseballGame";
import RSP from "./Routes/RSP/RSP";
import WordChainGame from "./Routes/WordChainGame/WordChainGame";
import ReactionSpeed from "./Routes/ReactionSpeed/ReactionSpeed";
import MineSweeper from "./Routes/MineSweeper/MineSweeper";
import TicTacToe from "./Routes/TicTacToe/TicTacToe";

const Games = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">홈</Link>
        <Link to="/rsp">가위바위보</Link>
        <Link to="/word-chain-game">끝말잇기</Link>
        <Link to="/gugudan">구구단</Link>
        <Link to="/lotto-recommender">로또추첨</Link>
        <Link to="/reaction-speed">반응속도</Link>
        <Link to="/number-baseball">숫자야구</Link>
        <Link to="/mine-sweeper">지뢰찾기</Link>
        <Link to="/tictactoe">틱택토</Link>
      </nav>
      <div>
        <Route path="/rsp" component={RSP}></Route>
        <Route path="/word-chain-game" component={WordChainGame}></Route>
        <Route path="/gugudan" component={GuGuDan}></Route>
        <Route path="/lotto-recommender" component={LottoRecommender}></Route>
        <Route path="/reaction-speed" component={ReactionSpeed}></Route>
        <Route path="/number-baseball" component={NumberBaseball}></Route>
        <Route path="/mine-sweeper" component={MineSweeper}></Route>
        <Route path="/tictactoe" component={TicTacToe}></Route>
      </div>
    </BrowserRouter>
  );
};

export default Games;
