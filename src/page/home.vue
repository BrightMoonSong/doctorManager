<template>
<div class="box">
  <div class="welcome" v-if="barshow">
    <h2>欢迎使用医生管理系统</h2>
  </div>
  <div v-if="!barshow">
    <!-- <div v-drag>我可以拖拽</div> -->
    <!-- <img width="100" v-bigimg="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512122556735&di=7b15c09607c2afd33ddeb0a2bfbbc8b1&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc995d143ad4bd113c251b84c58afa40f4bfb052b.jpg'"
  v-lodimg="'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1512122556735&di=7b15c09607c2afd33ddeb0a2bfbbc8b1&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fc995d143ad4bd113c251b84c58afa40f4bfb052b.jpg'"
  /> -->
    <!-- <head-top></head-top> -->
    <section class="data_section">
      <header class="section_title">收益统计<small class="small-my">注：只有已完成订单计算收益</small></header>
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4">
          <div class="data_list today_head"><span class="data_num head">订单状态：</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">总订单数<span class="data_num">{{objCount.allOrder}}</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">待审核订单<span class="data_num">{{objCount.toBeAuditedOrder}}</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">待完成订单<span class="data_num">{{objCount.toBeCompletedOrder}}</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">已完成订单<span class="data_num">{{objCount.completedOrder}}</span></div>
        </el-col>
        <el-col :span="4">
          <div class="data_list">无效订单<span class="data_num">{{objCount.invalidOrder}}</span></div>
        </el-col>
      </el-row>
    </section>
    <tendency :sevenDate='sevenDate' :sevenDay='sevenDay'></tendency>
  </div>
</div>
</template>

<script>
// import headTop from '../common/headTop';
import tendency from '../common/tendency';
import dtime from 'time-formater';

export default {
  data() {
    return {
      barshow: false,
      objCount: {},
      sevenDay: [],
      sevenDate: [
        [],
        [],
        [],
        []
      ]
    };
  },
  components: {
    // headTop,
    tendency
  },
  mounted() {
    this.objCount = {
      'allOrder': 100,
      'toBeAuditedOrder': 5,
      'toBeCompletedOrder': 20,
      'completedOrder': 70,
      'invalidOrder': 5
    };
    // 获取数据
    this.sevenDate = [
      [11, 22, 33, 44, 55, 66, 77],
      [77, 88, 99, 111, 121, 131, 141],
      [12, 24, 34, 45, 56, 67, 78],
      [10, 30, 40, 50, 60, 70, 80]
    ];
    for (let i = 6; i > -1; i--) {
      const date = dtime(new Date().getTime() - 86400000 * i).format('YYYY-MM-DD');
      this.sevenDay.push(date);
    }
    // this.sevenDay = ['2017-11-20', '2017-11-24', '2017-11-25', '2017-11-26', '2017-11-27', '2017-11-28', '2017-11-29']
  },
  methods: {

  }
};
</script>

<style lang="less" scoped>
@import '../style/mixin';
.data_section {
    padding: 20px;
    margin-bottom: 40px;
    .section_title {
        text-align: center;
        font-size: 30px;
        margin-bottom: 10px;
    }
    .data_list {
        text-align: center;
        font-size: 14px;
        color: #666;
        border-radius: 6px;
        background: #E5E9F2;
        .data_num {
            color: #333;
            font-size: 26px;

        }
        .head {
            border-radius: 6px;
            font-size: 24px;
            padding: 0 10px;
            color: #fff;
        }
    }
    .today_head {
        background: #FF9800;
    }
    .all_head {
        background: #20A0FF;
    }
}
.wan {
    .sc(16px, #333)
}
.small-my {
    font-size: 12px;
    font-weight: 400;
    color: #afaeae;
}
.box {
    width: 100%;
    height: 100%;
    text-align: center;
    .welcome {
        margin: 0 auto;
        margin-top: 18%;
    }
}
</style>
