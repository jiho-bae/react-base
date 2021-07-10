import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import NumberBaseball from "../숫자야구/NumberBaseballGame";
import Gugudan from "../구구단/webpack/GuGuDan";
import LottoRecommender from "../로또번호추첨/Lotto";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/gugudan">구구단</Link>
        <Link to="/lotto-recommender">로또번호추첨</Link>
        <Link to="/number-baseball">숫자 야구</Link>
      </div>
      <div>
        <Route path="/gugudan" component={Gugudan}></Route>
        <Route path="/lotto-recommender" component={LottoRecommender}></Route>
        <Route path="/number-baseball" component={NumberBaseball}></Route>
      </div>
    </BrowserRouter>
  );
};

export default Games;
