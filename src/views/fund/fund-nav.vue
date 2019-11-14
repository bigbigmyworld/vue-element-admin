<template>
  <div class="chart-container">
    <el-input v-model="fundCode" placeholder />
    <el-button type="primary" @click="getfundNav">查询</el-button>
    <el-table :data="fundNavDetail" border stripe>
      <el-table-column prop="ts_code" label="基金代码" />
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

