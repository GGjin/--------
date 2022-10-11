<template>
  <div class="home">
    <div class="info-box partner">
      <p class="flex items-center open-number">
        <img class="set-img" :src="imgInfoSet" alt="icon" />经销商开通数：
        <span>{{ distributorCount }}</span>
      </p>
      <Form
        ref="formRef"
        :model="formState"
        :label-col="{ span: 24 }"
        :wrapper-col="{ span: 24 }"
        autocomplete="off"
        :colon="false"
        layout="vertical"
      >
        <Row class="form-search-box">
          <Col :span="6" class="pr-5">
            <FormItem name="gold" label="营销公司">
              <Select
                v-model:value="formState.gold"
                mode="tags"
                :options="businessList"
                style="width: 100%"
                :max-tag-count="2"
                placeholder="全部"
                @change="getAreaList"
              />
            </FormItem>
          </Col>
          <Col :span="6" class="pr-5">
            <FormItem name="area" label="大区">
              <Select
                v-model:value="formState.area"
                mode="tags"
                :options="areaList"
                style="width: 100%"
                placeholder="全部"
                @change="getDealersList"
                :max-tag-count="2"
              />
            </FormItem>
          </Col>
          <Col :span="6" class="pr-5">
            <FormItem name="business" label="经销商">
              <Select
                mode="multiple"
                v-model:value="formState.business"
                :options="deadlersList"
                style="width: 100%"
                placeholder="全部"
                :max-tag-count="1"
              />
            </FormItem>
          </Col>
          <Col :span="6" class="pr-5">
            <FormItem name="time" label="时间">
              <RangePicker
                :allow-clear="false"
                v-model:value="formState.time"
                :ranges="ranges"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                @change="dateChange"
                separator="⇁"
              >
                <template #suffixIcon>
                  <img :src="dateIcon" alt="date-icon" />
                </template>
              </RangePicker>
            </FormItem>
          </Col>
        </Row>
        <div class="button-box"><Button type="primary" @click="searchForm">查询</Button></div>
      </Form>
    </div>
    <div class="bottom-box" span="24">
      <div class="flex justify-between">
        <div class="detail-box">
          <div class="sub-title">合伙人</div>
          <div class="flex justify-between">
            <div class="sub-num">{{ baseData.totalPartnerNum }}</div>
            <img class="sub-img" :src="imgInfo1" alt="" />
          </div>
        </div>
        <div class="detail-box">
          <div class="sub-title">线索</div>
          <div class="flex justify-between">
            <div class="sub-num">{{ baseData.totalPartnerNum }}</div>
            <img class="sub-img" :src="imgInfo1" alt="" />
          </div>
        </div>
        <div class="detail-box">
          <div class="sub-title">成交</div>
          <div class="flex justify-between">
            <div class="sub-num">{{ baseData.totalPartnerNum }}</div>
            <img class="sub-img" :src="imgInfo1" alt="" />
          </div>
        </div>
        <div class="detail-box">
          <div class="sub-title">转化率</div>
          <div class="flex justify-between">
            <div class="sub-num">{{ baseData.totalPartnerNum }}</div>
            <img class="sub-img" :src="imgInfo1" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from 'vue';
  import {
    DatePicker,
    Row,
    Col,
    Form,
    Select,
    Radio,
    Tooltip,
    Button,
    message,
  } from 'ant-design-vue';
  import imgInfo1 from '/@/assets/images/main/info-1.png';
  import imgInfo2 from '/@/assets/images/main/info-8.png';
  import imgInfo6 from '/@/assets/images/main/info-6.png';
  import imgInfo7 from '/@/assets/images/main/info-7.png';
  import imgInfoSet from '/@/assets/images/info-set.png';
  import downloadImg from '/@/assets/images/main/download.png';
  import dateIcon from '/@/assets/images/date-icon.png';
  import { downloadByData } from '/@/utils/file/download';
  import moment from 'moment';
  import LineChart from './components/LineChart.vue';
  import { QuestionCircleOutlined } from '@ant-design/icons-vue';
  import {
    GetDistributorCountApi,
    GetBusinessDepartmentListApi,
    GetDistributorListApi,
    GetPartnerTraceNumApi,
    GetChartsListApi,
    exportHomeApi,
  } from '/@/api/dashboard/main';
  import { type } from 'os';
  import { mode } from 'crypto-js';
  const FormItem = Form.Item;
  const RadioGroup = Radio.Group;
  const RadioButton = Radio.Button;
  const RangePicker = DatePicker.RangePicker;
  interface DataType {
    value: String;
    label: String;
  }
  const formRef = ref();
  const formState = reactive<{
    area: String[];
    business: String[];
    gold: String[];
    time: String[];
  }>({
    area: [],
    business: [],
    gold: [],
    time: [
      moment().subtract(7, 'day').format('YYYY-MM-DD'),
      moment().subtract(1, 'day').format('YYYY-MM-DD'),
    ],
  });
  const ranges = {
    '7天': [moment().subtract(7, 'day'), moment().subtract(1, 'day')],
    '20天': [moment().subtract(30, 'day'), moment().subtract(1, 'day')],
    '90天': [moment().subtract(90, 'day'), moment().subtract(1, 'day')],
  };
  const baseData = reactive({
    totalPartnerNum: 0,
    validClue: 0,
    dealtNum: 0,
    availablePercent: 0,
  });
  const type = ref(1);
  const businessList = ref<DataType[]>([]);
  const areaList = ref<DataType[]>([]);
  const deadlersList = ref<DataType[]>([]);
  const initDealerIds = ref<DataType[]>([]);

  const distributorCount = ref(0);
  const totalNum = ref(0);
  const xData = ref([]);
  const yData = ref([]);
  const dateChange = (date) => {
    formState.time = date;
  };
  const handleType = () => {
    getChartDate();
  };
  const getDistributorCount = async () => {
    const data = await GetDistributorCountApi({});
    distributorCount.value = data;
  };
  const getList = async () => {
    const data = await GetBusinessDepartmentListApi({ queryType: 1 });
    data.forEach((r: any) => {
      businessList.value.push({ value: r.id, label: r.orgName });
    });
  };
  const getAreaList = async () => {
    areaList.value = [];
    formState.area = [];
    deadlersList.value = [];
    formState.business = [];
    const params =
      formState.gold.length > 0 ? { queryType: 3, idList: formState.gold } : { queryType: 2 };
    const data = await GetBusinessDepartmentListApi({ ...params });
    data.forEach((r: any) => {
      areaList.value.push({ value: r.id, label: r.orgName });
    });
    formState.gold.length === 0 && getDealersList();
  };
  const getDealersList = async () => {
    deadlersList.value = [];
    formState.business = [];
    const dataList = await GetDistributorListApi({
      areaCodes: formState.area.length > 0 ? formState.area : null,
    });
    dataList.forEach((r: any) => {
      deadlersList.value.push({ value: r.code, label: r.name });
    });
  };
  const getBaseData = async () => {
    const params = {
      dealerIds: formState.business.length > 0 ? formState.business : initDealerIds.value,
      startDate: formState.time[0],
      endDate: formState.time[1],
    };
    const { totalPartnerNum, validClue, dealtNum, dealtPercent } = await GetPartnerTraceNumApi({
      ...params,
    });
    baseData.totalPartnerNum = totalPartnerNum ? totalPartnerNum : 0;
    baseData.validClue = validClue ? validClue : 0;
    baseData.dealtNum = dealtNum ? dealtNum : 0;
    baseData.availablePercent = dealtPercent ? dealtPercent : 0;
  };
  const getChartDate = async () => {
    const params = {
      deadlersList: formState.business.length > 0 ? formState.business : initDealerIds.value,
      starDate: formState.time[0],
      endDate: formState.time[1],
      type: type.value,
    };
    const { model, total } = await GetChartsListApi({ ...params });
    xData.value = model && Object.keys(model);
    yData.value = mode && Object.values(model);
    totalNum.value = total;
  };
  const searchForm = () => {
    console.log('-----');
    if (formState.area.length === 0 || formState.business.length === 0) {
      message.error('没有经销商');
      console.log('-----没有经销商');
      return;
    }
    if (formState.time.length === 0) {
      message.error('请选择日期');
      console.log('-----请选择日期');
      return;
    }
    getBaseData();
    getChartDate();
  };
  const exportData = () => {
    const params = {
      deadlersList: formState.business.length > 0 ? formState.business : initDealerIds.value,
      starDate: formState.time[0],
      endDate: formState.time[1],
      dcsType: 2,
    };
    exportHomeApi({ ...params }).then((res) => {
      let fileName = decodeURI(res.headers['content-disposition'].split('=')[1]);
      downloadByData(res.data, fileName);
    });
  };
  getDistributorCount();
  getList();
  getAreaList();
  const init = async () => {
    const dataList = await GetDistributorListApi({ areaCodes: null });
    initDealerIds.value = await dataList.map((item) => item.code);
    getBaseData();
    getChartDate();
  };
  init();
