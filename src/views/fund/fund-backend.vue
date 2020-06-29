<template>
  <div class="chart-container">
    <el-button type="primary" @click="SyncFundBasic">同步基金列表</el-button>
  </div>
</template>

<script>
import { apiSyncFundBasic } from '@/api/funds.js'

export default {
  name: 'FundsBackend',
  components: {},
  data() {
    return {
    }
  },
  methods: {
    SyncFundBasic() {
      apiSyncFundBasic().then(res => {
      })
    }
  }
}
</script>

