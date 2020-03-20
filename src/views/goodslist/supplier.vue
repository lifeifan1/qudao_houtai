
<template>
  <div class="new_goodslist">
    <div class="nav_top">
      <el-select style="width:120px" v-model="select_status" placeholder="请选择">
    <el-option
      v-for="item in optionStatus"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      <el-select style="width:120px" v-model="select_value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        <el-input style="width:266px;height: 30px;margin-left:10px;" v-model="input" placeholder="请输入内容"></el-input>
      <el-button type="primary" style="margin-left:10px;" @click="serch_btn" class="btn">搜索</el-button>
    </div>
    <ul  class="list_head" style="display: flex;padding:0 12px;">
      <li style="width:6%;min-width:80px;">商品图</li>
      <li style="width:94%;display: flex;">
        <div style="width:40%">商品名/规格</div>
			  <div style="width:10%">渠道成本价</div>
			  <div style="width:10%">进货成本价</div>
			  <div style="width:10%">库存数量</div>
			  <div style="width:15%">状态</div>
			  <div style="width:15%">操作</div>
      </li>
    </ul>
    <ul v-loading.fullscreen.lock="fullscreenLoading">
      <li v-for="(i,j) in item" :key="j" style="display: flex; padding:8px 12px;">
      <div style="width:6%;min-width:80px;text-align: center;padding: 10px 10px 0 0;">
        <el-image
        style="width: 60px; height: 60px"
        :src="i.offering.imageFileName"
        :preview-src-list="fangda_img">
      </el-image>
      </div>
      <div style="width:94%">
      <div class="right_top">
        <div style="width:70%;">
              <h2>{{i.offering.offeringName}}</h2>
              <div style="margin-top:3px">店铺名称：{{i.offering.shopName}}</div>
              <div style="margin-top:3px">供应商编码：{{i.offering.supplierTenantId}}</div>
          </div>
          <div style="width:30%;display: flex;align-items: center;">
					<div style="width:50%;">
					<el-switch
          v-model="i.offering.offeringId"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
					</div>
					<div style="width:50%;">
					<el-button type="primary" v-if="input_show!=j" @click="edit_bj()" class="btn">编辑</el-button>
					</div>
				</div>
      </div>
    <div class="transhow"  :class="[flg==i||i.skuList.length==1?'auto':'ovflew']" >
     <div style="display: flex;border-top: 1px dashed #E3E3E3;padding: 7px 0px;align-items: center;" v-for="(v,k) in i.skuList" :key="k">
					<div style="width:40%;line-height: 20px;font-size:13px;">
					  <div>规格：{{v.skuCharSpec}}</div>
                <div>sku编码：{{v.skuId}}</div>
					</div>
					<div style="width:10%" >
					 <div v-if="input_show!=v">￥{{Number(v.price*0.01).toFixed(2)}}</div>
                 <div style="font-size: 12px;color: #999999;" class="primary_price">原价：￥<span>{{Number(v.originalPrice*0.01).toFixed(2)}}</span></div>
					</div>
					<div style="width:10%">
					  ￥{{Number(v.tenantPrice*0.01).toFixed(2)}}
					</div>
					<div class="col4" style="width:10%">
					 库存：{{v.stockNum}}
					</div>
					<div style="width:15%;">
						<el-switch
          v-model="v.skuId"
          active-color="#13ce66"
          inactive-color="#ff4949">
        </el-switch>
					</div>
					<div style="width:15%">
						</div>
				</div>
        </div>
        <span class="cur" v-if="i.skuList.length>2" @click="show(i)" style="color:#21B995;display: flex;align-items: center;"><span v-if="flg!=i">共<span>{{i.skuList.length}}</span>个规格，点击展开更多</span><span v-if="flg==i">点击收回</span><img :src="flg==i?shang_j:xia_j" alt="" style="width:16px;height:16px;"></span>
      </div>
      </li>
    </ul>
    <div class="block" style="text-align: center;">
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="page">
    </el-pagination>
  </div>
    <el-dialog
  :title="'修改商品'"
  :visible.sync="dialogVisible"
  custom-class="hOpen"
  top="10vh"
  width="80%">
      <edit v-if="dialogVisible" class="detil_content" :editData="edData" :goodsId="gId"></edit>
    </el-dialog>
  </div>
