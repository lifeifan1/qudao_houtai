<template>
    <div>
        <div style="border:2px solid #efefef;width:98%;margin:20px auto;padding-bottom:50px">
            <section class="wx_title">
              创建订单
            </section>
            <div style="display:flex;">
                <main style="width:60%;border:1px solid red;padding:20px">
                   <div>
                     <span><span style="color:red">*</span> 订单总价：</span>
                     <el-input-number @change="totalNum(num)" :precision="2" :min="0" class="orderTotal" style="width:72%;height:40px;color:red" size="large" controls-position="right" v-model="num"></el-input-number>
                   </div>
                   <div style="margin-top:10px">
                     <span><span style="color:red;visibility:hidden">*</span> 整单让利：</span>
                       <el-input-number @change="aduceNum(num1)" :precision="2" :min="0" class="orderTotal" style="width:72%;height:40px" size="large" controls-position="right" v-model="num1"></el-input-number>
                       <span class="percent" style="color:red;font-size:12px">100.00%</span>
                   </div>
                   <el-alert class="tips" style="background:white;margin-left:83px;color:red;display:none;"
                         :closable="false"
                         title="折扣低于95%,请确认是否通过主管审批"
                         type="warning"
                         show-icon>
                    </el-alert>
                   <!-- 收款类型 -->
                    <div style="margin-top:10px;display:flex;align-items:center">
                     <span><span style="color:red;">*</span> 收款类型：&nbsp;</span>
                     <div style="width:200px;height:30px;display:flex;">
                       <div @click="selectType(0)" class="selected_type" :style="selected==0?'color:white;width:49%;background:#21B995;height:100%':''">已付全款</div>
                       <div @click="selectType(1)" class="selected_type" :style="selected==1?'color:white;width:49%;background:#21B995;height:100%':''">预售单</div>
                     </div>
                   </div>
                   <!-- 预收定金 -->
                   <div style="margin-top:10px" v-if="selected==1?true:false">
                     <span><span style="color:red;visibility:hidden">*</span> 预售定金：</span>
                       <el-input-number step="10" @change="aduceNum(num1)" :precision="2" :min="0" class="orderTotal" style="width:72%;height:40px" size="large" controls-position="right" v-model="ysNum"></el-input-number>
                   </div>
                   <!-- 支付方式 -->
                   <div style="margin-top:20px">
                     <span><span style="color:red;">*</span> 支付方式：</span>
                     <el-radio-group v-model="radio">
                       <el-radio :label="1"><img class="tubiao" src="../../assets/img/wx.png" alt="">微信转账</el-radio>
                       <el-radio :label="2"><img class="tubiao" src="../../assets/img/zfb.png" alt="">支付宝</el-radio>
                       <el-radio :label="3"><img class="tubiao" src="../../assets/img/card.png" alt="">银行卡转账</el-radio>
                        <el-radio :label="4"><img class="tubiao" src="../../assets/img/ewm.png" alt="">二维码收款</el-radio>
                     </el-radio-group>
                   </div>
                    <!-- 客服 -->
                   <div style="margin-top:20px">
                     <span><span style="color:red;">*</span> 客服：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <el-select v-model="kfvalue" placeholder="请选择客服"  style="width:72%;height:30px">
                            <el-option
                              v-for="item in kfoptions"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                      </el-select>
                   </div>
                   <!-- 客户资料 -->
                   <div style="margin-top:20px;display:flex">
                     <span><span style="color:red;">*</span> 客户资料：</span>
                     <div class="khzl">
                       <div>
                         <span><span style="color:red;">*</span> 微信号：&nbsp;&nbsp;&nbsp;</span>
                         <el-input style="width:70%;height:30px" placeholder="用户微信号"></el-input>
                       </div>
                      <div style="margin-top:15px">
                        <span><span style="color:red;">*</span> 进粉日期：</span>
                        <el-date-picker style="width:70%;height:30px"
                            v-model="value1"
                            type="date"
                            placeholder="进粉日期">
                        </el-date-picker>
                      </div>  
                     </div>
                   </div>
                    <!-- 收件信息 -->
                   <div style="margin-top:20px;display:flex">
                     <span><span style="color:red;">*</span> 收件信息：</span>
                     <div class="khzl">
                       <div>
                         <span><span style="color:red;">*</span> 姓名：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                         <el-input style="width:70%;height:30px" placeholder="收件人姓名"></el-input>
                       </div>
                        <div style="margin-top:15px">
                         <span><span style="color:red;">*</span> 联系电话：</span>
                         <el-input style="width:70%;height:30px" placeholder="收件人手机号"></el-input>
                       </div>
                       <div style="margin-top:15px">
                         <span><span style="color:red;">*</span> 收货地址：</span>
                         <!-- <div class="block"> -->
                            <el-cascader style="width:70%;height:30px" clearable='true'
                              v-model="value"
                              :options="options"
                              @change="handleChange"></el-cascader>
                          <!-- </div> -->
                       </div>
                       <div style="margin-top:15px">
                         <el-input style="width:70%;height:30px;margin-left:84px" placeholder="详细收货地址（不包括省、市、区/县）"></el-input>
                       </div>
                       <div style="margin-top:15px;">
                         <span style="display:inline-block;position:relative;top:-15px"><span style="color:red;visibility:hidden;">*</span>客户备注：&nbsp;&nbsp;</span>
                         <el-input style="width:70%;"
                            type="textarea"
                            :rows="5"
                            placeholder="客户的备注、要求，将打印在单子面单上"
                            >
                         </el-input>
                         <!-- <textarea style="width:70%;" placeholder="客户的备注、要求，将打印在单子面单上" name="" id="" cols="30" rows="10"></textarea> -->
                       </div>
                     </div>
                   </div>
                   <!-- 转账备注 -->
                   <div style="margin-top:20px;display:flex">
                     <span><span style="color:red;">*</span> 转账备注：</span>
                     <div class="khzl">
                       <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i style="margin-top:45px" class="el-icon-plus"><br><span style="font-size:14px">上传图片</span></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                          <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                     </div>
                   </div>
                   <!-- 订单备注 -->
                    <div style="font-size:14px;font-size:14px;margin-top:15px">
                         <span><span style="color:red;visibility:hidden">*</span>订单备注：&nbsp;</span>
                         <el-input style="width:70%;height:30px" placeholder="用户微信号"></el-input>
                    </div>
                    <!-- 最后按钮 -->
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 83px;margin:40px 0">
                      <div class="gwc_gn" style="background:#5CA6FF;color:white">
                        复制信息发给客户确认
                      </div>
                      <div class="gwc_gn gwc_gn_right" @click="orderCommit()" v-text="selected==0?'创建订单提交审核':'创建订单'"></div>
                    </div>
               </main>
               <main class="right">
                 <!-- 头部 -->
                  <div style="height:70px;display:flex;align-items:center;border:1px solid #efefef;padding:0 20px;justify-content:space-between">
                        <div style="font-weight:bold;font-size:14px">购物车</div>
                  </div>
                   <!-- 选中商品列表里有商品的时候 -->
                  <div v-if="numArray.length>0?true:false" style="border-bottom:1px solid #efefef;min-height:140px">
                    <div v-for="item in 3" :key="item" style="height:60px;display:flex;align-items:center;justify-content:space-between;padding:0 20px">
                      <!-- 标题 -->
                      <div style="display:flex;align-items:center;font-size:12px">
                        <img style="width:30px;height:30px;margin-right:12px" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2229864841,4232235061&fm=26&gp=0.jpg" alt="">
                        <span><strong>标题：撒谎基督教卡了公</strong></span>
                      </div>
                      <div>
                        <div style="font-size:12px">￥85.00</div>
                        <div style="font-size:12px;color:#21b995;"><i class="el-icon-present"></i> 赠品</div>
                        <div style="font-size:12px;float:right;color:gray">x2</div>
                      </div>
                    </div>
                  </div>
                  <!-- 金额 -->
                  <div class="gwc_bottom">
                    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 20px">
                      <div>总价</div>
                      <div style="color:#FF5500;font-size:28px">￥ 0.00</div>
                    </div>
                  </div>
               </main>
           </div>
        </div>
    </div>
