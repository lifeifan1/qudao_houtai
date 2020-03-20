<template>
  <div class="edit">
    <div>
      <h2 class="h2">商品信息</h2>
      <div>
        <div style="padding: 8px 0;" class="flex">
          <span class="red">*</span>商品名称：
          <el-input style="width:266px;height: 30px;margin-left:10px;" v-model="input" placeholder="请输入内容"></el-input>
        </div>
        <div style="padding: 8px 0;" class="select_father flex">
          <span class="red">*</span>选择店铺：
              <el-select style="width:266px;margin-left:10px" v-model="select_shop" placeholder="请选择">
    <el-option
      v-for="item in shopName"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        </div>
      </div>
    </div>
    <!--  -->
    <div>
      <h2 class="h2">商品规格</h2>
      <div class="bot_content" style="margin:8px 0;">
        <div class="img_content">
          <div class="img_one"><span class="red">*</span>图片上传：</div>
          <div class="img_two1">
            <div style="width:350px">
              <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
            </div>
          </div>
        </div>
        <div class="sku_list">
          <div class="img_one"><span class="red">*</span>sku列表：</div>
          <div class="img_two2">
            <table class="table">
              <thead>
                <tr>
                  <th>规格</th>
                  <th>渠道成本价</th>
                  <th>进货成本价</th>
                  <th class="sku_show">sku编码</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody class="tbody">
                <tr v-for="(i,index) in addList" :key="index">
                  <td>
                    <el-input v-model="i.gg" style="height: 30px;"></el-input>
                  </td>
                  <td>
                    <el-input v-model="i.qdcbj" style="height: 30px;"></el-input>
                  </td>
                  <td>
                   <el-input v-model="i.jhcbj" style="height: 30px;"></el-input>
                  </td>
                  <td class="sku_td"></td>
                  <td>
                    <a href="javascript:;" v-if="index!=0" @click="delBtn(index)" class="del_btn red">删除</a>
                  </td>
                </tr>
              </tbody>
            </table>
            <el-button @click="add()" style="line-height: 7px;height: 32px;margin-top: 15px;">添加新的规格</el-button>
          </div>
        </div>
      </div>
    </div>
    <button
      type="button"
      style="margin-top: 10px;display: inline-block;"
      class="btn tj_btn"
      @click="tjBtn()"
    >
      保存
    </button>
  </div>
</template>

<script>

export default {
  name:'edit',
  props: ["editData","goodsId"],
  data() {
    return {
      addList:[{
        gg:"",
        jhcbj:"",
        qdcbj:""
      }],
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }],
      skuImageList: [],
      input:"",
      select_shop:1,
      shopName:[{
        label:"东海老船长",
        value:1
      }],
      num:1
    }
  },
  components: {},
  methods: {
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      add(){
        this.addList.push({
        gg:this.num,
        jhcbj:this.num,
        qdcbj:this.num
      });
      this.num+=1;
      },
      delBtn(index){
        this.addList.splice(index,1)
      },
      tjBtn(){
        console.log(this.addList);
      }
  },
  created() {

  },
  updated() {}
};
</script>

<style scoped>
.btn {
  background-color: #21b995 !important;
  border: 0 !important;
  line-height: 30px !important;
  text-align: center !important;
  padding: 0 30px !important;
  font-size: 13px !important;
  color: #fff;
  cursor: pointer;
}
.red {
  color: #ff5157;
}
.select_father .layui-input {
  width: 300px !important;
  height: 30px !important;
}
.select_father .layui-this {
  background-color: #21b995 !important;
}
.select_father .layui-form-select dl dt,
.layui-form-select dl dd {
  line-height: 30px;
}
.flex {
  display: flex;
  align-items: center;
}
.img_one {
  width: 80px;
  /* height: 120px; */
  height: 100%;
  float: left;
  text-align: right;
}
.img_two1 {
  width: calc(100% - 80px);
  padding: 9px 0;
  display: inline-block;
}
.img_two2 {
  width: calc(100% - 80px);
  height: auto;
  display: inline-block;
}
.bot_content {
  background-color: #fafafa;
}
.table {
  width: 100%;
}
.table thead th {
  height: 50px;
  background-color: #f3f3f4;
}
.table tbody {
  height: 50px;
  background-color: #fff;
}
.table tbody td {
  padding: 10px;
  text-align: center;
}
.h2 {
  font-size: 16px;
  font-weight: 550;
}
.del_btn {
}
.del_btn:hover {
  color: #ff5157;
}
.clos {
  cursor: pointer;
  font-size: 20px;
}
.disbled {
  color: #c0c0c0;
}
</style>
