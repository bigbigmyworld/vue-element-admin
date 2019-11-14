import request from '@/utils/request'

// export function fundNav(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

export function fundNav(tsCode) {
  return request({
    url: '/fund/nav',
    method: 'get',
    params: { tsCode }
  })
}

export function apiFundPortfolio(tsCode) {
  return request({
    url: '/fund/portfolio',
    method: 'get',
    params: { tsCode }
  })
}

