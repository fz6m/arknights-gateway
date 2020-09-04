import React from 'react'
import ReactDOM from 'react-dom'
import './message.less'


const list = []

// message dom
const Message = (props) => {
  return (
    <div style={{ top: props.top + 'px' }} className={`message ${props.type}`}><i className={`message-icon iconfont icon-circle-${props.type}`}></i>{ props.children }</div>
  )
}

const getMessageElement = (element) => {
  return element.children[0]
}

// 默认距离顶部
let defaultTop = 100

// create message
const createMessage = function (message, type, time) {
  // 创建空元素
  let element = window.document.createElement('div')
  document.body.appendChild(element)

  let item = {
    top: 0,
    offsetHeight: 0,
    element
  }

  // 设置顶部边距
  let last = list.slice(-1)[0]
  let top = last ? last.top + last.offsetHeight : defaultTop
  item.top = top

  ReactDOM.render(
    <Message top={item.top} type={type}>{ message }</Message>,
    element,
    () => {
      // 决定高度
      let children = getMessageElement(element)
      if (children) {
        item.offsetHeight = children.offsetHeight + 16
      }
    }
  )
  
  // 过一段时间自动关闭
  item.timer = setTimeout(() => {
    item.close && item.close()
  }, time)

  // remove
  item.remove = () => {
    item.timer && clearTimeout(item.timer)
    ReactDOM.unmountComponentAtNode(element)
    document.body.removeChild(element)
    let index = list.findIndex(obj => obj.element === element)
    list.splice(index, 1)
  }

  // 关闭
  item.close = () => {
    let children = getMessageElement(element)
    children.classList.add('hide')
    
    let afterIndex = list.findIndex(obj => obj.element === element)

    // 重新设定之后元素的高度
    for (let i = afterIndex + 1; i < list.length; i++) {
      let next = list[i]
      let nextChildren = getMessageElement(next.element)
      next.top -= item.offsetHeight
      nextChildren.style.top = next.top + 'px'
    }

    setTimeout(() => {
      item.remove && item.remove()
    }, 300)
  }

  list.push(item)

  return item
}

const duration = 3000 // 默认弹出 3 秒

export const info = function (message, time = duration) {
  return createMessage(message, 'info', time)
}

export const warning = function (message, time = duration) {
  return createMessage(message, 'warning', time)
}

export const error = function (message, time = duration) {
  return createMessage(message, 'error', time)
}

export const success = function (message, time = duration) {
  return createMessage(message, 'success', time)
}