// 当前这个模块：API进行统一管理
import requests from './request'
import mockRequests from './mockAjax'

// 三级联动接口
export const reqCategoryList = () => {
  // 发请求：axios发请求返回结果Promise对象
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get',
  })
}

// 获取banners（Home首页轮播图接口）
export const reqGetBannerList = () => {
  return mockRequests({
    url: '/banner',
    method: 'get',
  })
}

// 获取floor数据
export const reqFloorList = () => {
  return mockRequests({
    url: '/floor',
    method: 'get',
  })
}

// 搜索接口
export const reqGetSearchInfo = params => {
  return requests({
    url: '/list',
    method: 'post',
    data: params,
  })
}
