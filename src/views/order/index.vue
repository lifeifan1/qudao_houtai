<template>
  <div>
    <keywords></keywords>
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
      ajaxloading:true
    }
  },
  components:{
    keywords,
    "orderList":order_list
  },
  methods: {
  changeSum() {
    console.log(this.$refs.one);
  this.sum = this.$refs.one.number + this.$refs.second.number;
  },
  list(){
    let data = {
				pageIndex:this.currentPage,
				pageSize:10,
				orderStatus:210,
				gxOrderId:'',
				receiverName:'',
				receiverMobile:'',
				skuName:'',
				skuOuterId:'',
				saleWxid:'',
				saleUserId:'',
				orderStartDate:'',
				orderEndDate:'',
				fansStartDate:'',
				fansEndDate:''
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
      this.ajaxloading = true;
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