</template>
<script>
import {getList} from '@/api/table';
import edit from "./edit";
export default {
  data(){
    return{
      edData:[],
      dialogVisible:false,
      gId:Number,
      flg:-1,
      input:'',
      page:0,
      currentPage:1,
      item:[],
      shang_j:require('../../assets/img/sanjiaoshang.png'),
      xia_j:require('../../assets/img/sanjiao_xia.png'),
      fullscreenLoading:true,
      input_show:-1,
      select_value:1,
      select_status:1,
      optionStatus:[{
        value:1,
        label:"已上架"
      },{
        value:2,
        label:"已下架"
      }],
      options:[{
        value:1,
        label:"商品名称"
      },{
        value:2,
        label:"sku编码"
      }],
      fangda_img:[]
    }

  },
  components:{
    edit
  },
  methods:{
    img_index(img_url){
      // .push(img_url);
    },
    show(index){
      console.log(index);
      if(index==this.flg){
      this.flg = -1;
      }else{
      this.flg = index;
      }
    },
    list(){
      let data = {
        pageIndex:this.currentPage,
        pageSize: 10,
        query: {
        offeringName:this.select_value==1?this.input:"",
        offeringId:"",
        nameOrOuterId:this.select_value==2?this.input:"",
        groupId:"",
        shopId:"",
        saleStatus:"1",
        supplierTenantId:this.select_value==3?this.input:""}
        };
        // 这里调用axios传数据，getList是我封装的
      getList(data).then((res)=>{
        this.fullscreenLoading = false;
        console.log(res);
      this.page = Number(res.data.amount);
      this.item = res.data.beanList;
      for(let i = 0;i<res.data.beanList.length;i++){
        this.fangda_img.push(res.data.beanList[i].offering.imageFileName);
      }
      }).catch((error)=>{
        this.fullscreenLoading = false;
        this.page = Number(0);
        this.item = [];
        console.log(error);
      })
    },
    handleCurrentChange(currentPage){
      this.fullscreenLoading = true;
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
      this.list();
    },
    edit_bj(){
      this.dialogVisible = true;
    },
    serch_btn(){
      this.list();
    }
  },
  created(){
    this.list();
  },
  beforeMount(){

  },
  mounted(){
  }
}
</script>
<style scoped>
.el-input__icon{
  line-height: 30px;
}
.el-button--primary.is-plain{
  color: #fff;
}
.list_head{
    height: 50px;
    background-color: #F3F3F4;
    align-items: center;
  }
  .list_head li{
  font-weight: 550;
  }
  .goodslist{
    box-sizing: border-box;
    padding: 5px;
  }
  .btn{
    background-color: #21B995 !important;
    width: 68px !important;
    height: 30px !important;
    border: 0 !important;
    line-height: 30px !important;
    text-align: center !important;
    padding: 0 !important;
    font-size: 13px !important;
  }
  .btn_l{
    width: 68px !important;
    height: 30px !important;
    border: 0 !important;
    line-height: 30px !important;
    text-align: center !important;
    padding: 0 !important;
    font-size: 13px !important;
  }
  .right_top{
      width: 100%;
      line-height: 20px;
      padding: 6px 0;
      display: flex;
  }
  .nav_top{
    align-items: center;
    display: flex;
    height: 60px;
    background-color: #F3F3F4;
    margin-bottom: 20px;
  }
  .serch_top{
    align-items: center;
    justify-content: space-between;
    display: flex;
    height: 60px;
    background-color: #F3F3F4;
    margin-bottom: 20px;
  }
  .col2{
    width: 15%;
      font-size: 16px;
      color: #FF5500;
  }
  .col4{
    color: #FBAB3E;
  }
  .layui-btn+.layui-btn {
    margin-left: 0px;
}
.scroll_close{
  color:#21B995;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.sl-overlay {
  background: #000000;
  opacity: .4;
}
.sl-prev,.sl-next,.sl-close{
  color: #fff;
}
.layui-form-switch{
  border: 1px solid #FF5653;
  background-color: #FF5653;
}
.layui-form-switch em{
  color: #fff !important;
}
.layui-form-switch i{
  background-color: #fff;
}
.auto{
  height:calc(100% - 85px);
}
.ovflew{
  height: 110px;
  overflow: hidden;
}
.transhow{
transition: height 0.5s;
-moz-transition: height 0.5s;	/* Firefox 4 */
-webkit-transition: height 0.5s;	/* Safari 和 Chrome */
-o-transition: height 0.5s;
}
</style>