</template>
<script>
var total=222
import $ from "jquery";
export default {
  data() {
    return {
      numArray:[1,2],//临时存储加入购物车的商品
      num: 0,//商品订单总价的初始值 计数器
      num1:0,//全部让利
      value1:'',//进粉日期的value值
      value2:'',//下单日期的value值
      selected:0,//付款方式默认为0 全款
      kfoptions: [{
          value: '1',
          label: '黄金糕'
        }, {
          value: '2',
          label: '双皮奶'
        }],//选择客服的多选内容
      kfvalue: '',//选择客服的多选
      radio:1,//单选
      value: [],//地区选择器中的变量
      options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
      dialogImageUrl: '',//上传图片变量
      dialogVisible: false,//上传图片
      // 预售定金
      ysNum:0,
    };
  },
  mounted(){
    this.num=total
  },
  methods:{
    totalNum(numIn){
      this.num1=total-numIn
      var pre=(100-this.num1/total*100).toFixed(2)
      $('.percent').text(pre+'%')
      if(pre<95){
        $('.tips').css({'display':'inline'})
      }
      else{
        $('.tips').css({'display':'none'})
      }
    },
    aduceNum(aduceNum){
      this.num=total-aduceNum
      var pre=(100-aduceNum/total*100).toFixed(2)
      $('.percent').text(pre+'%')
      if(pre<95){
        $('.tips').css({'display':'inline'})
      }
      else{
        $('.tips').css({'display':'none'})
      }
    },
    // 选择全付或者预售
    selectType(value){
      this.selected=value
    },
    // 地区选择器
    handleChange(value) {
      console.log(value);
    },
     handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    orderCommit(){
        this.$confirm('<div style="color:red">整单折扣低于95%，请确认是否通过主管审批？</div>', '提示', {
          dangerouslyUseHTMLString: true,
          showCancelButton:true,
          confirmButtonText:'确认已审核继续提交',
        }).then(()=>{
            this.$emit('sucessType',2)
        });  
    }
  }
};
</script>
<style scoped>
.tubiao{
  width:12px;
  margin-right:2px;
  position:relative;
  top:1px
}
.selected_type{
color:black;
width:51%;
height: 30px;
text-align: center;
line-height: 30px;
border:1px solid #21B995;
}
.wx_title {
  height: 50px;
  width: 100%;
  line-height: 50px;
  padding-left: 20px;
  border-bottom: 1px solid rgb(206, 206, 206);
  color: #909296;
}
.goods_bottom {
  margin-left: 102px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.right {
  width: 36%;
  border: 1px solid red;
  border: 2px solid #efefef;
  margin-left: 30px;
  margin-top: 20px;
}
.gwc_gn {
  width: 48%;
  height: 36px;
  line-height: 36px;
  border-radius: 2px;
  background-color: rgba(238, 240, 243, 1);
  color: rgba(166, 176, 195, 1);
  font-size: 14px;
  text-align: center;
  border: 1px solid rgba(230, 230, 230, 1);
}
.khzl{
width: 80%;
line-height: 20px;
background-color: rgba(243, 243, 244, 1);
color: rgba(16, 16, 16, 1);
font-size: 14px;
text-align: center;
border: 1px solid rgba(255, 0, 0, 0);
padding: 20px 0;
box-sizing: border-box;
}
</style>
