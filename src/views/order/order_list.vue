<template>
  <div>
    <el-table
    :data="orderData"
    border
    :header-cell-style="{background:'#f2f2f2',color:'#333'}"
    v-loading="loading"
    style="width: 100%">
    <el-table-column
      prop="info.gxOrderId"
      label="订单号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="info.saleName"
      label="销售"
      width="80">
    </el-table-column>
    <el-table-column
      prop="consignee.receiverName"
      label="收货人"
      width="80">
    </el-table-column>
    <el-table-column
      prop="consignee.receiverMobile"
      label="电话">
    </el-table-column>
    <el-table-column
      prop="info.price"
      label="金额">
    </el-table-column>
    <el-table-column
      prop="info.tenantPrice"
      label="改价">
    </el-table-column>
    <el-table-column
      prop="info.price"
      label="折扣率">
    </el-table-column>
    <el-table-column
      prop="info.price"
      label="毛利率">
    </el-table-column>
    <el-table-column
      prop="info.orderTs"
      label="下单时间">
    </el-table-column>
    <el-table-column
      prop="info.orderStatus"
      label="状态"
      width="80">
      <template slot-scope="scope">
        <el-tag
          type="primary"
          class="btn_tag"
          :class="scope.row.info.orderStatus == 210 ? 'btn_210':scope.row.info.orderStatus == 50 ?'btn_50':scope.row.info.orderStatus==60?'btn_60':scope.row.info.orderStatus==70?'btn_70':scope.row.info.orderStatus==220?'btn_220':scope.row.info.orderStatus==999?'btn_999':''"
          disable-transitions>{{scope.row.info.orderStatus==210?'待审批':scope.row.info.orderStatus==50?'待发货':scope.row.info.orderStatus==60?'已发货':scope.row.info.orderStatus==70?'已签收':scope.row.info.orderStatus==220?'审批未通过':scope.row.info.orderStatus==999?'已作废':''}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="info.gxOrderId"
      label="操作"
      width="80">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="detile(scope.row.info.gxOrderId)" type="primary">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  :title="detileTitle+'-订单详情'"
  :visible.sync="dialogVisible"
  width="80%"
  style="font-size:15px">
      <detile></detile>
    </el-dialog>
  </div>
</template>

<script>
import detile from "./detile";
export default {
  props:["orderData","loading"],
  data(){
    return {
      listdata:[],
      dialogVisible: false,
      detileTitle:"",
    }
  },
  components:{
      detile
  },
  methods:{
    detile(id){
      this.detileTitle = id;
      console.log(id);
      this.dialogVisible = true;
    },
  },
  created(){
    console.log(this.orderData,this.loading);
  },
  updated(){
    console.log(this.orderData,this.loading);
  }
}
</script>

<style>
.el-dialog__title{
  font-size: 15px !important;
}
.has-gutter th{
      border-right: 1px solid #e6e6e6;
      border-color: #e6e6e6;
}
.el-table td, .el-table th{
  padding: 8px 0;
}
.btn_tag{
  height: 28px;
  line-height: 28px;
}
.btn_210{
border: 1px solid #21B995;
background-color: rgb(242, 255, 252);
color: #21B995;
}
.btn_50{
border: 1px solid #FBAB3E;
background-color: #FFF8EE;
color: #FBAB3E;
}
.btn_60{
border: 1px solid #A482FF;
background-color: #EDE6FF;
color: #A482FF;
}
.btn_70{
border: 1px solid #5CA6FF;
background-color: #E4F0FF;
color: #5CA6FF;
}
.btn_220{
border: 1px solid #FB6C6A ;
background-color: #FFF3F2;
color: #FB6C6A ;
}
.btn_999{
border: 1px solid #CFCFCF;
background-color: #F3F3F3;
color: #CFCFCF;
}
.el-date-editor .el-range__icon{
  line-height: 22px;
}
.el-input__icon{
  line-height: 30px;
}
.el-date-editor .el-range-separator{
  line-height: 22px;
}
</style>
