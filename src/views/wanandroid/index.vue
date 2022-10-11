<template>
  <div class="box">
    <a href="#">新浪导航</a>
    <a href="#">新浪导航</a>
    <a href="#">新浪导航</a>
    <a href="#">新浪导航</a>
  </div>
  <div class="news">
    <h2>最新文章/New Articles</h2>
    <ul>
      <li><a href="#">翻阅 官方文档才解决的</a></li>
      <li><a href="#">翻阅 官方文档才解决的</a></li>
      <li><a href="#">翻阅 官方文档才解决的</a></li>
      <li><a href="#">翻阅 官方文档才解决的</a></li>
      <li><a href="#">翻阅 官方文档才解决的</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
  * {
    margin: 0;
    padding: 0;
  }
  ul {
    list-style: none;
  }
  .news li {
    height: 50px;
    border-bottom: 1px dashed #ccc;
    padding-left: 28px;
    line-height: 50px;
  }
  .news a {
    text-decoration: none;
    color: #666;
    font-size: 18px;
  }
  .box {
    height: 40px;
    border-top: 3px solid #ff8500;
    border-bottom: 1px solid #edeef0;
  }
  .box a {
    width: 80px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
    font-size: 12px;
    color: #4c4c4c;
    text-decoration: none;
  }
  .box a:hover {
    background-color: #edeef0;
    color: #ff8500;
  }
  .news {
    width: 500px;
    height: 400px;
    border: 1px solid #ccc;
    margin: 50px auto;
    padding: 42px 30px 0;
  }
  .news h2 {
    border-bottom: 1px solid #ccc;
    font-size: 30px;
    line-height: 1;
    padding-bottom: 9px;
  }
</style>
