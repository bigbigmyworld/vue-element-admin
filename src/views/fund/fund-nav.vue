<template>
  <div class="chart-container">
    <el-input v-model="fundCode" placeholder />
    <el-button type="primary" @click="getfundNav">查询</el-button>
    <el-table :data="fundNavDetail" border stripe>
      <el-table-column prop="ts_code" label="基金代码" />
      <el-table-column prop="ann_date" label="日期" />
      <el-table-column prop="unit_nav" label="单位净值" sortable />
      <el-table-column prop="accum_nav" label="累计净值" />
      <el-table-column prop="accum_div" label="累计分红" />
      <el-table-column prop="net_asset" label="资产净值" />
      <el-table-column prop="total_netasset" label="合计资产净值" />
      <el-table-column prop="adj_nav" label="复权单位净值" />

    </el-table>
  </div>
</template>

<script>
import { fundNav } from '@/api/funds.js'

export default {
  name: 'FundsNav',
  components: {},
  data() {
    return {
      fundCode: '165509.SZ',
      fundNavDetail: ''
    }
  },
  methods: {
    getfundNav() {
      fundNav(this.fundCode).then(res => {
        this.fundNavDetail = res.data
      })
    }
  }
}
</script>

