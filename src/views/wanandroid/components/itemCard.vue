<template>
  <div class="card">
    <div v-for="item in props.cardData" :key="item.id">
      <div :class="item.isNew === true ? 'item-card border' : 'item-card'">{{ item.title }} </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  export interface CardData {
    title: String;
    isNew: Boolean;
    id: string;
  }
  const props = defineProps({ cardData: Array as PropType<CardData[]> });
</script>

<style scoped lang="less">
  .card {
    background-color: #fff;
    width: 280px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 8px;
    border-radius: 4px;
    .item-card {
      background-color: rgb(52, 152, 219);
      padding: 5px 10px;
      border-radius: 4px;
      margin-right: 10px;
      margin-bottom: 10px;
      font-size: 17px;
      color: #fff;
      user-select: none;
      cursor: pointer;
      &.border::before {
        content: 'New';
        position: absolute;
        font-size: 2px;
        transform: translate(-13px, -13px);
        padding: 0 4px;
        border-radius: 4px;
        color: #fff;
        background-color: #ff0000;
      }
    }
  }
</style>
