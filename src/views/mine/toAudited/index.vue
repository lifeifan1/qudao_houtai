<template>
  <div>
    <section style="display:flex;align-items:center;justify-contents:space-between;">
      <!-- 下单时间 -->
      <div class="items">
         <select name="" id="" :value='valueSelect' class="commonLeft" style="padding:0 5px;border:none;height:33px">
           <option value="下单时间">下单时间</option>
           <option value="进粉时间">进粉时间</option>
         </select>
          <el-date-picker size="small" style="width:220px;border-radius:0"
               v-model="value1"
               type="daterange"
               range-separator="至"
               start-placeholder="开始日期"
               end-placeholder="结束日期">
          </el-date-picker>
      </div>
      <!-- 订单号 -->
      <el-input placeholder="订单号" v-model="input" size="small" class="input_class">
        <template style="background:black" slot="prepend">订单号</template>
      </el-input>
       <!-- 客户姓名 -->
      <el-input placeholder="客户姓名" v-model="input" size="small" class="input_class">
        <template style="background:black" slot="prepend">客户姓名</template>
      </el-input>
    </section>
    <section style="display:flex;margin:10px 0">
       <el-input placeholder="手机号" v-model="input" size="small" class="input_class">
        <template style="background:black" slot="prepend">手机号</template>
      </el-input>
       <el-input placeholder="商品名称" v-model="input" size="small" class="input_class">
        <template style="background:black" slot="prepend">商品名称</template>
      </el-input>
      <!-- sku编码 -->
      <div style="display:flex">
       <select name="" id="" class="commonLeft commonLeft1" style="border:none;padding:0 5px">
         <option value="1">sku编码</option>
         <option value="2">供应商编码</option>
       </select>
       <div style="height:100%;width:200px;border:1px solid #D3D3D3"></div>
     </div>
    </section>
    <section style="display:flex;">
            <!-- 客服微信 -->
          <div style="display:flex;margin-right:30px">
            <div class="commonLeft commonLeft1" style="padding:0 15px">客服微信</div>
            <select name="" id="" class="kfwx" style="width:220px;">
              <option value="0">&nbsp;&nbsp;&nbsp;全部</option>
              <option value="1">adjshkksa22</option>
              <option value="2">adjshkksa22</option>
              <option value="3">adjshkksa22</option>
            </select>
          </div>
          <!-- 搜索按钮 -->
          <button class="btn">搜索</button>
    </section>
    <!-- 表格 -->
    <tableItem></tableItem>
  </div>
</template>
<script>
import tableItem from './tableItem.vue'
export default {
  data(){
    return{
      valueSelect:'下单时间',//select的值
      value1:'',//下单时间的值
      input:'',
      select:'sku编码',
      input3:''
    }
  },
  components:{
    tableItem
  }
}
</script>
<style scope>
.input_class{
  width:300px;margin-right:30px;
}
 .el-select .el-input {
    width: 110px;
  }
 .input-with-select .el-input-group__prepend {
    background-color: #E3E3E4;
  }
 .el-input-group__append, .el-input-group__prepend{
   background: #E3E3E4;
   color:black
 }
.items{
  height:35px;
  display:flex;
  align-items:center;
  margin-right:30px;
}
.commonLeft1{
text-align:center;
line-height:35px;
color:black
}
.commonLeft{
  background:#E3E3E4;
  height:100%;
  font-size:12px;
}
.kfwx{
font-size:12px;border:1px solid #DCDFE6;font-size:12px;color:rgb(180, 177, 177)
}
.btn{
width: 300px;
height: 35px;
line-height: 35px;
border-radius: 2px;
background-color: rgba(33, 185, 149, 1);
color: rgba(255, 255, 255, 1);
font-size: 13px;
text-align: center;
border:none;
}
</style>
