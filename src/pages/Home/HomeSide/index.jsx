import React, { useRef, useState } from 'react'
import Parallax from 'parallax-js' // 鼠标视差特效
import dayjs from 'dayjs' // 日期转换
import { connect } from 'react-redux'
import { useLifecycles } from 'react-use'
import { push } from '@/utils/route'

import './home-side.less'


function HomeSide(props) {

  const [ date, setDate ] = useState(new Date()) // 每日计时
  const $ref = useRef(null)
  let timer = null // 计时器
  let parallax = null

  const loopDate = () => {
    timer = setInterval(() => {
      setDate(new Date())
    }, 1000)
  }

  useLifecycles(() => {
    $ref.current && (parallax = new Parallax($ref.current))
    loopDate()
  },() => {
    parallax && parallax.destroy()
    timer && clearInterval(timer)
  })


  return (
    <aside className="home-side">
      <div className="event" ref={$ref}>
        <div className="home-side-parallax" data-depth="0.5">
          <div className="home-side-content">
            <div className="home-side-time">
              <div className="time-battery"></div>
              <span className="time-text">{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
            <ul className="home-side-assets">
              <li>
                <span className="assets-icon money"></span>
                <span className="assets-text">{props.side.money}</span>
              </li>
              <li>
                <span className="assets-icon gem"></span>
                <span className="assets-text">{props.side.gem}</span>
              </li>
              <li>
                <span className="assets-icon stone"></span>
                <span className="assets-text">{props.side.stone}</span>
              </li>
            </ul>
            <div className="home-side-row row-first">
              <ul className="home-side-item item-fight" onClick={() => push(props.url.chapter)}>
                <li className="fight-info">
                  <p className="primary">{props.fight.num}</p>
                  <p className="sub">{props.fight.reason}</p>
                </li>
                <li className="fight-content">
                  <p className="item-title">{props.fight.title}</p>
                  <p className="item-tag">{props.fight.current}</p>
                  <p>{props.fight.chapter}</p>
                  <div className="item-icon"></div>
                </li>
              </ul>
            </div>
            <ul className="home-side-row row-sub">
              <li className="home-side-item item-row1-col1" onClick={() => push(props.url.team)}>
                <p className="item-title">{props.fight.team}</p>
                <div className="item-icon"></div>
              </li>
              <li className="home-side-item item-row1-col2" onClick={() => push(props.url.member)}>
                <p className="item-title">{props.fight.players}</p>
                <div className="item-icon"></div>
              </li>
              <li className="home-side-black-gap"></li>
            </ul>
            <ul className="home-side-row row-primary">
              <li className="home-side-item item-blue item-title-end item-row2-col1" onClick={() => push(props.url.shop)}>
                <p className="item-title">{props.fight.shop}</p>
                <div className="item-icon"></div>
              </li>
              <li className="home-side-item item-blue item-multi">
                <p className="item-name">
                  <span className="item-icon"></span>
                  <span>{props.fight.recruit}</span>
                </p>
                <div className="item-multi-content">
                  <div className="item-multi-item item-row2-col2" onClick={() => push(props.url.recruit)}>
                    <p className="item-multi-title">{props.fight.openRecruit}</p>
                    <div className="item-icon"></div>
                  </div>
                  <div className="item-multi-item item-row2-col3" onClick={() => push(props.url.search)}>
                    <p className="item-multi-title">{props.fight.search}</p>
                    <div className="item-icon"></div>
                  </div>
                </div>
              </li>
            </ul>
            <ul className="home-side-row row-end">
              <li className="home-side-item item-row3-col1" onClick={() => push(props.url.task)}>
                <p className="item-title">{props.fight.task}</p>
                  <div className="item-icon"></div>
              </li>
              <li className="home-side-item item-row3-col2" onClick={() => push(props.url.base)}>
                <p className="item-title">{props.fight.base}</p>
                  <div className="item-icon"></div>
              </li>
              <li className="home-side-item item-end item-row3-col3" onClick={() => push(props.url.warehouse)}>
                <p className="item-title">{props.fight.warehouse}</p>
                <div className="item-icon"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default connect(
  state => ({
    side: state.home.side,
    url: state.home.side.url,
    fight: state.home.side.fight
  })
)(HomeSide)