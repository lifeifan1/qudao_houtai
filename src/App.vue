<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
@import url('./styles/reset.css');
  body,html{
    font-size: 14px;
    font-family: "PingFang SC","微软雅黑";
  }
  .cur{
    cursor: pointer;
  }
  .el-input__inner {
    height: 30px !important;
    line-height: 30px !important;
}
</style>

