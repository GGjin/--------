import { defHttp } from '/@/utils/http/axios';

enum Api {
  DISTRIBUTOR_COUNT = '/brand', //经销商开通数
  BUSINESS_DEPARTMENT_LIST = '/brand', //营销公司信息\大区信息相关接口
  DISTRIBUTOR_LIST = '/brand', //经销商管理
  PARTNER_TRACE_NUM = '/dcs', //基本数据
  HOME_DATA_LIST = '/dcs', //折线图
  HOME_DATA_EXPORT = '/dcs', //导出
}

/**
 * 经销商开通数
 * @param params
 * @returns
 */
export const GetDistributorCountApi = (params) => {
  return defHttp.get({ url: Api.DISTRIBUTOR_COUNT, params });
};

/**
 * 营销公司信息接口
 */
export const GetBusinessDepartmentListApi = (params) => {
  return defHttp.post({ url: Api.BUSINESS_DEPARTMENT_LIST, params });
};

/**
 * 经销商广利
 * @param params
 * @returns
 */
export const GetDistributorListApi = (params) => {
  return defHttp.post({ url: Api.DISTRIBUTOR_LIST, params });
};

/**
 * base data api
 * @param params
 * @returns
 */
export const GetPartnerTraceNumApi = (params) => {
  return defHttp.post({ url: Api.PARTNER_TRACE_NUM, params });
};

/**
 * charts api
 * @param params
 * @returns
 */
export const GetChartsListApi = (params) => {
  return defHttp.post({ url: Api.HOME_DATA_LIST, params });
};

/**
 * 导出数据
 * @param params
 * @returns
 */
export function exportHomeApi(params) {
  return defHttp.post(
    {
      timeout: 20 * 1000,
      url: Api.HOME_DATA_EXPORT,
      params,
      responseType: 'blob',
    },
    {
      isReturnNativeResponse: true,
    },
  );
}
