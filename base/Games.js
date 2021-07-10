import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import GuGuDan from "./Routes/GuGuDan/GuGudan";
import LottoRecommender from "./Routes/LottoRecommender/Lotto";
import NumberBaseball from "./Routes/NumberBaseball/NumberBaseballGame";

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/gugudan">구구단</Link>
        <Link to="/lotto-recommender">로또번호추첨</Link>
        <Link to="/number-baseball">숫자 야구</Link>
      </div>
      <div>
        <Route path="/gugudan" component={GuGuDan}></Route>
        <Route path="/lotto-recommender" component={LottoRecommender}></Route>
        <Route path="/number-baseball" component={NumberBaseball}></Route>
      </div>
    </BrowserRouter>
  );
};

export default Games;
