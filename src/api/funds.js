import request from '@/utils/request'

// export function fundNav(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

export function fundNav(ts_code) {
  return request({
    url: '/fund/nav',
    method: 'get',
    params: { ts_code }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
