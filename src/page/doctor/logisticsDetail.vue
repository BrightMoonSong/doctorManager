<template>
<el-dialog title="物流信息" top="5vh" width="1000px" :visible.sync="downifShowThis">
  <el-form ref="form" label-width="100px" size="mini" v-show="getlogisticsData.Success&&!getlogisticsData.Reason">
    <el-form-item label="运单号：">
      <span v-text="getlogisticsData.LogisticCode" style="width: 75%;"></span>
    </el-form-item>
  </el-form>
  <el-table v-show="getlogisticsData.Success&&!getlogisticsData.Reason" :data="getlogisticsData.Traces" stripe border width="100%">
    <el-table-column prop="AcceptTime" width="250px" align="center" label="时间">
    </el-table-column>
    <el-table-column label="订单行程" width="709px" prop="AcceptStation" show-overflow-tooltip align="center">
    </el-table-column>
  </el-table>
  <div v-show="getlogisticsData.Reason">
    <label>{{getlogisticsData.Reason}}</label>
  </div>
  <div slot="footer" class="dialog-footer">
    <el-button type="warning" size="medium" @click="downifShowThis = false">关 闭</el-button>
  </div>
  <div class="clearfix"></div>
</el-dialog>
</template>

<script>
import {
  getlogisticsdoctororder
} from '@/api/getData';

export default {
  props: {
    orderId: { // 必须提供字段
      required: true
    },
    downifShow: { // 可选字段，有默认值
      default: false
    }
  },
  data() {
    return { // 1
      downifShowThis: this.downifShow,
      getlogisticsData: {}
    };
  },
  methods: {
    async init() {
      let res = await getlogisticsdoctororder(this.orderId);
      if (res.code === 0) {
        if (res.data) {
          console.log(JSON.parse(res.data));
          let obj = JSON.parse(res.data);
          obj.Traces.reverse();
          this.getlogisticsData = obj;
        }
      }
    }
  },
  watch: {
    downifShow: function(val, oldVal) { // 2
      this.downifShowThis = val;
      if (val) {
        this.init();
      }
    },
    downifShowThis(val) { // 3
      this.$emit('dialog', val);
    }
  }
};
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
}
.topline {
    margin-top: 20px;
    margin-bottom: 20px;
    width: 100%;
    border-top: 1px solid #9f9f9f;
}
</style>
