import { defHttp } from '/@/utils/http/axios';

export enum Api {
  friendUrl = '/friend/json',
  articleTop = '/article/top/json',
  // articleList = (page) => `/article/list/${page}/json`,
}
export const friendUrlApi = () => {
  return defHttp.get({ url: Api.friendUrl });
};

export const articleTop = () => {
  return defHttp.get({ url: Api.articleTop });
};
// export const articleList = () => {
//   return defHttp.get({ url: Api.articleList() });
// };
