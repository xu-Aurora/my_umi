# umi project

## Getting Started

安装依赖

```bash
yarn
```

启动项目

```bash
yarn start
```

打包

```bash
yarn build
```

本地启动打包部署项目

```bash
1、 yarn global add serve
2、 进入到打包的dist文件
3、 执行命令serve

```

## 技术栈

- [umiJs](https://umijs.org/zh/guide/)
- [typeScript](https://www.tslang.cn/docs/handbook/basic-types.html)
- [umi-hooks](https://hooks.umijs.org/zh-CN/hooks/async)
- [dva](https://dvajs.com/guide/#%E7%89%B9%E6%80%A7)

```bash
注意点: 
使用umi-hooks:
  1、umi框架内置的useRequest和单独报下载'@umijs/hooks'里useRequest有些不同，
umi 里面的 useRequest 要求相应的结果必须是这样 {data: {xxx}} ，要用 data 包一下
  2、不能搭配配合dva使用
  3、可使用umi-hooks+hox配合使用
```

## 项目学习例子

> [antd-pro](https://pro.ant.design/docs/getting-started-cn)

> [umi配置路由权限](https://umijs.org/zh-CN/docs/routing#wrappers)

> [Ant Design Plus](https://antd-plus.alitajs.com/components/authorized-cn)

> [react-admin-template](https://github.com/ts-react/react-admin-template)

> [antd-admin](https://github.com/zuiidea/antd-admin)

> [umi-antd-pro](https://github.com/alitajs/umi-antd-pro/blob/antd-pro/README.zh-CN.md)

> [骨架](https://ant.design/components/skeleton-cn/)

> [hox:取代redux库](https://github.com/umijs/hox/blob/master/README-cn.md)

## 适配

```bash
标签使用antd的Row和Col，对需要适配的地方用'@media'适配
```

## 框架已有配置

```bash

1. 可直接使用less编译
2. 已默认配置好alias，'@'->'src'

```


## [lodash](https://www.html.cn/doc/lodash/)

1. isEmpty   判断任何类型数据是否为空
2. debounce  防抖
3. throttle  节流
4. cloneDeep  深克隆对象
4. isEqual  执行深比较来确定两者的值是否相等




## 项目用到的库

> 图片压缩上传[compressorjs](https://github.com/fengyuanchen/compressorjs)



## ts

- [减少重复代码](https://juejin.im/post/5ecdb192f265da76d53c08e1)
- [工具类型](https://mp.weixin.qq.com/s?__biz=MzI2MjcxNTQ0Nw==&mid=2247484142&idx=1&sn=946ba90d10e2625513f09e60a462b3a7&scene=19#wechat_redirect)


