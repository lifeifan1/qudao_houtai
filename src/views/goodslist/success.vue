<template>
  <div>
     <div style="border:2px solid #efefef;width:98%;margin:20px auto;padding-bottom:50px">
            <section class="wx_title">
              创建订单 > 结果提醒
            </section>
            <center style="padding-top:30px">
              <div style="font-size:60px;color:rgba(33, 185, 149, 1)"><i class="el-icon-success"></i></div>
              <h3 style="margin:5px 0 20px 0">订单已提交审核</h3>
              <div class="three" @click="message()">再来一单</div>
            </center>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    message(){
      this.$emit('backagain',0)
    }
  }
}
</script>

<style scoped>
  .wx_title {
  height: 50px;
  width: 100%;
  line-height: 50px;
  padding-left: 20px;
  border-bottom: 1px solid rgb(206, 206, 206);
  color: #909296;
}
.three{
width: 100px;
height: 30px;
line-height: 30px;
border-radius: 2px;
background-color: rgba(33, 185, 149, 1);
color: rgba(255, 255, 255, 1);
font-size: 14px;
text-align: center;
border: 1px solid rgba(255, 255, 255, 0);
}
</style>
