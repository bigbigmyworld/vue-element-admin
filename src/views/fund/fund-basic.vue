<template>
  <div class="chart-container">
    <el-button type="primary" @click="getfundBasic">查询</el-button>
    <el-button type="primary" @click="forgetfundPredict">估值</el-button>
    <el-button type="primary" @click="stopsend">停止估值</el-button>
    <el-input v-model="period" placeholder="计算数量" />

    <el-table :data="fundNavDetail" border stripe fit :cell-style="cellStyle">
      <el-table-column  label="基金代码" width="100">
        <template slot-scope="scope">
          <div>{{scope.row.ts_code}}</div>
          <div>{{scope.row.name}}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="name" label="简称" /> -->
      <el-table-column prop="pct_rank" label="近180日价格排名" sortable />
      <el-table-column prop="diff_pct_rank" label="变动排名" sortable >
        <template slot-scope="scope">
          <el-tag type="danger" slot="reference" v-if="scope.row.diff_pct_rank.indexOf('-')!=0">{{ scope.row.diff_pct_rank }}</el-tag>
          <el-tag type="success" slot="reference" v-else-if="scope.row.diff_pct_rank.indexOf('-')==0">{{ scope.row.diff_pct_rank }}</el-tag>
        </template>
      </el-table-column>


      <el-table-column prop="std" label="标准差" sortable />
      <el-table-column prop="sortino_ratio" label="索提诺比率" sortable />
      <!-- <el-table-column prop="sharp" label="夏普比率" sortable /> -->
      <el-table-column prop="daily_value_at_risk" label="每日风险价值" sortable />
      <!-- <el-table-column prop="max_drawdown" label="最大回撤" sortable /> -->
      <el-table-column prop="is_increase_count" label="最新涨跌次数" sortable />

      <el-table-column prop="calmar_ratio" label="calmar_ratio" sortable />
      <el-table-column prop="tail_ratio" label="tail_ratio" sortable />
      <el-table-column prop="adj_nav_date_near_today" label="上次最近日期" sortable />
      <el-table-column prop="adj_nav_near_today" label="上次最近净值" sortable />

      <el-table-column label="3年评级" width="150" sortable>
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.star_3"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="5"
            style="margin-top:6px;"
            @change="
              updateFundStar(
                scope.row.ts_code,
                scope.row.star_3,
                scope.row.star_5
              )
            "
          />
        </template>
      </el-table-column>
      <el-table-column label="5年评级" width="150" sortable>
        <template slot-scope="scope">
          <el-rate
            v-model="scope.row.star_5"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            :max="5"
            style="margin-top:6px;"
            @change="
              updateFundStar(
                scope.row.ts_code,
                scope.row.star_3,
                scope.row.star_5
              )
            "
          />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="risk" label="索提诺/夏普比率" sortable /> -->
      <!-- <el-table-column prop="omega_ratio" label="omiga比率" sortable /> -->
      <el-table-column prop="downside_risk" label="下降风险" sortable />

      <el-table-column prop="mean_5" label="5日均价偏离（警）" sortable >
        <template slot-scope="scope">
          <el-tag type="success" slot="reference" v-if="scope.row.mean_5<0">{{ scope.row.mean_5 }}</el-tag>
          <el-tag type="info" slot="reference" v-else-if="scope.row.mean_5==0">{{ scope.row.mean_5 }}</el-tag>
          <el-tag type="danger" slot="reference" v-else-if="scope.row.mean_5>0">{{ scope.row.mean_5 }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="mean_10" label="10日均价偏离（减）" sortable >
        <template slot-scope="scope">
          <el-tag type="success" slot="reference" v-if="scope.row.mean_10<0">{{ scope.row.mean_10 }}</el-tag>
          <el-tag type="info" slot="reference" v-else-if="scope.row.mean_10==0">{{ scope.row.mean_10 }}</el-tag>
          <el-tag type="danger" slot="reference" v-else-if="scope.row.mean_10>0">{{ scope.row.mean_10 }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="mean_20" label="20日均价偏离（清）" sortable >
           <template slot-scope="scope">
          <el-tag type="success" slot="reference" v-if="scope.row.mean_20<0">{{ scope.row.mean_20 }}</el-tag>
          <el-tag type="info" slot="reference" v-else-if="scope.row.mean_20==0">{{ scope.row.mean_20 }}</el-tag>
          <el-tag type="danger" slot="reference" v-else-if="scope.row.mean_20>0">{{ scope.row.mean_20 }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="今日净值" prop="dwjz" sortable />
      <el-table-column label="估算净值" prop="gsz" sortable />
      <el-table-column label="估算变化%" prop="predict_value" sortable />
      <!-- <el-table-column label="估算百分位" prop="predict_rank" sortable /> -->

      <!-- <el-table-column prop="max_income_pct" label="最大收益率" sortable /> -->
      <!-- <el-table-column label="潜力" prop="potential" sortable /> -->

      <el-table-column prop="fund_type" label="投资类型" />
      <!-- <el-table-column prop="management" label="管理人" sortable /> -->
      <el-table-column prop="found_date" label="成立日期" />
      <!-- <el-table-column prop="issue_amount" label="发行份额(亿)" /> -->
      <!-- <el-table-column prop="net_asset" label="资产净值" /> -->
      <!-- <el-table-column prop="p_value" label="面值" /> -->
      <!-- <el-table-column prop="exp_return" label="预期收益率" /> -->
      <el-table-column prop="benchmark" label="业绩比较基准" />
      <!-- <el-table-column prop="invest_type" label="投资风格" /> -->
      <!-- <el-table-column prop="type" label="基金类型" /> -->
      <!-- <el-table-column prop="purc_startdate" label="日常申购起始日" /> -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <router-link
            :to="{
              name: 'FundsNav',
              query: { fundCode: scope.row.ts_code.slice(0, 6) }
            }"
          >
            <el-button type="primary">详情</el-button>
          </router-link>
          <router-view />
        </template>
      </el-table-column>
    </el-table>
    <!-- <radar-chart :items="fundNavDetail" />//传递在子组件prop选项里约定好的数据 -->
  </div>
</template>

<script>
import {
  apiFundBasicQuery,
  apiQueryFundPredict,
  apiUpdateFundStar
} from '@/api/funds.js'

export default {
  name: 'FundsBasic',
  components: {},
  data() {
    return {
      period: 252,
      fundNavDetail: [],
      fundCode: '',
      // inteval: setInterval(this.getfundPredict, 10000),
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
  // created:{    getfundPredict() {
  //     this.$http
  //       .jsonp("http://fundgz.1234567.com.cn/js/161031.js", {
  //         jsonpCallback: "jsonpgz"
  //       })
  //       .then(res => {
  //         return res.body;
  //       });
  //   },},
  methods: {
    getfundBasic() {
      apiFundBasicQuery(this.period).then(res => {
        this.fundNavDetail = res.data
      })
    },
    getQueryFundPredict(ts_code, predict_value, gztime) {
      apiQueryFundPredict(ts_code, predict_value, gztime).then(res => {
        console.log(res)
      })
    },
    updateFundStar(ts_code, star_3, star_5) {
      apiUpdateFundStar(ts_code, star_3, star_5).then(res => {
        console.log(res)
      })
    },
    getfundPredict(index, ts_code) {
      console.log(ts_code)
      this.$http
        .jsonp('http://fundgz.1234567.com.cn/js/' + ts_code + '.js', {
          jsonpCallback: 'jsonpgz'
        })
        .then(res => {
          console.log(res.body) // dwjz今日净值，gsz估算净值，gszzl估值变化百分比
          this.$set(this.fundNavDetail[index], 'predict_value', res.body.gszzl)
          this.$set(this.fundNavDetail[index], 'dwjz', res.body.dwjz)
          this.$set(this.fundNavDetail[index], 'gsz', res.body.gsz)
          this.getQueryFundPredict(ts_code, res.body.gsz, res.body.gztime)
        })
    },
    send() {
      this.inteval
    },
    stopsend() {
      clearInterval(this.inteval)
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      // console.log(row)
      if (row['sortino_ratio'] <= 0 && column.label == '索提诺比率') {
        return { background: '#909399' }
      } else if (row['std'] <= 0.1 && column.label == '标准差') {
        return { background: '#909399' }
      } else if (row['std'] <= 0.1 && column.label == '标准差') {
        return { background: '#909399' }
      } else {
      }
    },
    test(index) {
      console.log(index)
    },
    forgetfundPredict() {
      var _self = this
      console.log('开始循环')
      function loopTest() {
        for (let index = 0; index < _self.fundNavDetail.length; index++) {
          setTimeout(
            () =>
              _self.getfundPredict(
                index,
                _self.fundNavDetail[index].ts_code.slice(0, 6)
              ),
            3000 * index
          )
        }
        alert('实时价格同步结束')
      }
      // setInterval(loopTest, 2000);
      loopTest()
      alert('实时价格同步开始')
    }
  }
}
</script>
