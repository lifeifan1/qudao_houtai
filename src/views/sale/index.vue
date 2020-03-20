
<template>
  <div class="goodslist">
    <div class="serch_top">
      <div>
        <el-button type="primary" style="height: 30px;line-height: 0;">添加</el-button>
        <el-button type="danger" style="height: 30px;line-height: 0;">删除</el-button>
      </div>
      <div>
      <el-select style="width:120px" v-model="statusSel" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-select style="width:120px" v-model="wxUser" placeholder="请选择">
    <el-option
      v-for="item in selUser"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
  </div>
  <div>
     <el-table
     border
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    :header-cell-style="{background:'#f2f2f2',color:'#333'}"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55"
      align="center">
    </el-table-column>
    <el-table-column
      label="ID"
      width="120"
      align="center">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column
      prop="name"
      label="销售姓名"
      width="120"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="账号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="手机号"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="创建时间"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="最后登录时间"
      align="center">
    </el-table-column>
    <el-table-column
      prop="address"
      label="管理微信号"
      align="center">
    </el-table-column>
    <el-table-column
      label="状态"
      width="90px"
      align="center">
      <template slot-scope="scope">
        <el-tag
          type="primary"
          disable-transitions>待审核</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="操作"
      align="center">
      <template slot-scope="scope">{{ scope.row.date }}</template>
    </el-table-column>
  </el-table>
  </div>
  <div style="text-align: center;">
    <el-pagination
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="page">
    </el-pagination>
</div>

  </div>
</template>

<script>

export default {
  data(){
    return{
      currentPage:1,
      page:10,
      fullscreenLoading:true,
      statusSel:1,
      wxUser:1,
      options:[{
        label:"状态",
        value:1
      },{
        label:"正常",
        value:2
      },{
        label:"禁用",
        value:3
      }],
      selUser:[{
        label:"选择销售",
        value:1
      }],
      tableData: [{
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
        }],
        multipleSelection: []
    }
  },
  components:{

  },
  methods:{
    handleCurrentChange(currentPage){
      this.fullscreenLoading = true;
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
      }
  },
  created(){

  },
  beforeMount(){

  },
  mounted(){
  }
}
</script>
<style scoped>
.serch_top{
  display: flex;
  justify-content: space-between;
  padding: 10px;
}
</style>
