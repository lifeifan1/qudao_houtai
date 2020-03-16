<template>
    <div>
        <div style="border:2px solid #efefef;width:98%;margin:20px auto;padding-bottom:50px">
            <section class="wx_title">
              商品列表
            </section>
            <div style="display:flex;">
                <main style="width:60%;">
                    <div style="height:70px;background:#efefef;display:flex;align-items:center;margin:20px;padding-left:20px">
                        <select name="" id="searchIndex" style="height:36px">
                          <option value="0">商品名称</option>
                          <option value="1">sku编码</option>
                          <option value="2">供应商编码</option>
                        </select>
                        <input id="searchDes" type="text" placeholder="  商品名称/sku编码/供应商编码" style="width:300px;height:36px">
                        <div class="btn_search" @click="search">
                          搜索
                        </div>
                    </div>
                    <!-- 商品详情 -->
                    <div style="margin:20px;border-bottom:1px solid #E3E3E3" v-for="(item,index) in goodsList" :key="index">
                    <section style="height:120px;border-bottom:1px dashed #E3E3E3;display:flex;align-items:center;">
                        <div @mouseenter="enter(index)" style="width:86px;height:86px;margin-right:16px;position:relative;font-size:20px">
                            <img class="header" :src="item.offering.imageFileName" alt="" style="width:100%;height:100%;">
                            <i v-if="fdjIndex==index?true:false" @click="popOpen(item.offering.imageFileName)" class="el-icon-zoom-in" style="z-index:999;position:absolute;bottom:5px;right:5px"></i>
                        </div>
                        <div>
                            <h4 style="margin:0;">{{item.offering.offeringName}}</h4>
                            <div style="margin-top:30px;color:#73767a">供应商：{{item.offering.shopName}}</div>
                            <div style="color:#73767a">供应商编码：{{item.offering.platformId}}</div>
                        </div>
                    </section>
                    <section class="gg_detail">
                        <div class="goods_bottom" v-for="(info,i) in item.skuList" :key="i">
                            <div class="items">
                                规格：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{info.skuCharSpec}} <br>
                                sku编码：&nbsp;&nbsp;{{info.outerSkuId}}
                            </div>
                            <div class="items items_money">￥{{info.price}}</div>
                            <div class="items items_en">库存：{{info.stockNum}}</div>
                            <div class="items items_add">
                                <div class="zeng" @click="addGoods(0,index,i)"><i class="el-icon-present"></i> 赠品</div>
                                <div class="addgwc" @click="addGoods(1,index,i)"><i class="el-icon-shopping-cart-2"></i> 加入购物车</div>
                            </div>
                        </div>
                    </section>
                    <div @click="show(index)" v-if="item.skuList.length>2?true:false" style="margin-left:102px;height:40px;line-height:40px;color:#21B995;font-size:12px">
                        <span class="tipContent" >共{{item.skuList.length}}个规格，点击展示更多 </span>
                        <i class="el-icon-caret-bottom"></i>
                    </div>
                    </div>
                     <!-- 表格下的分页 -->
                    <el-pagination @current-change='handleCurrentChange' style="text-align:center;margin:50px 0"
                       background
                       layout="prev, pager, next"
                       :total="totalNum">
                    </el-pagination>
               </main>
               <main class="right">
                 <!-- 头部 -->
                  <div style="height:70px;display:flex;align-items:center;border:1px solid #efefef;padding:0 20px;justify-content:space-between">
                        <div style="font-weight:bold;font-size:14px">购物车</div>
                        <div @click="qingkong()" style="color:#21b995">【清空】</div>
                  </div>
                  <!-- 选中商品列表里没有商品的时候 -->
                  <div v-if="numArray.length==0?true:false" style="text-align:center;border-bottom:1px solid #efefef;padding:20px 0;">
                    <div style="font-size:80px;color:#efefef;">
                      <i class="el-icon-shopping-cart-2"></i>
                    </div>
                    <div style="color:#909296">购物车中还没有商品</div>
                  </div>
                   <!-- 选中商品列表里有商品的时候 -->
                  <div class="selectGoods" @mouseleave="zhezhao_index=-1" v-if="numArray.length>0?true:false" style="border-bottom:1px solid #efefef;min-height:140px">
                    <div v-for="(item,index) in numArray" :key="index" style="height:60px;display:flex;align-items:center;justify-content:space-between;position:relative;">
                      <!-- 标题 -->
                      <div style="display:flex;align-items:center;font-size:12px"  @mouseenter="zhezhao_index=index">
                        <img style="width:30px;height:30px;margin-right:12px;margin-left:20px" :src="item.data.imageFileName" alt="">
                        <span>
                          <strong>标题：{{item.data.outerSkuName}}</strong><br>
                          <div style="color:#909296;font-size:12px;margin-top:4px">零售价:￥{{item.data.supplyPrice}}</div>
                        </span>
                      </div>
                      <!-- 数量 -->
                      <div>
                        <el-input-number @change="test(index)" style="width:80px" size="mini" controls-position="right" v-model="num" :min="1">1</el-input-number>
                      </div>
                      <div>
                        <div v-if="item.type==1?true:false"  style="font-size:12px">￥{{Number(item.data.supplyPrice)*num}}</div>
                        <div v-if="item.type==0?true:false" style="font-size:12px;color:#21b995;"><i class="el-icon-present"></i> 赠品</div>
                        <div style="color:#21b995;font-size:12px">
                          <i class="el-icon-edit"></i>
                          ￥
                          <input class="input_modify" type="text" :value="item.type==0?'0':item.data.supplyPrice">
                        </div>
                      </div>
                      <!-- 遮罩层 -->
                       <div class="zhezhao" v-if="zhezhao_index==index?true:false">
                         <i @click="deleteNum(index)" class="el-icon-delete"></i>
                       </div>
                    </div>
                  </div>
                  <!-- 金额 -->
                  <div class="gwc_bottom">
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 20px">
                      <div>总价</div>
                      <div style="color:#FF5500;font-size:28px">￥ 0.00</div>
                    </div>
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 20px;margin:10px 0">
                      <div class="gwc_gn gwc_gn_left" @click="copy()" v-clipboard:copy="copyContent" v-clipboard:success="onCopy" v-clipboard:error="onError">
                        <i class="el-icon-document-copy"></i>
                        复制商品信息
                      </div>
                      <div class="gwc_gn gwc_gn_right" @click="newOrder()">
                           <i class="el-icon-shopping-cart-2"></i>
                           去下单（{{numArray.length}}）
                      </div>
                    </div>
                  </div>
               </main>
           </div>
        </div>
        <el-dialog :visible.sync="isPopShow">
          <img style="width:100%;height:100%" :src="popImg" alt="">
        </el-dialog>
        <div id="copyNumDes" style="display:none"></div>
    </div>
