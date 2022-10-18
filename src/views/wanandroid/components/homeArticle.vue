<template>
  <div>
    <div class="home">
      <div class="item" v-for="data in articList" :key="data.id">
        <SvgIcon name="collect_icon" class="icon" />
        <div class="center">
          <div class="title"> <span>新</span> {{ data.title }} </div>
          <div class="tag">
            <div class="tag1" v-if="data.type === 1">置顶</div>
            <div class="tag" v-for="tag in data.tags" :key="tag.name">
              <div class="tag2">{{ tag.name }}</div>
            </div>
            <div class="tag3">作者：{{ data.shareUser != '' ? data.shareUser : data.author }}</div>
            <div class="tag3">分类： 问答 / 官方</div>
            <div class="tag3">时间：{{ formatToDateTime(data.publishTime) }}</div>
          </div>
        </div>
        <div class="more">...</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import SvgIcon from '/@/components/Icon/src/SvgIcon.vue';
  import { articleTop } from '/@/api/wanapi/home';
  import { ref } from 'vue';
  import { formatToDateTime } from '/@/utils/dateUtil';
  export interface Aricle {
    adminAdd: boolean;
    apkLink: string;
    audit: number;
    author: string;
    canEdit: boolean;
    chapterId: number;
    chapterName: string;
    collect: boolean;
    courseId: number;
    desc: string;
    descMd: string;
    envelopePic: string;
    fresh: boolean;
    host: string;
    id: number;
    isAdminAdd: boolean;
    link: string;
    niceDate: string;
    niceShareDate: string;
    origin: string;
    prefix: string;
    projectLink: string;
    publishTime: number;
    realSuperChapterId: number;
    selfVisible: number;
    shareDate: number;
    shareUser: string;
    superChapterId: number;
    superChapterName: string;
    tags: Tag[];
    title: string;
    type: number;
    userId: number;
    visible: number;
    zan: number;
  }

  export interface Tag {
    name: string;
    url: string;
  }
  const articList = ref<Aricle[]>([]);
  const getTop = async () => {
    const a = await articleTop();
    // console.log(a);
    const { data } = JSON.parse(a);
    console.log('size' + data.size);
    articList.value = data;
  };
  getTop();
</script>

<style scoped lang="less">
  .home {
    background-color: #fff;
    border-radius: 4px;
    .item {
      height: 80px;
      display: flex;
      .icon {
        margin: auto 10px;
      }
      .center {
        flex: 1;
        margin: auto 10px;
      }
      .title {
        color: black;
        font-size: 16px;
        font-weight: 700;
        span {
          color: red;
          font-size: 12px;
          height: 12px;
          border: red 1px solid;
          border-radius: 2px;
          font-weight: 500;
          padding: 1px 2px;
        }
      }
      .more {
        font-size: 50px;
        line-height: 1;
        margin-right: 16px;
        color: rgb(118, 118, 118);
        cursor: pointer;
      }
      .tag {
        display: flex;
        margin-top: 5px;
        .tag1 {
          color: red;
          font-size: 12px;
          line-height: 1;
          border-radius: 2px;
          height: 16px;
          border: red 1px solid;
          padding: 1px 2px;
          margin: auto 10px auto 0;
        }
        .tag2 {
          color: rgb(59, 177, 134);
          font-size: 12px;
          border-radius: 2px;
          line-height: 1;
          height: 16px;
          border: rgb(59, 177, 134) 1px solid;
          padding: 1px 2px;
          margin: auto 10px auto 0;
        }
        .tag3 {
          color: rgb(153, 153, 153);
          margin: auto 10px auto 0;
          line-height: 1;
          font-size: 13px;
        }
      }
    }
  }
</style>
