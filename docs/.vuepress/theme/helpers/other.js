/* eslint-disable no-proto */
import { addLinkToHead } from './utils'
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
  const imageMap = {
    animePerson: [
      '/images/animePerson/1.jpg',
      '/images/animePerson/10.jpg',
      '/images/animePerson/11.jpg',
      '/images/animePerson/12.jpg',
      '/images/animePerson/13.jpg',
      '/images/animePerson/14.jpg',
      '/images/animePerson/15.jpg',
      '/images/animePerson/16.jpg',
      '/images/animePerson/17.jpg',
      '/images/animePerson/18.jpg',
      '/images/animePerson/19.jpg',
      '/images/animePerson/2.jpg',
      '/images/animePerson/20.jpg',
      '/images/animePerson/21.jpg',
      '/images/animePerson/3.jpg',
      '/images/animePerson/4.jpg',
      '/images/animePerson/5.jpg',
      '/images/animePerson/6.jpg',
      '/images/animePerson/7.jpg',
      '/images/animePerson/8].jpg',
      '/images/animePerson/9.jpg',
    ],
    animeScenery: [
      '/images/animeScenery/1.jpg',
      '/images/animeScenery/10.jpg',
      '/images/animeScenery/11.jpg',
      '/images/animeScenery/12.jpg',
      '/images/animeScenery/13.jpg',
      '/images/animeScenery/14.jpg',
      '/images/animeScenery/2.jpg',
      '/images/animeScenery/3.jpg',
      '/images/animeScenery/4.jpg',
      '/images/animeScenery/5.jpg',
      '/images/animeScenery/6.jpg',
      '/images/animeScenery/7.jpg',
      '/images/animeScenery/8.jpg',
      '/images/animeScenery/9.jpg',
    ],
    plant: [
      '/images/plant/1.jpg',
      '/images/plant/10.jpg',
      '/images/plant/2.jpg',
      '/images/plant/3.jpg',
      '/images/plant/4.jpg',
      '/images/plant/5.jpg',
      '/images/plant/6.jpg',
      '/images/plant/7.jpg',
      '/images/plant/8.jpg',
      '/images/plant/9.jpg',
    ],
    realPerson: [
      '/images/realPerson/1.jpg',
      '/images/realPerson/10.jpg',
      '/images/realPerson/11.jpg',
      '/images/realPerson/12.jpg',
      '/images/realPerson/13.jpg',
      '/images/realPerson/14.jpg',
      '/images/realPerson/15.jpg',
      '/images/realPerson/16.jpg',
      '/images/realPerson/17.jpg',
      '/images/realPerson/18.jpg',
      '/images/realPerson/19.jpg',
      '/images/realPerson/2.jpg',
      '/images/realPerson/20.jpg',
      '/images/realPerson/3.jpg',
      '/images/realPerson/4.jpg',
      '/images/realPerson/5.jpg',
      '/images/realPerson/6.jpg',
      '/images/realPerson/7.jpg',
      '/images/realPerson/8.jpg',
      '/images/realPerson/9.jpg',
    ],
    realPet: [
      '/images/realPet/1.jpg',
      '/images/realPet/10.jpg',
      '/images/realPet/11.jpg',
      '/images/realPet/12.jpg',
      '/images/realPet/13.jpg',
      '/images/realPet/14.jpg',
      '/images/realPet/15.jpg',
      '/images/realPet/2.jpg',
      '/images/realPet/3.jpg',
      '/images/realPet/4.jpg',
      '/images/realPet/5.jpg',
      '/images/realPet/6.jpg',
      '/images/realPet/7.jpg',
      '/images/realPet/8.jpg',
      '/images/realPet/9.jpg',
    ],
    realScenery: [
      '/images/realScenery/1.jpg',
      '/images/realScenery/10.jpg',
      '/images/realScenery/11.jpg',
      '/images/realScenery/12.jpg',
      '/images/realScenery/13.jpg',
      '/images/realScenery/14.jpg',
      '/images/realScenery/15.jpg',
      '/images/realScenery/16.jpg',
      '/images/realScenery/17.jpg',
      '/images/realScenery/18.jpg',
      '/images/realScenery/19.jpg',
      '/images/realScenery/2.jpg',
      '/images/realScenery/20.jpg',
      '/images/realScenery/21.jpg',
      '/images/realScenery/22.jpg',
      '/images/realScenery/23.jpg',
      '/images/realScenery/24.jpg',
      '/images/realScenery/25.jpg',
      '/images/realScenery/26.jpg',
      '/images/realScenery/27.jpg',
      '/images/realScenery/28.jpg',
      '/images/realScenery/29.jpg',
      '/images/realScenery/3.jpg',
      '/images/realScenery/30.jpg',
      '/images/realScenery/31.jpg',
      '/images/realScenery/4.jpg',
      '/images/realScenery/5.jpg',
      '/images/realScenery/6.jpg',
      '/images/realScenery/7.jpg',
      '/images/realScenery/8.jpg',
      '/images/realScenery/9.jpg',
    ],
    westAnime: [
      '/images/westAnime/1.jpg',
      '/images/westAnime/10.jpg',
      '/images/westAnime/11.jpg',
      '/images/westAnime/2.jpg',
      '/images/westAnime/3.jpg',
      '/images/westAnime/4.jpg',
      '/images/westAnime/5.jpg',
      '/images/westAnime/6.jpg',
      '/images/westAnime/7.jpg',
      '/images/westAnime/8.jpg',
      '/images/westAnime/9.jpg',
    ],
  }

  const key = Object.keys(imageMap)[Math.floor(Math.random() * Object.keys(imageMap).length)]
  return randomArr(imageMap[key])
}

function randomArr(array) {
  function randomSort(a, b) {
    return Math.random() > 0.5 ? -1 : 1
  }
  return array.sort(randomSort)
}
