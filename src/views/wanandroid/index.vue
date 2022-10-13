<template>
  <div>
    <div class="top">
      <img :src="icon" alt="icon" />
      <a href="#">首页</a>
      <a href="#">广场</a>
      <a href="#">导航</a>
      <a href="#">教程</a>
      <a href="#">学习路线</a>
      <a href="#">问答</a>
      <a href="#">项目</a>
      <a href="#">公众号</a>
      <a href="#">项目分类</a>
      <a href="#">工具</a>
      <a href="#">收藏</a>
    </div>
    <div class="home">
      <div class="left">
        <div class="banner">
          <img :src="banner" alt="" class="banner-left" />
          <div class="banner-right">
            <img :src="banner" alt="" />
            <img :src="banner" alt="" />
          </div>
        </div>
      </div>
      <div class="right">
        <input type="text" class="search" placeholder="搜索关键词以空格形式隔开" />
        <MoreCard titleName="更多" :getData="moreData" />
        <itemCard :cardData="cardData" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import icon from '/@/assets/images/logo.png';
  import banner from '/@/assets/images/banner.png';
  import MoreCard, { MoreCardInfo } from './components/MoreCard.vue';
  import itemCard, { CardData } from './components/itemCard.vue';

  const moreData: MoreCardInfo[] = [
    {
      path: '1',
      name: '体系',
    },
  ];

  const cardData: CardData[] = [
    {
      title: '本站开放API',
      isNew: false,
    },
    {
      title: '待办清单',
      isNew: false,
    },
    {
      title: '分享文章',
      isNew: false,
    },
    {
      title: '分享项目',
      isNew: false,
    },
    {
      title: '本站APP下载',
      isNew: true,
    },
    {
      title: '问答征集',
      isNew: true,
    },
  ];
</script>

<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  .view {
    margin: 0 auto;
  }
  ul {
    list-style: none;
  }
  .top {
    height: 60px;
    border-bottom: 1px solid #edeef0;
    background-color: #fff;
    display: flex;
  }
  .top a {
    height: 100%;
    display: inline-block;
    text-align: center;
    font-size: 18px;
    padding-left: 12px;
    text-align: center;
    line-height: 60px;
    padding-right: 12px;
    color: #4c4c4c;
    text-decoration: none;
  }
  .top img {
    width: 90px;
    padding: 2px;
    margin-right: 20px;
    margin-left: 20px;
    height: 60px;
  }
  .top a:hover {
    background-color: #edeef0;
    color: #ff8500;
  }
  .left {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }
  .right {
    height: 100%;
    width: 300px;
    padding-right: 20px;
    margin-left: 20px;
  }
  .home {
    align-content: center;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
  }
  .banner {
    display: flex;
  }
  .banner-left {
    width: 700px;
    height: 400px;
  }
  .banner-right img {
    width: 350px;
    height: 200px;
  }
  .search {
    width: 280px;
    height: 40px;
    margin-right: 16px;
    border-radius: 4px;
    padding-left: 10px;
  }
</style>
