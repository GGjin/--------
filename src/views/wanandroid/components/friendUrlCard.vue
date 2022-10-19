<template>
  <div class="more">
    <div class="title">常用网站</div>
    <div class="line"></div>
    <div class="item">
      <div v-for="(item, index) in urls" :key="item.id" class="view">
        <div>
          <span v-if="index === 0 || urls[index].category != urls[index - 1].category"
            >{{ item.category }}:</span
          >
          <a :href="item.link">{{ item.name }}</a>
        </div>
        <div
          class="line2"
          v-if="index === urls.length - 1 || urls[index].category != urls[index + 1].category"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { reactive, ref, Ref, toRef } from 'vue';
  import { friendUrlApi } from '/@/api/wanapi/home';

  interface BaseData<T> {
    data: T;
    errorMsg: String;
    errorCode: Number;
  }
  interface FriendUrlBean {
    category: String;
    icon: String;
    id: Number;
    link: String;
    name: String;
    order: Number;
    visible: Number;
  }
  const urlMap: Map<String, Array<FriendUrlBean>> = new Map<String, Array<FriendUrlBean>>();
  const urlData = ref(urlMap);
  const urls = ref<FriendUrlBean[]>([]);
  const getFriendUrl = async () => {
    const a = await friendUrlApi();
    const { data } = JSON.parse(a);
    urls.value = data;
    data.forEach((r: FriendUrlBean) => {
      if (!urlData.value.has(r.category)) {
        urlData.value.set(r.category, []);
      }
      urlData.value.get(r.category)?.push(r);
      // console.log('--->' + JSON.stringify(urlData.value.get(r.category)));
    });

    // console.log('urlData.keys--->' + urlData.value.size);
  };
  getFriendUrl();
</script>

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
  .item {
    // display: flex;
    float: inline-start;
    // flex-wrap: wrap;
    a {
      color: rgb(131, 131, 131);
      text-decoration: none;
      margin: 4px 10px;
    }
    span {
      background-color: rgb(27, 147, 251);
      font-size: 14px;
      margin-left: 10px;
      color: #fff;
      padding: 0px 4px;
    }
    .line2 {
      height: 1px;
      margin-top: 6px;
      margin-bottom: 6px;
      background-color: rgb(226, 226, 226);
    }
    .view {
      // margin-left: 10px;
    }
  }
</style>
