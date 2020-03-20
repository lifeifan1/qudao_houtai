<template>
  <div class="detile">
    <div class="flex_end btn_top">
      <el-button @click="tgBtn()" style="color: #fff;background-color: #21B995;height:30px;line-height: 30px;padding: 0 14px;font-size: 12px;">审批通过</el-button>
      <el-button @click="bhBtn()" style="color: #fff;background-color: #FF5653;height:30px;line-height: 30px;padding: 0 14px;font-size: 12px;">驳回订单</el-button>
    </div>
    <div class="flex top_contet">
      <div class="top_left">
        <div>
          <span class="s_wd">客服：</span><span class="kefu"></span
          ><span class="z_color kefu_name"
            >{{ detileList.wxinfo.saleWxidNick }}【{{
              detileList.info.saleName
            }}】</span
          >
        </div>
        <div>
          <span class="s_wd">订单金额：</span>¥<span class="order_price">{{
            detileList.consignee.receiverName
          }}</span>
        </div>
        <div>
          <span class="s_wd">折扣率：</span
          ><span class="red_color zkl">{{zkl}}</span>
        </div>
        <div><span class="s_wd">毛利率：</span><span class="mll">{{mll}}</span></div>
      </div>
      <div class="top_right">
        <div>
          <span class="s_wd">收货人：</span
          ><span class="s_name">{{ detileList.consignee.receiverName }}</span>
        </div>
        <div>
          <span class="s_wd">手机号：</span
          ><span class="phone">{{ detileList.consignee.receiverMobile }}</span>
        </div>
        <div>
          <span class="s_wd">收货地址：</span
          ><span class="dizhi"
            >{{ detileList.consignee.receiverState
            }}{{ detileList.consignee.receiverCity
            }}{{ detileList.consignee.receiverDistrict
            }}{{ detileList.consignee.receiverAddress }}</span
          >
        </div>
        <div>
          <span class="s_wd">买家留言：</span
          ><span
            v-for="(k, item) in detileList.memos"
            :key="item"
            class="h_color msg1"
          >
            {{ k.msgType == 1 ? k.message : "" }}
          </span>
        </div>
      </div>
    </div>
    <div class="dowebok bor imghtml">
      <el-image
      v-for="(i,imgIndex) in detileList.info.payImgs"
      :key="imgIndex"
    style="width: 100px; height: 100px"
    :src="i"
    :preview-src-list="detileList.info.payImgs">
    {{i}}
  </el-image>
    </div>
    <div class="flex" style="padding: 10px 0;">
      <div class="top_left">
        <div>
          <span class="s_wd">进粉日期：</span
          ><span class="jfrq">{{ detileList.wxinfo.fansSubDate }}</span>
        </div>
        <div>
          <span class="s_wd">下单时间：</span
          ><span class="xdtime">{{ detileList.info.createTs }}</span>
        </div>
        <div>
          <span class="s_wd">类型：</span
          ><span class="cishu">第{{ detileList.info.firstBuy }}次购买</span>
        </div>
      </div>
      <div class="top_right">
        <div>
          <span class="s_wd">支付方式：</span
          ><span class="zfimg"
            ><img
              :src="
                detileList.info.payType == 1
                  ? '../../assets/img/wx.png'
                  : detileList.info.payType == 2
                  ? '../../assets/img/zfb.png'
                  : detileList.info.payType == 3
                  ? '../../assets/img/card.png'
                  : detileList.info.payType == 4
                  ? '../../assets/img/ewm.png'
                  : ''
              "
              alt=""
          /></span>
        </div>
        <div>
          <span class="s_wd">全款/定金：</span
          ><span class="z_color quankuan">全款</span>
        </div>
        <div>
          <span class="s_wd">订单备注：</span
          ><span
            v-for="(k, item) in detileList.memos"
            :key="item"
            class="h_color msg2"
          >
            {{ k.msgType == 2 ? k.message : "" }}
          </span>
        </div>
      </div>
    </div>
    <h3 class="fahuo" style="padding: 5px 0;border-bottom: 1px solid #F2F0F0;">
      发货单
    </h3>
    <div style="padding: 10px 0;">
      <table class="open_table">
        <thead>
          <tr>
            <th>产品</th>
            <th>编码</th>
            <th>单价/数量</th>
          </tr>
        </thead>
        <tbody class="items">
          <tr v-for="(v, index) in detileList.items" :key="index">
            <td style="display: flex;padding: 5px 0;">
              <div>
                <el-image
                style="width: 54px; height: 54px"
                :src="v.skuImage"
                :preview-src-list="skuImageList"
                >
              </el-image>
              </div>
              <div style="padding-left: 10px;">
                <h2 class="h_2">{{ v.outerSkuName }}</h2>
                <div>规格：{{ v.skuCharSpec }}</div>
                <div>零售价：{{ v.skuPrice }}</div>
              </div>
            </td>
            <td>
              <div><span>sku编码：</span>{{ v.skuId }}</div>
              <div><span>供应商编码:</span>{{ v.supplierTenantId }}</div>
            </td>
            <td>
              <div class="red_color">¥{{ v.skuPrice }}</div>
              <div>X{{ v.num }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <el-dialog
      title="订单审核"
      :visible.sync="tgVisible"
      width="20%"
      append-to-body>
      <div style="min-width: 280px;">
        <div style="padding:4px 0;">
        <span class="s_wd">订单号：</span>{{orderId}}
        </div>
        <div style="padding:4px 0;">
        <span class="s_wd">收货人：</span>{{detileList.consignee.receiverName}}
        </div>
        <div style="padding:4px 0;">
        <span class="s_wd">订单金额：</span>¥{{detileList.info.payFee}}
        </div>
        <div style="padding:4px 0;">
        <span class="s_wd">折扣率：</span><span class="red_color">{{zkl}}%</span>
        </div>
        <div style="text-align: right;">
<el-button @click="qrtgBtn()" style="color:#fff;background-color: #21B995;height:30px;line-height: 30px;padding: 0 14px;font-size: 12px;">确认通过</el-button>
        </div>
        </div>
    </el-dialog>
        <el-dialog
      title="驳回订单"
      :visible.sync="bhVisible"
      width="20%"
      append-to-body>
        <div style="padding:10px;min-width:300px;"><el-input type="textarea" placeholder="请输入订单驳回原因" v-model="desMsg"></el-input>
        <div style="text-align: right;">
      <el-button  @click="qrbhBtn()" style="color:#fff;background-color: #21B995;height:30px;line-height: 30px;padding: 0 14px;font-size: 12px;margin-top:10px;">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {tgOrder,bhOrder} from "@/api/table";
export default {
  name: "detile",
  props: ["detileList",'mll','zkl','orderId'],
  data() {
    return {
      skuImageList:[],
      tgVisible:false,
      bhVisible:false,
      desMsg:""
    };
  },
  components: {},
  methods: {
    tgBtn(){
      this.tgVisible = true;
    },
    bhBtn(){
      this.bhVisible = true;
    },
    qrtgBtn(){
      tgOrder(this.orderId).then((res)=>{
        console.log(res);
        if(res.code==0){
           this.$message({
            message: '审批完成',
            type: 'success',
            duration:2000,
            onClose:function(){
              window.location.reload();
            }
          });
        }else{
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error',
          duration:2000,
        });
      }
      }).catch((error)=>{
        console.log(error)
      })
    },
    qrbhBtn(){
      let data={
        message:this.desMsg,
        gxOrderId:this.orderId
      }
      if(this.desMsg==""){
        this.$message({
          showClose: true,
          message: "驳回原因不能为空",
          type: 'error',
          duration:2000,
        });
        return false;
      }
      bhOrder(gxOrderId).then((res)=>{
        console.log(res);
        if(res.code==0){
           this.$message({
            message: '审批完成',
            type: 'success',
            duration:2000,
            onClose:function(){
              window.location.reload();
            }
          });
        }else{
        this.$message({
          showClose: true,
          message: res.message,
          type: 'error',
          duration:2000,
        });
      }
      }).catch((error)=>{
        console.log(error)
      })
    }
  },
  created() {
    for(let i=0;i<this.detileList.items.length;i++){
      this.skuImageList.push(this.detileList.items[i].skuImage)
    }
  },
  updated() {
  }
};
</script>

<style scoped>
@import url("../../styles/flg_open.css");
</style>
