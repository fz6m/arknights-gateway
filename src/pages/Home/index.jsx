import * as React from "react";
import HomeSide from "./HomeSide"; // 主页右边选卡
import Dust from "@/components/Dust"; // 头皮屑特效
import HomeBanner from "./HomeBanner"; // 主页左边内容
import { connect } from "react-redux";

import "./home.less";

function Home(props) {
  return (
    <div className="home">
      {/* <section className="chara-cg"> */}
      {/* <div className="chara-cg-doctor"></div> */}
      {/* <img className="chara-cg-main" src={cg} alt="" draggable="false" /> */}
      {/* <img className="chara-cg-eye" src={eye} alt="" draggable="false" /> */}
      {/* </section> */}
      <section className="home-user">
        <div className="home-user-level">
          <span className="level-num">
            {props.num}
            <span className="level-text">{props.text}</span>
          </span>
          <svg width="110" height="110">
            <circle
              cx="55"
              cy="55"
              r="50"
              strokeWidth="4"
              stroke="rgba(255, 255, 255, .2)"
              fill="none"
            ></circle>
            <circle
              cx="55"
              cy="55"
              r="50"
              strokeWidth="4"
              stroke="#fe2"
              fill="none"
              transform="matrix(0,-1,1,0,0,110)"
              strokeDasharray="200 314"
            ></circle>
          </svg>
        </div>
        <div className="home-user-account">
          <p className="account-name">{props.name}</p>
          <p className="account-id">{props.description}</p>
        </div>
      </section>
      <Dust />
      <HomeBanner />
      <HomeSide />
    </div>
  );
}

export default connect((state) => ({
  num: state.home.num,
  text: state.home.text,
  name: state.home.name,
  description: state.home.description,
}))(Home);
