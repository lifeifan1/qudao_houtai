<template>
  <div class="timeList">
    <el-timeline v-for="(itme, index) of arr"
        :key="index">
      <el-timeline-item
        :timestamp=itme.time
        placement="top"
      >
        <el-card>
          <h4>{{ index }}</h4>
          <h4>{{ itme.title }}</h4>
          <p>{{ itme.date }}</p>
          <ul>
            <li class="photoList">
              <img style="width:100px;height:100px" :src="itme.picture" alt="图片" />
            </li>
          </ul>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-row>
      <el-button type="primary" round v-if="arr.length==3" @click="btn1">完成</el-button>
      <el-button type="primary" round v-if="arr.length<3" @click="btn">下一步</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      arr: [
        {
          title: "文字",
          date: "2020年3月10日",
          time: "2018/4/12",
          picture: "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg"
        }
      ],
    };
  },
  methods: {
    btn() {
      this.arr.push({
        title: "文字",
        date: "2020年3月10日",
        time: "2018/4/13",
        picture:
          "https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3173584241,3533290860&fm=26&gp=0.jpg"
      });
    },
    btn1(){
      console.log("发起完成请求")
    }
  }
};
</script>

<style scoped>
.photoList {
  /*   width:100px;
    height:100px;
    margin:10px;
    float:left; */
}
.photoList img {
    width: 100px;
    height: 100px;
}

</style>
