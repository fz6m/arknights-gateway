import React, { useRef } from 'react'
import './index.less'
import { getRandomFloor, getRandom } from '@/utils'
import { useLifecycles } from 'react-use'
import { setResize } from '@/utils/index'

class Dust {

  ctx = null
  width= 0 // 画布宽度
  height = 0 // 画布高度
  maxPointLength = 1 // 灰尘最大数量
  safeMaxPointLength = 30 // 灰尘上限数量
  maxTimer = null // 灰尘上限计时器
  points = [] // 灰尘组
  colors = ['#fff', '#000'] // 灰尘颜色
  
  constructor ($canvas) {
    // 决定画布高度
    this.width = window.innerWidth
    this.height = window.innerHeight
    $canvas.width = this.width
    $canvas.height = this.height
    // 获取画布环境
    this.ctx = $canvas.getContext('2d')
    // 循环绘制画布
    this.loopDraw()
    // 逐步开放灰尘数量上限
    this.graduallyMaxPointLength()
  }

  // 创建一个灰尘
  createPoint () {
    let { width, height, points, colors, maxPointLength } = this

    // 不允许超出灰尘数量上限
    if (points.length < maxPointLength) {
      // 创建并且添加一个灰尘
      let point = {
        x: width,
        y: getRandomFloor(1, height),
        xa: -getRandom(1, 5),
        ya: -getRandom(-3, 3),
        size: getRandomFloor(2, 5),
        color: colors[getRandomFloor(0, 1)]
      }
      points.push(point)
    }
  }

  // 清除超出屏幕的灰尘
  clearPoint () {
    let { points } = this
    for (let i = 0; i < points.length; i++) {
      let point = points[i]
      if (point.x < 0 || point.y < 0) {
        points.splice(i, 1)
        i -= 1
      }
    }
  }

  // 绘制画面
  draw () {
    let { points, ctx, width, height } = this
    // 清空画布
    ctx.clearRect(0, 0, width, height)
    // 循环绘制灰尘
    points.forEach((point) => {
      point.x += point.xa
      point.y += point.ya
      ctx.fillStyle = point.color
      ctx.fillRect(point.x, point.y, point.size, point.size)
    })
  }

  // 循环绘制画面
  loopDraw () {
      this.clearPoint()
      this.createPoint()
      this.draw()
      requestAnimationFrame(() => {this.loopDraw()})
  }


  // 逐渐增大灰尘数量上限
  graduallyMaxPointLength () {
    this.maxTimer && clearInterval(this.maxTimer)
    this.maxTimer = setInterval(() => {
      if (this.maxPointLength < this.safeMaxPointLength) {
        this.maxPointLength += 1
        return 
      }
      this.maxTimer && clearInterval(this.maxTimer)
    }, 500)
  }

}

export default function () {
  const $canvas = useRef(null)
  let dust = null
  const reInit = () => {
    console.log('dust resize')
    dust = null;
    dust = new Dust($canvas.current);
  }

  useLifecycles(() => {
    $canvas.current && (dust = new Dust($canvas.current))
    setResize(reInit)
  },() => {
    dust = null
    dust.maxTimer && clearInterval(dust.maxTimer)
  })

  return (
    <div className="dust">
      <canvas ref={$canvas}></canvas>
    </div>
  )
}
