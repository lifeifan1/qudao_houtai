<template>
  <div>
    <div class="head_content" >
				<a href="javascript:;" @click="topNav(index,i.status)" v-for="(i,index) in head" :key="index" :class="isAct==index?'nav_act':''">{{i.name}}</a>
		</div>
    <keywords ref="key" @key="keySerch"></keywords>
    <orderList :orderData="parentData" :loading="ajaxloading"></orderList>
    <div class="block" style="text-align: center;">
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="page">
    </el-pagination>
  </div>
  </div>
</template>
<script>
import keywords from "./keywords";
import order_list from "./order_list";
import {orderUrl} from "@/api/table";

export default {
  data(){
    return{
      parentData:[],
      page:0,
      currentPage:1,
      ajaxloading:true,
      isAct:0,
      head:[{
        name:"待审批",
        status:210
      },{
        name:"待发货",
        status:20
      },{
        name:"已发货",
        status:60
      },{
        name:"已签收",
        status:70
      },{
        name:"审批未通过",
        status:220
      },{
        name:"已作废",
        status:999
      },{
        name:"所有订单",
        status:""
      }],
      keyData:{
        status:210,
        orederId:"",
        recerName:"",
        receiMibile:"",
        skuName:"",
        skuId:"",
        saleWid:"",
        saleUid:"",
        orderS_time:"",
        orderE_time:"",
        timeStatus:"",
        userWxStatus:""
      }
    }
  },
  components:{
    keywords,
    "orderList":order_list
  },
  methods: {
  keySerch() {
    this.keyData.orderS_time = this.$refs.key.S_E_date?this.$refs.key.S_E_date[0]:'';
    this.keyData.orderE_time = this.$refs.key.S_E_date?this.$refs.key.S_E_date[1]:'';
    this.keyData.timeStatus = this.$refs.key.select_Time;
    this.keyData.userWxStatus = this.$refs.key.select_User;
    this.keyData.orederId = this.$refs.key.order_input;
    this.keyData.recerName = this.$refs.key.kh_name;
    this.keyData.saleWid = this.$refs.key.select_WXUser;
    this.keyData.saleUid = this.$refs.key.select_WXUser;
    this.keyData.receiMibile = this.$refs.key.phone;
    this.keyData.skuName = this.$refs.key.shopName;
    this.keyData.skuId = this.$refs.key.skuName;
    this.list();
  },
  topNav(index,status){
    this.isAct = index;
    this.keyData.status = status;
    this.list();
  },
  list(){
    this.ajaxloading = true;
    let data = {
				pageIndex:this.currentPage,
				pageSize:10,
				orderStatus:this.keyData.status,
				gxOrderId:this.keyData.orederId,
				receiverName:this.keyData.recerName,
				receiverMobile:this.keyData.receiMibile,
				skuName:this.keyData.skuName,
				skuOuterId:this.keyData.skuId,
				saleWxid:this.keyData.userWxStatus==1?this.keyData.saleWid:'',
				saleUserId:this.keyData.userWxStatus==2?this.keyData.saleUid:'',
				orderStartDate:this.keyData.timeStatus==1?this.keyData.orderS_time:'',
				orderEndDate:this.keyData.timeStatus==1?this.keyData.orderE_time:'',
				fansStartDate:this.keyData.timeStatus==2?this.keyData.orderE_time:'',
				fansEndDate:this.keyData.timeStatus==2?this.keyData.orderE_time:''
				}
    orderUrl(JSON.stringify(data)).then((res)=>{
      console.log(res);
      this.ajaxloading = false;
      this.parentData = res.data.beanList;
      this.page = Number(res.data.amount);
  }).catch((req)=>{
    console.log(req);
    this.ajaxloading = false;
  });
  },
  handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
      this.list();
    }
  },
  created(){
    this.list();
  }
}
</script>

<style scoped>
.head_content{
    border-bottom: 1px solid #F2F0F0;
    text-align: left;
    padding: 0 15px;
    padding-top: 10px;
}
.head_content a{
    margin: 0 5px;
    padding: 10px 5px;
    display: inline-block;
}
.nav_act:hover{
    color:#21B995;
}
.nav_act{
    color:#21B995;
    border-bottom: 2px solid #21B995;
}
</style>
