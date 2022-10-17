<template>
  <div class="more">
    <div class="title">个人信息&福利</div>
    <div class="line"></div>
    <ul>
      <li><a href="#">消息中心</a></li>
      <li><a href="#">本站积分</a></li>
      <li><a href="#">积分规则</a> <a href="#">积分排行榜</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="less">
  .more {
    background-color: #fff;
    margin-top: 10px;
    padding-top: 5px;
    border-radius: 4px;
  }
  .title {
    font-size: 18px;
    margin-left: 8px;
  }
  .line {
    height: 2px;
    background-color: blue;
    margin-top: 8px;
  }
  li {
    margin-left: 30px;
    line-height: 40px;
    list-style: circle;
  }
  a {
    color: rgb(118, 118, 118);
  }
</style>
