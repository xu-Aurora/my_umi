import { ApplyPluginsType, dynamic } from '/Users/xucongmac/code/umiApp/node_modules/@umijs/runtime';
import { plugin } from './plugin';

const routes = [
  {
    "path": "/",
    "redirect": "/login",
    "exact": true
  },
  {
    "path": "/login",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Login' */'@/pages/Login'), loading: require('@/components/PageLoading').default}),
    "exact": true
  },
  {
    "path": "/layouts",
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'layouts' */'@/layouts'), loading: require('@/components/PageLoading').default}),
    "routes": [
      {
        "path": "/layouts",
        "redirect": "/layouts/sub1_home",
        "exact": true
      },
      {
        "path": "/layouts/sub1_home",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__home' */'@/pages/home'), loading: require('@/components/PageLoading').default}),
        "exact": true
      },
      {
        "path": "/layouts/sub1_hero",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Hero' */'@/pages/Hero'), loading: require('@/components/PageLoading').default}),
        "exact": true
      },
      {
        "path": "/layouts/sub2_subnav",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Subnav' */'@/pages/Subnav'), loading: require('@/components/PageLoading').default}),
        "exact": true
      },
      {
        "path": "/layouts/sub2_1_1",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__sub2_1' */'@/pages/sub2_1'), loading: require('@/components/PageLoading').default}),
        "exact": true
      },
      {
        "path": "/layouts/sub2_1_2",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__sub2_2' */'@/pages/sub2_2'), loading: require('@/components/PageLoading').default}),
        "exact": true
      },
      {
        "path": "/layouts/authorized",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__Authorized' */'@/pages/Authorized'), loading: require('@/components/PageLoading').default}),
        "wrappers": [require('@/components/Wrappers').default],
        "exact": true
      },
      {
        "path": "/layouts/403",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__403' */'/Users/xucongmac/code/umiApp/src/pages/403'), loading: require('@/components/PageLoading').default}),
        "exact": true
      },
      {
        "path": "/layouts/500",
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__500' */'/Users/xucongmac/code/umiApp/src/pages/500'), loading: require('@/components/PageLoading').default}),
        "exact": true
      },
      {
        "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/xucongmac/code/umiApp/src/pages/404'), loading: require('@/components/PageLoading').default}),
        "exact": true
      }
    ]
  },
  {
    "component": dynamic({ loader: () => import(/* webpackChunkName: 'p__404' */'/Users/xucongmac/code/umiApp/src/pages/404'), loading: require('@/components/PageLoading').default}),
    "exact": true
  }
];

// allow user to extend routes
plugin.applyPlugins({
  key: 'patchRoutes',
  type: ApplyPluginsType.event,
  args: { routes },
});

export { routes };
