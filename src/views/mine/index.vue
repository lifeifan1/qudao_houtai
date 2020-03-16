<template>
    <div style="border:2px solid #efefef;width:98%;margin:20px auto;">
        <section class="wx_title" style="border:1px solid #efefef;height:100vh">
            <el-tabs v-model="activeName">
              <el-tab-pane label="待审核" name="待审核">
                <toaudited></toaudited>
              </el-tab-pane>
              <el-tab-pane label="待发货" name="待发货">待发货</el-tab-pane>
              <el-tab-pane label="已发货" name="已发货">已发货</el-tab-pane>
              <el-tab-pane label="已签收" name="已签收">已签收</el-tab-pane>
              <el-tab-pane label="审核未通过" name="审核未通过">审核未通过</el-tab-pane>
              <el-tab-pane label="已作废" name="已作废">已作废</el-tab-pane>
            </el-tabs>
        </section>
    </div>
</template>
<script>
import toaudited from './toAudited/index.vue'
export default {
  data(){
    return{
      activeName: '待审核'
    }
  },
  components:{
    toaudited,
  }
}
</script>

<style scoped>
 .wx_title {
  height: 50px;
  width: 100%;
  line-height: 50px;
  color: #909296;
  border-bottom:1px solid #efefef;
  padding-left:20px;
}
</style>
