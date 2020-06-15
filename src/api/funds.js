import request from '@/utils/request'

// export function fundNav(data) {
//   return request({
//     url: '/user/login',
//     method: 'post',
//     data
//   })
// }

export function fundNav(tsCode, days_num) {
  return request({
    url: '/fund/nav',
    method: 'get',
    params: { tsCode, days_num }
  })
}

export function apiFundPortfolio(tsCode) {
  return request({
    url: '/fund/portfolio',
    method: 'get',
    params: { tsCode }
  })
}

export function apiFundBasicQuery(period) {
  return request({
    url: '/fund/basic_query',
    method: 'get',
    params: { period }
  })
}

export function apiRefillFundNav(tsCode) {
  return request({
    url: '/fund/refill_fund_nav',
    method: 'get',
    params: { tsCode }
  })
}

export function apiQueryFundPredict(ts_code, predict_value, gztime) {
  return request({
    url: '/fund/query_fund_predict',
    method: 'get',
    params: { ts_code, predict_value, gztime }
  })
}

export function apiUpdateFundStar(ts_code, star_3, star_5) {
  return request({
    url: '/fund/update_fund_star',
    method: 'get',
    params: { ts_code, star_3, star_5 }
  })
}
