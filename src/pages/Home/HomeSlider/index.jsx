import React, { useState } from "react";
import "./home-slider.less";
import { connect } from "react-redux";
import { useLifecycles } from "react-use";

function HomeSlider(props) {
  const list = props.images;
  const [index, setIndex] = useState(0); // 当 current 处于第几个
  const width = 330; // 每个 slider item 的宽度
  const time = 5000; // 5 秒钟循环一次
  let timer = null; // 计时器

  useLifecycles(
    () => {
      timer = setInterval(() => {
        setIndex((pre) => (pre < list.length - 1 ? pre + 1 : 0));
      }, time);
    },
    () => {
      timer && clearInterval(timer);
    }
  );

  return (
    <div className="home-slider">
      <div className="home-slider-content">
        <ul
          className="content-main"
          style={{ transform: `translateX(${-width * index}px)` }}
        >
          {list.map((item) => {
            return (
              <li className="content-item" key={item.src}>
                <img src={item.src} alt="" />
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="home-slider-indicator">
        {list.map((item, i) => {
          return (
            <li
              className={`indicator-item ${i === index && "active"}`}
              key={item.src}
            ></li>
          );
        })}
      </ul>
    </div>
  );
}

export default connect((state) => ({
  images: state.home.slider.images,
}))(HomeSlider);
