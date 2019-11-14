<template>
  <div class="chart-container">
    <el-input v-model="fundCode" placeholder />
    <el-button type="primary" @click="getfundNav">查询</el-button>
    <el-table :data="fundNavDetail" border stripe>
      <el-table-column prop="ts_code" label="基金代码" />
      <el-table-column prop="ann_date" label="公告日期" />
      <el-table-column prop="end_date" label="截止日期" />

      <el-table-column prop="symbol" label="股票代码" />
      <el-table-column prop="mkv" label="持有股票市值(元)" sortable />
      <el-table-column prop="amount" label="持有股票数量（股）" />
      <el-table-column prop="stk_mkv_ratio" label="占股票市值比" />
      <el-table-column prop="stk_float_ratio" label="占流通股本比例" />
    </el-table>
  </div>
</template>

<script>
import { apiFundPortfolio } from '@/api/funds.js'

export default {
  name: 'FundsNav',
  components: {},
  data() {
    return {
      fundCode: '001548.OF',
      fundNavDetail: ''
    }
  },
  methods: {
    getfundNav() {
      apiFundPortfolio(this.fundCode).then(res => {
        this.fundNavDetail = res.data
      })
    }
  }
}
</script>

