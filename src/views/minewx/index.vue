<template>
  <div style="width:100%;">
    <div style="border:2px solid #efefef;width:98%;margin:20px auto;padding-bottom:200px">
      <section class="wx_title" style="">
        我的微信号
      </section>
      <section style="height:80px;background:#efefef;width:98%;margin:10px auto;display:flex;align-items:center;justify-content:space-between;padding:0 20px">
        <div style="display:flex;width:480px;justify-content:space-between">
          <div>
            <select name="" id="">
              <option value="0">所有状态</option>
              <option value="1">正常</option>
              <option value="2">禁用</option>
            </select>
          </div>
          <div>
            <input type="text" placeholder="  微信名/微信号" style="width:300px;height:36px">
          </div>
          <div class="btn_search" style="padding:0 15px">
            搜索
          </div>
        </div>
        <div class="btn_search" style="padding:0 20px">
            导入表格
        </div>
      </section>

      <section style="padding:0 12px">
        <table>
          <tr>
            <th style="width:180px">微信头像</th>
            <th style="width:240px">微信名</th>
            <th style="width:240px">微信号</th>
            <th style="width:180px">总粉丝数</th>
            <th style="width:190px">微信二维码</th>
            <th style="width:160px">状态</th>
            <th style="width:220px">操作</th>
          </tr>
          <tr v-for="item in 5" :key="item">
            <td>
              <div style="border:1px solid red;height:70px;width:70px;margin:0 auto">
                  <img src="" alt="">
              </div>
            </td>
            <td>
              夏日余晖
            </td>
            <td>zxy</td>
            <td>1111</td>
            <td>
              <div style="border:1px solid red;height:70px;width:70px;margin:0 auto">
                  <img src="" alt="">
              </div>
            </td>
            <td>
              <div class="wx_status">正常</div>
            </td>
            <td>
                <!-- 点击获取弹出框 -->
                <el-button class="buzhou" type="text" @click="open(item)">查看粉丝数据</el-button>
            </td>
          </tr>
        </table>
      </section>
    </div>
    <!-- 弹窗里的详情表格 -->
      <el-dialog width='70%' title="张晓雨-粉丝数据" :visible.sync="dialogTableVisible">
        <div class="pop_time">
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
        <el-table :data="gridData">
          <el-table-column property="date" label="日期" width="120"></el-table-column>
          <el-table-column property="total" label="总粉丝数" width="90"></el-table-column>
          <el-table-column property="newAdd" label="新增粉丝" width="90"></el-table-column>
          <el-table-column property="manFans" label="新增男粉" width="90"></el-table-column>
          <el-table-column property="women" label="新增女粉" width="90"></el-table-column>
          <el-table-column property="zh" label="综合转化率" width="100"></el-table-column>
          <el-table-column property="fg" label="综合复购率" width="100"></el-table-column>
           <el-table-column property="day" label="首日转化率" width="100"></el-table-column>
          <el-table-column property="three" label="3日转化率" width="100"></el-table-column>
          <el-table-column property="week" label="周转化率" width="90"></el-table-column>
          <el-table-column property="month" label="月转化率" width="90"></el-table-column>
          <el-table-column property="tmonth" label="季转化率" width="90"></el-table-column>
        </el-table>
        <!-- 表格下的分页 -->
        <el-pagination style="text-align:center;margin-top:20px"
           background
           layout="prev, pager, next"
           :total="total">
        </el-pagination>
      </el-dialog>
  </div>
</template>
<script>
import $ from 'jquery'
export default {
  data() {
    return {
      value1:'',
      totalNum: 0,
      total:100,
      gridData: [{
          date: '2016-05-02',
          total: 222,
          newAdd: 122,
          manFans:20,
          women:50,
          zh:'30%',
          fg:'20%',
          day:'20%',
          three:'10%',
          week:'11%',
          month:'11%',
          tmonth:"111%"
        }, {
          date: '2016-05-02',
          total: 222,
          newAdd: 122,
          manFans:20,
          women:50,
          zh:'30%',
          fg:'20%',
          day:'20%',
          three:'10%',
          week:'11%',
          month:'11%',
          tmonth:"111%"
        }, {
          date: '2016-05-02',
          total: 222,
          newAdd: 122,
          manFans:20,
          women:50,
          zh:'30%',
          fg:'20%',
          day:'20%',
          three:'10%',
          week:'11%',
          month:'11%',
          tmonth:"111%"
        }, {
          date: '2016-05-02',
          total: 222,
          newAdd: 122,
          manFans:20,
          women:50,
          zh:'30%',
          fg:'20%',
        },{
          date: '2016-05-02',
          total: 222,
          newAdd: 122,
          manFans:20,
          women:50,
          zh:'30%',
          fg:'20%',
          day:'20%',
          three:'10%',
          week:'11%',
          month:'11%',
          tmonth:"111%"
        },{
          date: '2016-05-02',
          total: 222,
          newAdd: 122,
          manFans:20,
          women:50,
          zh:'30%',
          fg:'20%',
          day:'20%',
          three:'10%',
          week:'11%',
          month:'11%',
          tmonth:"111%"
        },{
          date: '2016-05-02',
          total: 222,
          newAdd: 122,
          manFans:20,
          women:50,
          zh:'30%',
          fg:'20%',
          day:'20%',
          three:'10%',
          week:'11%',
          month:'11%',
          tmonth:"111%"
        }],
        dialogTableVisible: false,
        center:true
    };
  },
  methods:{
    open(){
      this.dialogTableVisible=true
    }
  }
};
</script>
<style scoped>
  .wx_title{
  height:50px;
  width:100%;
  line-height:50px;
  padding-left:20px;
  border-bottom:1px solid rgb(206, 206, 206);
  color:#909296  
  }
  select{
    width:100px;
    height:36px;
    color:#73767a
  }
  .btn_search{
    height:36px;
    background:#21B995;
    color:white;
    text-align:center;
    line-height:36px;
  }
  table{
    border: 1px solid #dddcdc;
    border-width:1px 0px 0px 1px;
    border-collapse:collapse;
    }
  th{
    background: #efefef;
    height: 48px;
    border: 1px solid #dddcdc;
    border-width:0px 1px 1px 0px;
  }
  td{
    height:90px;
    border: 1px solid #dddcdc;
    border-width:0px 1px 1px 0px;
    text-align: center;
  }
  .wx_status{
    width:40px;
    height:20px;
    color:#21B995;
    border:1px solid #21B995;
    border-radius:2px;
    font-size:12px;
    text-align:center;
    line-height:20px;
    margin: 0 auto;
  }
  .buzhou{
    width:100px;
    background: #21B995;
    color: white;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pop_time{
    height:60px;
    background:#efefef;
    width:100%;
    margin-bottom:20px;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding: 0 20px;
  }
</style>
