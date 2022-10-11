import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/wanandroid',
  name: 'WanAndroid',
  component: LAYOUT,
  redirect: '/wanandroid/index',
  meta: {
    orderNo: 100,
    icon: 'ion:grid-outline',
    title: t('玩安卓'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'Wanandroid',
      component: () => import('/@/views/wanandroid/index1.vue'),
      meta: {
        // affix: true,
        title: t('玩安卓'),
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
