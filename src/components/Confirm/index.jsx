import React from 'react'
import ReactDOM from 'react-dom'
import './confirm.less'


const Confirm = (props) => {
  return (
    <div className="confirm">
      <div className="confirm-content">
        <div className="confirm-msg">{props.children}</div>
        <footer>
          <button className="confirm-cancel btn" onClick={props.onCancel}>
            <i className="iconfont icon-close"></i>
          </button>
          <button className="confirm-confirm btn" onClick={props.onConfirm}>
            <i className="iconfont icon-check"></i>
          </button>
        </footer>
      </div>
    </div>
  )
}

export default (msg) => {
  return new Promise((resolve, reject) => {  // 创建空元素
    let element = window.document.createElement('div')
    document.body.appendChild(element)

    /**
     * 取消
     */
    const handleCancel = () => {
      reject()
      remove()
    }

    /**
     * 确认
     */
    const handleConfirm = () => {
      resolve()
      remove()
    }

    /**
     * 移除元素
     */
    const remove = () => {
      ReactDOM.unmountComponentAtNode(element)
      document.body.removeChild(element)
    }

    ReactDOM.render(
      <Confirm onConfirm={handleConfirm} onCancel={handleCancel}>{msg}</Confirm>,
      element
    )
  })
}