</script>

<style scoped lang="less">
  .home {
    ::v-deep(.ant-selent-selection-placeholder) {
      color: #bbb;
    }

    h3 {
      height: 22px;
      font-weight: 600;
      font-size: 16px;
      color: #333;
      letter-spacing: 0;
    }

    .info-box {
      background-color: #fff;
      padding-bottom: 10px;
      border-radius: 6px;
      margin: 14px;
      padding-top: 20px;
      padding-left: 16px;
      .card-box {
        padding-left: 75px;
        padding-right: 22px;
        position: relative;

        &:first-child {
          padding-left: 0;
        }

        &::after {
          content: '';
          position: absolute;
          right: 0;
          width: 1px;
          height: 59px;
          opacity: 0.41;
          background: #bec4ce;
          top: 0;
        }
      }
    }
  }
  .open-number {
    span {
      font-size: 20px;
      color: #333;
      font-weight: 600;
      margin-left: 8px;
    }
  }
  .set-img {
    width: 16px;
    height: 16px;
    margin-right: 5px;
    display: block;
  }
  .sub-title {
    font-size: 16px;
    color: #333;
  }
  .sub-num {
    font-size: 26px;
    color: #000;
  }
  .sub-img {
    width: 60px;
    height: 60px;
  }
  .bottom-box {
    width: 100%;
    margin: 16px;
    background-color: #fff;
    padding: 10px;
    border-radius: 6px;
  }
  .detail-box {
    height: 50%;
    width: 100%;
    padding: 0 20px;
    border-right: #333 solid 1px;
  }
</style>
