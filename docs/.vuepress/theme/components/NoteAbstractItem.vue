<template>
  <div class="abstract-item"
       :class="getAnimate"
       :style="getStyle"
       @click="$router.push(item.path)">
    <div class="abstract-item-left">
      <!-- <img src="http://www.zpzpup.com/assets/image/gd04.jpg"
           alt=""> -->
      <img :src="$withBase(getOneImgSrc)"
           alt="">
    </div>
    <div class="abstract-item-right">
      <reco-icon v-if="item.frontmatter.sticky"
                 icon="reco-sticky" />
      <div class="title">
        <reco-icon v-if="item.frontmatter.keys"
                   icon="reco-lock" />
        <router-link :to="item.path">{{item.title}}</router-link>
      </div>
      <div class="abstract"
           v-html="item.excerpt"></div>
      <PageInfo :pageInfo="item"
                :currentTag="currentTag"
                class="page-info">
      </PageInfo>
    </div>
  </div>
</template>

<script>
import { RecoIcon } from '@vuepress-reco/core/lib/components'
import PageInfo from './PageInfo'
import { getOneColor, getOneImgArr } from '@theme/helpers/other'
export default {
  components: { PageInfo, RecoIcon },
  props: ['item', 'currentPage', 'currentTag'],
  data() {
    return {
      index: 0,
    }
  },
  computed: {
    getAnimate() {
      const arr = ['draw', 'wind', 'center', 'meet']
      return arr[Math.floor(Math.random() * arr.length)]
    },
    getStyle() {
      return {
        '--border-color': getOneColor(),
      }
    },
    getOneImgSrc() {
      const ImgArr = getOneImgArr()
      return ImgArr[this.index++ % ImgArr.length]
    },
  },
}
</script>

<style lang="stylus" scoped>
.abstract-item {
  position: relative;
  margin: 0 auto 20px;
  padding: 16px 20px;
  width: 100%;
  overflow: hidden;
  border-radius: $borderRadius;
  box-shadow: var(--box-shadow);
  box-sizing: border-box;
  transition: all 0.3s;
  background-color: var(--background-color);
  cursor: pointer;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;

  > * {
    pointer-events: auto;
  }

  &::before, &::after {
    box-sizing: inherit;
    content: '';
    position: absolute;
    border: 3px solid transparent;
    width: 0;
    height: 0;
  }

  .abstract-item-left {
    width: 40%;
    height: 200px;
    border-radius: 10px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      transform: scale(1);
      transition: transform 1s;
    }
  }

  .abstract-item-right {
    flex: 1;
    overflow: hidden;
    margin-left: 2rem;

    .reco-sticky {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      color: $accentColor;
      font-size: 2.4rem;
    }

    .title {
      position: relative;
      font-size: 1.6rem;
      font-weight: 600;
      line-height: 48px;
      display: inline-block;

      a {
        color: var(--text-color);
      }

      .reco-lock {
        font-size: 1.28rem;
        color: $accentColor;
      }

      &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: 0;
        left: 0;
        background-color: $accentColor;
        visibility: hidden;
        -webkit-transform: scaleX(0);
        transform: scaleX(0);
        transition: 0.3s ease-in-out;
      }

      &:hover a {
        color: $accentColor;
      }

      &:hover:after {
        visibility: visible;
        -webkit-transform: scaleX(1);
        transform: scaleX(1);
      }
    }

    .abstract {
      max-height: 130px;
      overflow: hidden;
      font-size: 16px;
    }

    .tags {
      .tag-item {
        &.active {
          color: $accentColor;
        }

        &:hover {
          color: $accentColor;
        }
      }
    }
  }

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }

  &:hover img {
    transform: scale(1.25);
  }
}

@media (max-width: $MQMobile) {
  .tags {
    display: block;
    margin-top: 1rem;
    margin-left: 0 !important;
  }

  .abstract-item {
    flex-direction: column;
    align-content: center;

    .abstract-item-left {
      width: 100%;
    }

    .abstract-item-right {
      width: 100%;

      .abstract {
        display: none;
      }

      .page-info {
        display: flex;
      }
    }
  }
}

.draw::before, .meet::before, .meet::after, .center::before, .center::after, .wind::before {
  // 边框动画
  top: 0;
  left: 0;
}

.draw::after, .wind::after {
  bottom: 0;
  right: 0;
}

.draw:hover::before, .draw:hover::after, .meet:hover::before, .meet:hover::after, .center::before, .center::after, .wind:hover::before, .wind:hover::after {
  width: 100%;
  height: 100%;
}

.draw:hover::before {
  border-top-color: var(--border-color);
  border-right-color: var(--border-color);
  transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
}

.draw:hover::after {
  border-bottom-color: var(--border-color);
  border-left-color: var(--border-color);
  transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s;
}

.meet:hover::before {
  border-top-color: var(--border-color);
  border-right-color: var(--border-color);
  transition: width 0.5s ease-out, height 0.5s ease-out 0.5s;
}

.meet:hover::after {
  border-bottom-color: var(--border-color);
  border-left-color: var(--border-color);
  transition: height 0.5s ease-out, width 0.25s ease-out 0.5s;
}

.center::before, .center::after {
  -webkit-transform-origin: center;
  transform-origin: center;
}

.center::before {
  border-top: 2px solid var(--border-color);
  border-bottom: 2px solid var(--border-color);
  -webkit-transform: scale3d(0, 1, 1);
  transform: scale3d(0, 1, 1);
}

.center::after {
  border-left: 2px solid var(--border-color);
  border-right: 2px solid var(--border-color);
  -webkit-transform: scale3d(1, 0, 1);
  transform: scale3d(1, 0, 1);
}

.center:hover::before, .center:hover::after {
  -webkit-transform: scale3d(1, 1, 1);
  transform: scale3d(1, 1, 1);
  transition: transform 1s, -webkit-transform 1s;
}

.wind:hover::before {
  border-top-color: var(--border-color);
  border-right-color: var(--border-color);
  transition: width 0.5s ease-out, height 0.5s ease-out 0.5s;
}

.wind:hover::after {
  border-bottom-color: var(--border-color);
  border-left-color: var(--border-color);
  transition: width 0.5s ease-out, height 0.25s ease-out 0.5s;
}
</style>
