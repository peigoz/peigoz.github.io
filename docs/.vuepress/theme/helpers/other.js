/* eslint-disable no-proto */
import { addLinkToHead } from './utils'
import imageMap from './imageMap'
import bgImgUrlArr from './bgImageMap'
export function getOneColor() {
  const tagColorArr = [
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    // '#f8f8fe',
    // '#EAEAEA',
    '#9E9E9E',
    '#757575',
    '#0097A7',
    '#E64A19',
    '#e15b64',
    '#f47e60',
    '#f8b26a',
    '#f26d6d',
    '#67cc86',
    '#4CAF50',
    '#fb9b5f',
    '#00ccd6',
    '#3498db',
    '#BBDEFB',
    '#FFCCBC',
  ]
  const index = Math.floor(Math.random() * tagColorArr.length)
  return tagColorArr[index]
}

export function registerCodeThemeCss(theme = 'tomorrow') {
  const themeArr = ['tomorrow', 'funky', 'okaidia', 'solarizedlight', 'default']
  const href = `//prismjs.com/themes/prism${themeArr.indexOf(theme) > -1 ? `-${theme}` : ''}.css`

  addLinkToHead(href)
}

export function interceptRouterError(router) {
  // 获取原型对象上的 push 函数
  const originalPush = router.__proto__.push
  // 修改原型对象中的p ush 方法
  router.__proto__.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
  }
}

export function getOneImgArr() {
  const key = Object.keys(imageMap)[Math.floor(Math.random() * Object.keys(imageMap).length)]
  return randomArr(imageMap[key])
}
export function getOneBgImg() {
  return randomArr(bgImgUrlArr)[0]
}

function randomArr(array) {
  function randomSort(a, b) {
    return Math.random() > 0.5 ? -1 : 1
  }
  return array.sort(randomSort)
}
