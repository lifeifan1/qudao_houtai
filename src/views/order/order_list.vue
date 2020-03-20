<template>
  <div>
    <el-table
    :data="orderData"
    border
    :header-cell-style="{background:'#f2f2f2',color:'#333'}"
    v-loading="loading"
    header-row-class-name="center"
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
      prop="info.payFee"
      label="金额">
    </el-table-column>
    <el-table-column
      prop="info.changeFee"
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
      >
      <template slot-scope="scope" >
        <el-tag
          type="primary"
          class="btn_tag"
          :class="scope.row.info.orderStatus == 210 ? 'btn_210':scope.row.info.orderStatus == 20 ?'btn_50':scope.row.info.orderStatus==60?'btn_60':scope.row.info.orderStatus==70?'btn_70':scope.row.info.orderStatus==220?'btn_220':scope.row.info.orderStatus==999?'btn_999':''"
          disable-transitions>{{scope.row.info.orderStatus==210?'待审批':scope.row.info.orderStatus==20?'待发货':scope.row.info.orderStatus==60?'已发货':scope.row.info.orderStatus==70?'已签收':scope.row.info.orderStatus==220?'审批未通过':scope.row.info.orderStatus==999?'已作废':''}}</el-tag>
          <div v-for="(l,index) in scope.row.memos" v-show="scope.row.info.orderStatus==220||999" :key="index" class="els" style="color:#333">{{l.msgType==3&&scope.row.info.orderStatus==220?l.message:l.msgType==4&&scope.row.info.orderStatus==999?l.message:''}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="info.gxOrderId"
      label="操作"
      width="80">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="detile(scope.row.info.gxOrderId,scope.row.info.price,scope.row.info.price)" type="primary">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
  :title="detileTitle+'-订单详情'"
  :visible.sync="dialogVisible"
  custom-class="hOpen"
  top="10vh"
  width="80%"
  style="font-size:15px">
      <detile class="detil_content" :orderId="detileTitle" :detileList="detileData" :zkl="zklMsg" :mll="mllMsg"></detile>
    </el-dialog>
  </div>
</template>

<script>
import detile from "./detile";
import {getDetile} from "@/api/table";
export default {
  props:["orderData","loading"],
  data(){
    return {
      listdata:[],
      dialogVisible: false,
      detileTitle:"",
      detileData:[],
      zklMsg:"",
      mllMsg:""
    }
  },
  computed:{
  },
  components:{
      detile
  },
  methods:{
    detile(id,zkl,mll){
      this.detileTitle = id;
      getDetile(id).then((res)=>{
        console.log(res);
        this.dialogVisible = true;
        this.zklMsg = zkl;
        this.mllMsg = mll;
        this.detileData = res.data.beanList[0];
      }).catch((error)=>{
        console.log(error);
        this.$message.error('请求失败，请稍后再试');
      });
    },
  },
  created(){
  },
  updated(){
  }
}
</script>

<style>
.els{
  overflow: hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  width: calc(100% - 1px);
  font-size: 12px;
}
.hOpen{
  height: 80vh;
}
.el-table .cell{
    text-align: center !important;
}
.el-dialog__body{
overflow: auto;
height: calc(100% - 54px);
padding-top: 5px;
}
.sel_down input{
  background-color: #f3f3f4 !important;
}
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
