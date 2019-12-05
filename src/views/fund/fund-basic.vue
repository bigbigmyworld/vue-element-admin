<template>
  <div class="chart-container">
    <el-input v-model="fundCode" placeholder />
    <el-button type="primary" @click="getfundBasic">查询</el-button>
    <el-table :data="fundNavDetail" border stripe fit>
      <el-table-column prop="ts_code" label="基金代码" />
      <el-table-column prop="name" label="简称" />
      <el-table-column prop="management" label="管理人" sortable />
      <el-table-column prop="pct_rank" label="近180日价格排名" sortable />
      <el-table-column prop="std" label="标准差" sortable />
      <el-table-column prop="fund_type" label="投资类型" />
      <el-table-column prop="found_date" label="成立日期" />
      <!-- <el-table-column prop="issue_amount" label="发行份额(亿)" /> -->
      <!-- <el-table-column prop="net_asset" label="资产净值" /> -->
      <!-- <el-table-column prop="p_value" label="面值" /> -->
      <!-- <el-table-column prop="exp_return" label="预期收益率" /> -->
      <el-table-column prop="benchmark" label="业绩比较基准" />
      <el-table-column prop="invest_type" label="投资风格" />
      <!-- <el-table-column prop="type" label="基金类型" /> -->
      <!-- <el-table-column prop="purc_startdate" label="日常申购起始日" /> -->
    </el-table>
    <radar-chart :items="fundNavDetail" />//传递在子组件prop选项里约定好的数据
  </div>
</template>

<script>
import { apiFundBasic } from '@/api/funds.js'
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
  name: 'FundsBasic',
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
    getfundBasic() {
      apiFundBasic().then(res => {
        this.fundNavDetail = res.data
      })
    }
  }
}
</script>

