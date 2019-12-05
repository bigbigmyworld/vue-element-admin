<template>
  <div class="chart-container">
    <el-input v-model="fundCode" placeholder />
    <el-input v-model="days_num" placeholder="天数" />

    <el-button type="primary" @click="getfundNav">查询</el-button>
    <div v-if="fundDesc">
      <p>数据量:{{ fundDesc.count }}</p>
      <p>均值:{{ fundDesc.mean }}</p>
      <p>标准差:{{ fundDesc.std }}</p>
      <p>最小值:{{ fundDesc.min }}</p>
      <p>25%:{{ fundDesc["25%"] }}</p>
      <p>50%:{{ fundDesc["50%"] }}</p>
      <p>75%:{{ fundDesc["75%"] }}</p>
      <p>最大值:{{ fundDesc["max"] }}</p>
    </div>
    <el-table :data="fundNavDetail" border stripe fit>
      <el-table-column prop="ts_code" label="基金代码" />
      <el-table-column prop="end_date" label="日期" />
      <el-table-column prop="unit_nav" label="单位净值" sortable />
      <el-table-column prop="pct_rank_90" label="超过历史净值百分比(90)" />
      <el-table-column prop="pct_rank_180" label="超过历史净值百分比(180)" />

      <el-table-column prop="accum_nav" label="累计净值" />
      <el-table-column prop="accum_div" label="累计分红" />
      <!-- <el-table-column prop="net_asset" label="资产净值" /> -->
      <el-table-column prop="total_netasset" label="合计资产净值" />
      <el-table-column prop="adj_nav" label="复权单位净值" />
    </el-table>
    <!-- <radar-chart :items="fundNavDetail" />//传递在子组件prop选项里约定好的数据 -->
  </div>
</template>

<script>
import { fundNav } from '@/api/funds.js'
// import RadarChart from "@/components/mycharts/lineCharts/stackLineChart";
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
  components: {},
  data() {
    return {
      fundCode: '001548.OF',
      fundNavDetail: [],
      days_num: 90,
      fundDesc: []
    }
  },
  // created: { getfundNav },
  methods: {
    getfundNav() {
      fundNav(this.fundCode, this.days_num).then(res => {
        this.fundNavDetail = res.data.nav_list
        this.fundDesc = res.data.nav_desc.unit_nav
      })
    }
  }
}
</script>

