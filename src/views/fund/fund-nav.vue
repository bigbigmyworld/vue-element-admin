<template>
  <div class="chart-container">
    <el-input v-model="fundCode" placeholder clearable />
    <el-input v-model="days_num" placeholder="天数" />

    <el-button type="primary" @click="getfundNav">查询</el-button>
    <el-button type="primary" @click="RefillFundNav">修复数据</el-button>
    <el-row :gutter="20">
      <el-col :span="6">
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
      </el-col>
      <el-col :span="6">
        <div v-if="df_reduce_pct_desc" class="table-like-reduce">
          <p>数据量:{{ df_reduce_pct_desc.count }}</p>
          <p>均值:{{ df_reduce_pct_desc.mean }}</p>
          <p>标准差:{{ df_reduce_pct_desc.std }}</p>
          <p>最小值:{{ df_reduce_pct_desc.min }}</p>
          <p>25%:{{ df_reduce_pct_desc["25%"] }}</p>
          <p>50%:{{ df_reduce_pct_desc["50%"] }}</p>
          <p>75%:{{ df_reduce_pct_desc["75%"] }}</p>
          <p>最大值:{{ df_reduce_pct_desc["max"] }}</p>
        </div>
      </el-col>
      <el-col :span="6">
        <div v-if="df_rise_pct_desc" class="table-like-rise">
          <p>数据量:{{ df_rise_pct_desc.count }}</p>
          <p>均值:{{ df_rise_pct_desc.mean }}</p>
          <p>标准差:{{ df_rise_pct_desc.std }}</p>
          <p>最小值:{{ df_rise_pct_desc.min }}</p>
          <p>25%:{{ df_rise_pct_desc["25%"] }}</p>
          <p>50%:{{ df_rise_pct_desc["50%"] }}</p>
          <p>75%:{{ df_rise_pct_desc["75%"] }}</p>
          <p>最大值:{{ df_rise_pct_desc["max"] }}</p>
        </div>
      </el-col>
    </el-row>
    <el-table :data="fundNavDetail" border stripe fit>
      <el-table-column prop="ts_code" label="基金代码" />
      <el-table-column prop="end_date" label="日期" />
      <el-table-column prop="unit_nav" label="单位净值" sortable />
      <el-table-column prop="diff" label="增降" sortable>
        <template slot-scope="scope">
          <el-tag v-if="scope.row.diff < 0" slot="reference" type="success">{{
            scope.row.diff
          }}</el-tag>
          <el-tag
            v-else-if="scope.row.diff == 0"
            slot="reference"
            type="info"
          >{{ scope.row.diff }}</el-tag>
          <el-tag
            v-else-if="scope.row.diff > 0"
            slot="reference"
            type="danger"
          >{{ scope.row.diff }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="diff_pct" label="净值变化pct" sortable />

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
import { fundNav, apiRefillFundNav } from '@/api/funds.js'
export default {
  name: 'FundsNav',
  components: {},
  data() {
    return {
      fundCode: '',
      fundNavDetail: [],
      days_num: 252,
      fundDesc: [],
      df_reduce_pct_desc: ''
    }
  },
  watch: {
    '$route.query.fundCode': function(n, o) {
      if (
        this.$route.query.fundCode &&
        this.$route.name === 'FundsNav' &&
        n != this.fundCode
      ) {
        this.fundCode = n
        this.getfundNav()
      }
    },
    fundCode() {}
  },
  created() {
    this.fundCode = this.$route.query.fundCode
    if (this.fundCode) {
      this.getfundNav()
    } // 获取上个页面传递的id,在下面获取数据的时候先提交id
    else {
      this.fundCode = ''
    }
  },
  methods: {
    getfundNav() {
      fundNav(this.fundCode, this.days_num).then(res => {
        this.fundNavDetail = res.data.nav_list
        this.fundDesc = res.data.nav_desc.unit_nav
        this.df_reduce_pct_desc = res.data.df_reduce_desc.diff_pct
        this.df_rise_pct_desc = res.data.df_rise_desc.diff_pct
      })
    },
    RefillFundNav() {
      apiRefillFundNav(this.fundCode).then(res => {})
    }
  }
}
</script>

<style scoped>
.table-like {
  display: table-cell;
}
.table-like-reduce {
  color: white;
  background-color: green;
  padding-left: 10px;
}
.table-like-rise {
  background-color: red;
  color: white;
}
</style>