</template>
<script>
import $ from "jquery"
import { getList } from '@/api/table'
export default {
  data() {
    return {
      totalNum: 100,
      isShow: false,
      isPopShow:false,
      fdjIndex:-1,
      showClo:false,
      goodsList:[],
      popImg:'',
      numArray:[],//临时存储加入购物车的商品
      num: 1,//商品数量的初始值
      zhezhao_index:-1,
      page:1,
      copyContent:''
    };
  },
  watch:{
    numArray(){
      if(this.numArray.length>0){
        $('.gwc_gn_left').css({
          'background':'#5CA6FF',
          "color":"white"
        });
        $('.gwc_gn_right').css({
          'background':'#21B995',
          "color":"white"
        })
      }
      else{
        $('.gwc_gn_left').css({
          "background-color": "rgba(238, 240, 243, 1)",
          "color": "rgba(166, 176, 195, 1)"
        });
      }
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    search(){
      var selectIndex=Number($('#searchIndex').val())
      var data={
      pageIndex:this.page,
      pageSize:10,
      query:{
        offeringName:selectIndex==0?$('#searchDes').val():'',
        offeringId:selectIndex==1?$('#searchDes').val():'',
        skuId:selectIndex==2?$('#searchDes').val():'',
        saleStatus:"1",
      }
     }
     getList(data).then((res)=>{
       this.goodsList=res.data.beanList
       this.totalNum=Number(res.data.amount)
     })
    },
    // 点击清空
    qingkong(){
      this.numArray=[]
    },
    //点击页数
    handleCurrentChange(val){
      console.log(val)
      this.page=val
      this.search()
    },
    // 点击赠品 加入购物车
    addGoods(value,index,i){
      var obj={
        data:this.goodsList[index].skuList[i],
        type:value
      }
      this.numArray.push(obj)
      console.log(this.numArray)
    },
    deleteNum(index){
      this.numArray.splice(index,1)
    },
    // 左边的规格点击展开更多
    show(index) {
      this.isShow = !this.isShow;
      if (this.isShow == true) {
        $(".gg_detail").eq(index).css({ "height": this.goodsList[index].skuList.length * 60 + "px"})
        $(".el-icon-caret-bottom").eq(index).removeClass("el-icon-caret-bottom").addClass("el-icon-caret-top")
        $(".tipContent").eq(index).text("点击收起")
      } else {
        $(".gg_detail")
          .eq(index)
          .css({
            "height": "120px"
          });
        $(".el-icon-caret-top")
          .eq(index)
          .removeClass("el-icon-caret-top")
          .addClass("el-icon-caret-bottom");
        $(".tipContent")
          .eq(index)
          .text("共"+this.goodsList[index].skuList.length+"个规格，点击展示更多 ");
      }
    },
    // 鼠标移动到图片上，图标显示
    enter(index) {
      this.fdjIndex=index
    },
    // 点击放大镜触发
    popOpen(value){
       this.isPopShow=true
       this.popImg=value
    },
    newOrder(){
      this.$emit('type',1)
    },
    //复制商品信息
    copy(){
            var num='请核对商品信息：<br>'
      for(var index=0;index<this.numArray.length;index++){
            var des=this.numArray[index].data.outerSkuName+'x'+this.num+'<br>单价：'+this.numArray[index].data.supplyPrice+'<br>'
            num=num.concat(des)
      }
      var before='【商品总价】￥222'
      var data=num + before
      $('#copyNumDes').html(data);
      this.copyContent=$('#copyNumDes').html(data).text();
    },
    onCopy(){
      console.log('复制成功')
    },
    onError(){
      console.log('复制失败')
    }
  },
};
</script>
<style scoped>
.gg_detail {
  overflow: hidden;
  height: 120px;
}
.wx_title {
  height: 50px;
  width: 100%;
  line-height: 50px;
  padding-left: 20px;
  border-bottom: 1px solid rgb(206, 206, 206);
  color: #909296;
}
.btn_search {
  width: 60px;
  height: 36px;
  background: #21b995;
  color: white;
  text-align: center;
  line-height: 36px;
  margin-left: 20px;
}
/* ::-ms-input-placeholder{
      color:red
  } */
.goods_bottom {
  margin-left: 102px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.items {
  width: 25%;
  height: 60px;
  color: #909296;
  display: flex;
  align-items: center;
  font-size: 12px;
}
.items_money {
  color: #ff0000;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.items_en {
  color: #fbab3e;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.zeng {
  width: 70px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  line-height: 30px;
}
.addgwc {
  background: #21b995;
  color: white;
  width: 110px;
  text-align: center;
  line-height: 30px;
  height: 30px;
  border: 1px solid #21b995;
}
.right {
  width: 36%;
  border: 1px solid red;
  border: 2px solid #efefef;
  margin-left: 30px;
  margin-top: 20px;
}
.gwc_gn {
  width: 200px;
  height: 36px;
  line-height: 36px;
  border-radius: 2px;
  background-color: rgba(238, 240, 243, 1);
  color: rgba(166, 176, 195, 1);
  font-size: 14px;
  text-align: center;
  border: 1px solid rgba(230, 230, 230, 1);
}
.zhezhao{
width:100%;
height:100%;
background:rgba(0,0,0,.3);
position:absolute;
top:0;
z-index:999;
display: flex;
align-items: center;
justify-content: center;
font-size: 18px;
color:white;
}
.input_modify{
width:30px;
height:16px;
font-size:12px;
color:#21b995;
border:none;
outline: none;
}
</style>
