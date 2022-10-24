<template>
  <div class="tools">
    <div class="title">{{ props.cardTitle }}</div>
    <div class="line"></div>
    <div class="list">
      <div v-for="item in props.dataList" :key="item.id" class="item">
        <div>{{ item.title }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  export interface CommonToolData {
    title: string;
    id: number;
    isNew: Boolean;
    path: string;
  }
  const props = defineProps({ dataList: Array as PropType<CommonToolData[]>, cardTitle: String });
</script>

<style scoped lang="less">
  .tools {
    background-color: #fff;
    margin-top: 10px;
    padding-top: 5px;
    border-radius: 4px;
  }
  .title {
    font-size: 17px;
    margin-left: 8px;
  }
  .line {
    height: 2px;
    background-color: blue;
    margin-top: 8px;
  }
  .list {
    padding-left: 16px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .item {
    border: rgb(32, 122, 182) 1px solid;
    color: rgb(32, 122, 182);
    margin-right: 15px;
    margin-bottom: 8px;
    margin-top: 8px;
    padding: 3px 6px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      color: #fff;
      background-color: rgb(32, 122, 182);
      border-radius: 4px;
    }
  }
</style>
