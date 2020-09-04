import React, { useRef } from "react";
import { connect } from "react-redux";
import "./loading.less";
import { useEffectOnce } from 'react-use'

const Loading = (props) => {

  const $ref = useRef(null)

  useEffectOnce(() => {
    $ref.current.style.transform = 'transform: scale(' + Math.max(window.innerHeight, window.innerWidth) / 1366 + ')'
  })

  return (
    <div>
      <div className="loader-layer">
        <div className="tips">{props.loading}</div>
        <div className="loader" ref={$ref}>
          <div className="bar">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect((state) => ({
  loading: state.loading.text,
}))(Loading);

// export default index
