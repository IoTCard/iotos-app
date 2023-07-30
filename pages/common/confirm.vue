<template>
	<view >
    <u-modal  :show="ask_show"
             :showCancelButton="true" @confirm="tun" @cancel="fun" @close="fun">
      <div style="height:300px;" >
        <u--text   prefixIcon="question" iconStyle="font-size: 80px;color:rgb(59, 164, 255);"  :text="message"></u--text>
      </div>

    </u-modal>



  </view>
</template>

<script>
  export default {
    props: {
      setObj: Function,//父组件赋值 函数
      message:String,
      trueFun: Function,//确定 触发函数
      trunPar: String,//确定 触发函数 参数
      falseFun: Function,//取消 触发函数
      falsePar: String,//取消 触发函数 参数
      ask_show: Boolean,
    },
		methods: {
      tun(){
        this.$emit("trueFun", this.trunPar);//已加载
        this.$emit("setObj", "setAskShow", false);
      },
      fun(){
        if(this.falseFun!=null){
          this.$emit("falseFun", this.falsePar);//已加载
        }
        this.$emit("setObj", "setAskShow", false);
      },

		}
	}
</script>
<style lang="scss">


</style>

