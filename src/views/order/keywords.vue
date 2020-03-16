<template>
  <div>
    <div style="padding: 4px;padding-top: 14px;position: relative;">
				<div class="flex">
					<div class="flex" style="margin-right: 15px;width: 30%;">
					<el-select style="width:110px" v-model="select_value" placeholder="请选择">
    <el-option
      v-for="item in optionTime"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
						<div style="display: flex;align-items: center;width:calc(100% - 100px);">
						<el-date-picker
      v-model="value1"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width:100%">
    </el-date-picker>
						</div>
					</div>
					<div class="flex" style="margin-right: 15px;width: 30%;">
							<span class="bg_h" style="height: 30px;border:1px solid #e6e6e6;line-height: 30px;box-sizing: border-box;padding: 0 10px;width:110px;">订单号</span>
							<el-input style="height: 30px;width: calc(100% - 110px);" v-model="order_input"  autocomplete="off" placeholder="订单号"></el-input>
					</div>
					<div class="flex" style="margin-right: 15px;width: 30%;">
							<span class="bg_h" style="height: 30px;border:1px solid #e6e6e6;line-height: 30px;box-sizing: border-box;padding: 0 10px;width:110px;">客户姓名</span>
							<el-input style="height: 30px;width: calc(100% - 110px);" v-model="kh_name"  autocomplete="off" placeholder="客户姓名"></el-input>
					</div>
				</div>
				<div class="flex">
					<div class="flex" style="margin-right: 15px;width: 30%;">
						<span class="bg_h" style="height: 30px;border:1px solid #e6e6e6;line-height: 30px;box-sizing: border-box;padding: 0 10px;width:110px;">手机号</span>
						<el-input style="height: 30px;width: calc(100% - 110px);" v-model="phone"  autocomplete="off" placeholder="收货手机号"></el-input>
				</div>
				<div class="flex" style="margin-right: 15px;width: 30%;">
						<span class="bg_h" style="height: 30px;border:1px solid #e6e6e6;line-height: 30px;box-sizing: border-box;padding: 0 10px;width:110px;">商品名称</span>
						<el-input style="height: 30px;width: calc(100% - 110px);" v-model="phone"  autocomplete="off" placeholder="商品名称"></el-input>
				</div>
				<div class="flex" style="margin-right: 15px;width: 30%;">
						<span class="bg_h" style="height: 30px;border:1px solid #e6e6e6;line-height: 30px;box-sizing: border-box;padding: 0 10px;width:110px;">sku编码</span>
						<el-input style="height: 30px;width: calc(100% - 110px);" v-model="phone"  autocomplete="off" placeholder="sku编码"></el-input>
				</div>
				</div>
				<div class="flex">
					<div class="flex lay_search" style="margin-right: 15px;width: 30%;">
						<el-select style="width:110px" v-model="select_value">
          <el-option
            v-for="item in optionTime"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
						<div style="width: calc(100% - 110px);">
						<el-select style="width:100%" v-model="select_value" >
          <el-option
            v-for="item in optionTime"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
						</div>
				</div>

				<div class="flex" style="margin-right: 15px;width: 30%;">
					<span class="bg-hui" style="background:#F3F3F4; height: 30px;border:1px solid #e6e6e6;line-height: 30px;box-sizing: border-box;padding: 0 10px;width:110px;">商品名称</span>
					<div style="width: calc(100% - 110px);">
						<el-select style="width:100%" v-model="select_value" >
          <el-option
            v-for="item in optionTime"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
          </el-option>
        </el-select>
					</div>
				</div>
				<div style="margin-right: 15px;width: 30%;">
          <el-button type="primary" style="background-color: #21B995;width:100%;padding: 7px 20px;border-color:#21B995">搜索</el-button>
				</div>
				</div>
				<!-- <img src="/images/ljt.png" style="width: 22px;height: 22px;position: absolute;right: 16px;bottom: 0;" class="cur ljt" alt=""> -->
			</div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      optionTime:[{
        label:"下单日期",
        value:"1"
      },{
        label:"进粉日期",
        value:"2"
      }],

    }
  },
  methods:{
  numberAdd() {
  this.number ++;
  this.$emit('change11');//子组件触发父组件
  }
  }
}
</script>
<style scoped>
.flex{
    display: flex;
    margin-bottom: 10px;
}
.bg_h{
  background-color: #f3f3f4;
}
</style>
