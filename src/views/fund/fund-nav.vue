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
    <radar-chart :items="fundNavDetail" />//传递在子组件prop选项里约定好的数据
  </div>
</template>

<script>
import { fundNav } from '@/api/funds.js'
import RadarChart from '@/components/mycharts/lineCharts/stackLineChart'
// import ECharts from "vue-echarts";

// import "echarts/lib/chart/line";
// import "echarts/lib/component/polar";
// import "echarts/lib/chart/bar";
// import "echarts/lib/chart/line";
// import "echarts/lib/chart/pie";
// import "echarts/lib/component/tooltip";
// import "echarts/lib/component/legend";
// import "echarts/lib/component/markPoint";
// import "echarts/lib/component/markLine";
// import "echarts/lib/component/graphic";

export default {
  name: 'FundsNav',
  components: { RadarChart },
  data() {
    return {
      fundCode: '001548.OF',
      fundNavDetail: [],
      items: [
        { name: '体育', value: 95, max: '100' },
        { name: '数学', value: 55, max: '100' },
        { name: '化学', value: 75, max: '100' },
        { name: '劳动', value: 85, max: '100' },
        { name: '烹饪', value: 85, max: '100' }
      ]
    }
  },
  // created: { getfundNav },
  methods: {
    getfundNav() {
      fundNav(this.fundCode).then(res => {
        this.fundNavDetail = res.data
      })
    }
  }
}
</script>

