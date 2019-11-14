import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query,
    baseURL: '/mock'
  })
}

export function fetchArticle(id) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: {
      id
    },
    baseURL: '/mock'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: {
      pv
    },
    baseURL: '/mock'
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data,
    baseURL: '/mock'
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data,
    baseURL: '/mock'
  })
}
