<template>
  <div class="chart-container">
    <el-input v-model="fundCode" placeholder />
    <el-button type="primary" @click="getfundNav">查询</el-button>
    <!-- <el-table :data="fundNavDetail" border stripe>
      <el-table-column prop="ts_code" label="基金代码" />
      <el-table-column prop="ann_date" label="日期" />
      <el-table-column prop="unit_nav" label="单位净值" sortable />
      <el-table-column prop="accum_nav" label="累计净值" />
      <el-table-column prop="accum_div" label="累计分红" />
      <el-table-column prop="net_asset" label="资产净值" />
      <el-table-column prop="total_netasset" label="合计资产净值" />
      <el-table-column prop="adj_nav" label="复权单位净值" />
    </el-table> -->
    <v-chart :options="polar" />
  </div>
</template>

<script>
import { fundNav } from '@/api/funds.js'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import 'echarts/lib/component/markLine'
import 'echarts/lib/component/graphic'

export default {
  name: 'FundsNav',
  components: { 'v-chart': ECharts },
  data() {
    return {
      fundCode: '165509.SZ',
      fundNavDetail: '',
      polar: {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
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

