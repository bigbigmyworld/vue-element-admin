<template>
  <div class="chart-container">
    <el-input v-model="fundCode" placeholder></el-input>
    <el-button type="primary" @click="getfundNav">登录</el-button>
    <el-table :data="fundNavDetail" border stripe>
      <el-table-column
        v-for="col in columns"
        :prop="col.id"
        :key="col.id"
        :label="col.label"
        :width="col.width"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { fundNav } from "@/api/funds.js";

export default {
  name: "fundsNav",
  data() {
    return {
      fundCode: "",
      fundNavDetail: ""
    };
  },
  components: {},
  methods: {
    getfundNav() {
      fundNav(this.fundCode).then(res => {
        this.fundNavDetail = res;
      });
    }
  }
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>

