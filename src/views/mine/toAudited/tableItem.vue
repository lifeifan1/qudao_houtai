<template>
  <div style="margin-top:30px;">
      <el-table class="biaoge" style="font-size:13px" border ref="multipleTable" :data="tableData" tooltip-effect="light" @selection-change="handleSelectionChange">
           <el-table-column v-if="status>3?true:false"  type="selection"  width="55"></el-table-column>
           <el-table-column label="订单号" width="120">
             <template slot-scope="scope">
               <span style="display:inline-block;border:1px solid red;width:30px;height:30px"></span>
               <span>{{scope.row.name}}</span>
             </template>
           </el-table-column>
           <el-table-column prop="name" label="名字" width="120"></el-table-column>
           <el-table-column prop="name" label="电话" width="120"></el-table-column>
           <el-table-column prop="name" label="金额" width="120"></el-table-column>
           <el-table-column prop="name" label="改价" width="120"></el-table-column>
           <el-table-column  label="支付" width="50">

           </el-table-column>
           <el-table-column prop="date" label="进粉日期" width="120"></el-table-column>
           <el-table-column prop="date" label="下单日期" width="120"></el-table-column>
           <el-table-column label="状态" width="120">
             <template slot-scope="status">
               <span style="border:1px solid #21B995;;color:#21B995;;padding:0 8px;display:inline-block;font-size:12px">待审批</span>
             </template>
           </el-table-column>
           <el-table-column label="操作">
                   <template slot-scope="scope">
                        <span style="color:#21B995;" @click="handleLook(scope.$index, scope.row)">查看</span>
                        <span style="color:#21B995;">|</span>
                        <span style="color:#21B995;" @click="handleEdit(scope.$index, scope.row)">编辑</span>
                        <span style="color:#21B995;">|</span>
                        <span style="color:#21B995;" @click="handleDelete(scope.$index, scope.row)">撤销</span>
                    </template>
            </el-table-column>
      </el-table>
    <div class="content">
      <el-dialog title="34567890-订单详情" :visible.sync="dialogDetail" custom-class="popup" top="5vh">
       <section style="display:flex;padding:0 20px">
         <!-- 左面 -->
         <div style="width:60%;">
           <span>收货人：热热我</span><br>
           <span>手机号：而他也</span><br>
           <span>收货地址：踩踩踩踩踩踩从</span><br>
           <span>买家留言：<span style="color:#21B995;">水水水水</span></span><br>
           <span>快递：</span>
         </div>
         <!-- 右边 -->
         <div style="width:40%;padding:5px 20px;display:flex">
           <div class="btn1" style="background-color: #21B995;margin-right:20px">修改订单</div>
           <div class="btn1" style="background:#FB6C6A 100%">撤销订单</div>
         </div>
       </section>
       <div style="border-bottom:1px solid #E3E3E3;width:100%;margin:10px 0;"></div>
       <section style="display:flex;justify-content:space-between;padding:0px 20px" >
         <div @mouseenter="enter(index)" v-for="(item,index) in 5" :key="item" style="position:relative;font-size:22px;border:1px solid red;width:120px;height:120px">
            <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2229864841,4232235061&fm=26&gp=0.jpg" alt="" style="width:100%;height:100%;">
            <i v-if="fdjIndex==index?true:false" @click="innerVisible=true" class="el-icon-zoom-in" style="z-index:999;position:absolute;bottom:5px;right:5px"></i>
         </div>
       </section>
        <div style="border-bottom:1px solid #E3E3E3;width:100%;margin:10px 0;"></div>
        <section style="display:flex;padding:0 20px">
           <!-- 左面 -->
         <div style="width:50%;">
           <span>订单号：热热我</span><br>
           <span>录入时间：而他也</span><br>
           <span>类型：踩踩踩踩踩踩从</span><br>
           <span>客服：反反复复</span>
         </div>
          <!--右面 -->
         <div style="width:50%;">
           <span>支付方式：热热我</span><br>
           <span>全款/定金：<span style="color:#21B995;">水水水水</span></span><br>
           <span>支付金额：踩踩踩踩踩踩从</span><br>
           <span>订单备注：<span style="color:#FBAB3E；">水水水水</span></span>
         </div>
        </section>
        <div style="padding:0 20px;font-size:16px">发货单</div>
        <div style="border-bottom:1px solid #E3E3E3;width:100%;margin:10px 0;"></div>
        <section style="line-height:15px;padding-right:20px;margin-bottom:50px">
            <div v-for="(item,index) in 3" :key="item" style="height:60px;display:flex;align-items:center;justify-content:space-between;position:relative;">
                <!-- 标题 -->
                <div style="display:flex;align-items:center;font-size:12px"  @mouseenter="zhezhao_index=index">
                  <img src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2229864841,4232235061&fm=26&gp=0.jpg" alt="" style="width:40px;height:40px;margin:0 12px;">
                  <span style="display:inline-block;">
                    <strong>标题：撒谎基督教卡了公哈哈哈哈哈解开了</strong><br>
                    <div style="color:#909296;font-size:12px;">规格:2-4只/斤</div>
                    <div style="color:#909296;font-size:12px;">成本价:￥85</div>
                  </span>
                </div>
                <!-- 数量 -->
                <div style="font-size:12px;color:gray;line-height:20px">
                  <div>sku编码:22222</div>
                  <div>供应商编码:wwwwww</div>
                </div>
                <div style="line-height:20px;font-size:12px;color:gray;">
                  <div style="font-size:12px;color:#FB6C6A">￥85.00</div>
                  <div> x1</div>
                </div>
            </div>
        </section>
        <el-dialog title=""  :visible.sync="innerVisible" append-to-body>
           <img style="width:100%;height:100%" src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2229864841,4232235061&fm=26&gp=0.jpg" alt="">
        </el-dialog>
      </el-dialog>
      <el-dialog title="" :visible.sync="dialogDelete" custom-class="popupdelete" :show-close="false" width="30%">
        <h4><i style="color:red" class="el-icon-question"></i> 是否确认要撤销以下订单？</h4>
        <div style="margin-left:24px">
          订单号：22222222 <br>
          姓名：炸撒啊 <br>
          订单金额：222 <br><br>
          <span style="color:red;">一旦撤销将无法恢复</span>
        </div>
        <div style="display:flex;margin:20px">
          <div class="chexiao" style="background-color: rgba(251, 108, 106, 1);color:white">确定撤销</div>
          <div @click="dialogDelete=false" class="chexiao" style="border:1px solid #E3E3E3;margin-left:30px">取消</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
        dialogDetail:false,//点击查看的弹窗
        dialogDelete:false,
        fdjIndex:'',//弹窗内转账订单的索引
        innerVisible:false, //放大图片的弹窗
        status:1, //多选框在什么状态下出现
        tableData: [{ //表格数据
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }
    },
  methods: {
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleLook(index,row){
        // index 索引 row 是这一行的所有内容
        console.log(index,row)
        this.dialogDetail=true
      },
      handleDelete(){
        this.dialogDelete=true
      },
       // 鼠标移动到图片上，图片放大
      enter(index) {
        this.fdjIndex=index
      },
    }
}
</script>
<style lang="scss" scoped>
  /deep/.biaoge{
         .el-table__header{
           line-height: 0;
         }
         .el-table__row .el-table td{
           padding: 0
         }
  }
  /deep/.popup{
    .el-dialog__header{
      padding: 0;
    }
   .el-dialog__body{
      padding: 0;
    }
    section{
      line-height: 25px;
    }
    .btn1{
        width: 100px;
        height: 30px;
        line-height: 30px;
        border-radius: 2px;
        color: rgba(255, 255, 255, 1);
        font-size: 14px;
        text-align: center;
    }
  }
  /deep/.popupdelete{
     height: 254px;
     line-height: 20px;
    .el-dialog{
      height: 254px;
    }
    .el-dialog__body,.el-dialog__header{
      padding: 0
    }
    .el-dialog__body{
      padding: 20px;
    }
    .chexiao{
         height: 30px;
         line-height: 30px;
         padding: 0 10px;
         font-size: 14px;
         text-align: center;
    }
  }
</style>
