<template>
  <div class="more">
    <div class="title">{{ props.titleName }}</div>
    <div class="line"></div>
    <ul>
      <li v-for="item in getData" :key="item.id">
        <a :href="item.path">{{ item.name }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  export interface MoreCardInfo {
    path: string;
    name: string;
    id: number;
  }
  const props = defineProps({ titleName: String, getData: Array as PropType<MoreCardInfo[]> });
</script>

<style lang="less" scoped>
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
  a:link {
    text-decoration: underline #000 1px;
  }
</style>
