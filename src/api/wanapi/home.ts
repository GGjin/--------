import { defHttp } from '/@/utils/http/axios';

export enum Api {
  friendUrl = '/friend/json',
}
export const friendUrlApi = () => {
  return defHttp.get({ url: Api.friendUrl });
};
