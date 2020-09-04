import React, { useRef } from "react";
import "./error.less";
import { useEffectOnce } from "react-use";

const Error = () => {

  const ref = useRef(null)

  useEffectOnce(() => {
    const max = Math.max(window.innerHeight, window.innerWidth);
    ref.current.style.zoom = 1366 / max;
  });

  return (
    <div ref={ref}>
      <div className="error event">
        <div className="info">
          <div className="image" />
          <div className="about">
            <span>啊这，什么都没找到哦</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
