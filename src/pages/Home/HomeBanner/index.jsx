import React, { useRef } from "react";
import HomeSlider from "../HomeSlider"; // 左下角轮播框
import Parallax from "parallax-js"; // 鼠标视差特效
import "./home-banner.less";
import { connect } from "react-redux";
import { useLifecycles } from "react-use";
import confirm from "@/components/Confirm";
import { info } from "@/components/Message";
import { push } from '@/utils/route';

function HomeBanner(props) {
  const $parallax = useRef(null);
  let parallax = null;

  useLifecycles(
    () => {
      parallax = new Parallax($parallax.current);
    },
    () => {
      parallax.destroy();
    }
  );

  const handleGithub = () => {
    const confirmMsg = (
      <div className="(oﾟvﾟ)ノ">
        <p>
          现在要跳转到本项目的 <i className="iconfont icon-github"></i> github
          源码!
        </p>
        <p>确定吗？(oﾟvﾟ)ノ</p>
      </div>
    );
    confirm(confirmMsg).then(
      () => {
        info("感谢你的支持！");
        setTimeout(() => {
          push(props.url.github)
        }, 1500);
      },
      () => {}
    );
  };

  return (
    <div className="home-banner event">
      <header className="home-banner-header">
        <i className="iconfont icon-github btn" onClick={handleGithub}></i>
        <i className="iconfont icon-wordpress btn" onClick={() => push(props.url.wordpress)}></i>
      </header>
      <main ref={$parallax}>
        <div className="home-banner-parallax" data-depth="0.3">
          <div className="home-banner-parallax-content">
            <div className="home-voice">{props.banner.text}</div>
            <div className="home-banner-content">
              <HomeSlider />
              <div className="content-right">
                <div className="friends" onClick={() => push(props.url.friend)}>
                  <div className="icon"></div>
                  <span>{props.banner.friend}</span>
                </div>
                <div className="infomation" onClick={() => push(props.url.information)}>
                  <div className="icon"></div>
                  <span>{props.banner.information}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default connect((state) => ({
  banner: state.home.banner,
  url: state.home.banner.url
}))(HomeBanner);
