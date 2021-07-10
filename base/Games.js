import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import GameSelector from "./GameSelector";

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
        <Route path="/:name" component={GameSelector}></Route>
      </div>
    </BrowserRouter>
  );
};

export default Games;
