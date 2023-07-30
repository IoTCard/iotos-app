<template>
	<view >
    <u-picker  :show="show" ref="uPicker" :closeOnClickOverlay="true" @close="pickerClose" @cancel="pickerClose"  :defaultIndex="defaultIndex" :columns="columns" @confirm="confirm" @change="changeHandler"></u-picker>

    <!-- 触发加载数据函数-->
    <span v-if="show ==true && exBool == false">
        {{ LoadEx() }}
    </span>
  </view>
</template>

<script>
  import tools from "../../utils/iotos/tools";

  export default {
    props: {
      show: Boolean,
      exBool: Boolean,
      trueFun: Function,//确定 触发函数
      defaultIndex:  {
        type: Array,
        default: []
      },//默认列
      minYear:Number,//最小年份
      maxYear:Number,//最大年份
      ascMBool: Boolean,//升序还是倒叙月份
    },

    data() {
      return {
        columns:[],
        maxMonth:12,
        cYear:'',
        cMonth:'',
        mValue:null,
      }
    },
		methods: {
      pickerClose(){
        this.$emit("setObj", "setShowMS", false);
      },

      LoadEx() {
        this.$emit("setObj", "setExBoolMS", true);//已加载

        //初始化时间列
        this.columns = [];
        let myDate = new Date();
        this.cYear = this.p(myDate.getFullYear());//当前年份
        this.cMonth = this.p(myDate.getMonth() + 1);//当前月份

        let minY = tools.isNull(this.minYear)?this.minYear:2010;
        let maxY = '';
        if(tools.isNull(this.maxYear)){
          maxY = this.maxYear;
        }else {
          maxY = this.cYear;
        }
        this.$emit("setObj", "setMaxYear", maxY);
        let columns = [];
        let c1 = [];
        for (let i = maxY; i >= minY; i--) {
          c1.push(''+i)
        }
        let columnData =[];
        let maxM = this.cMonth;
        if(this.ascMBool){
          for (let i = 1; i <= maxM; i++) {
            columnData.push(this.p(i));
          }
        }else {
          for (let i = maxM ; i >= 1; i--) {
            columnData.push(this.p(i));
          }
        }

        columns.push(c1);
        columns.push(columnData);
        this.columns = columns;
      },
      p(s) {
        return s < 10 && (''+s+'').length==1 ? '0' + s : s;
      },

      // 回调参数为包含columnIndex、value、values
      confirm(e) {
        //console.log('confirm', e)
        let mValue = e.value[0]+'-'+e.value[1];
        this.$emit("setObj", "setRecordTime", mValue);
        this.$emit("setObj", "setShowMS", false);
      },
      changeHandler(e) {
        const {
          columnIndex,
          value,
          values, // values为当前变化列的数组内容
          index,
          // 微信小程序无法将picker实例传出来，只能通过ref操作
          picker = this.$refs.uPicker
        } = e
        // 当第一列值发生变化时，变化第二列(后一列)对应的选项
        if (columnIndex === 0) {
          // picker为选择器this实例，变化第二列对应的选项
          let maxM = this.maxMonth;
          if( tools.isNull(this.maxYear) && this.cYear==value[0]){
            maxM = this.cMonth;
          }
          let columnData =[];
          if(this.ascMBool){
            for (let i = 1; i <= maxM; i++) {
              columnData.push(this.p(i));
            }
          }else {
            for (let i = maxM ; i >= 1; i--) {
              columnData.push(this.p(i));
            }
          }
          picker.setColumnValues(1, columnData);
        }
      },


		}
	}
</script>


