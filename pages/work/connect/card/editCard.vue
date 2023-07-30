<template>
	<view  >
    <u--form
        labelPosition="left"
        :model="updForm"
        labelWidth="auto"
    >
      <u-form-item
          :label="this.$t('card_index.updForm.customize_grouping')"
          borderBottom
      >
        <u--input
            v-model="updForm.customize_grouping" :placeholder="this.$t('common.pleaseEnter')" ></u--input>
      </u-form-item>

      <u-form-item
          :label="this.$t('card_index.updForm.deliver_date')"
          borderBottom
      >
        <u--input
            @focus="showDeliveryDate"
            v-model="updForm.deliver_date"
            :placeholder="this.$t('common.pleaseEnter')"
        ></u--input>
      </u-form-item>

      <u-form-item
          :label="this.$t('card_index.updForm.remarks')"
          borderBottom
      >
        <u--textarea  v-model="updForm.remarks" :placeholder="this.$t('common.pleaseEnter')" count ></u--textarea>
      </u-form-item>
      <u-form-item
          :label="this.$t('card_index.updForm.updateNotFilled')"
      >
        <u-radio-group
            v-model="updForm.updateNotFilled"
            placement="row"
        >
          <u-radio
              v-for="(item, index) in whetherOptions"
              :customStyle="{marginLeft:index>0?'20px':''}"
              :key="item.dictValue"
              :label="item.dictLabel"
              :name="item.dictValue"
          >
          </u-radio>
        </u-radio-group>
      </u-form-item>


      <u-calendar  :defaultDate="defaultDeliveryDate" :show="show_delivery_date" :showTitle="false"
                   :closeOnClickOverlay="true"
                   :maxDate="calendar.maxDate"
                   :minDate="calendar.minDate"
                   :monthNum="calendar.monthNum"
                   @close="show_delivery_date=false" @confirm="setDelivery_date"></u-calendar>
    </u--form>

	</view>
</template>

<script>
	import tools from "../../../../utils/iotos/tools";
  export default {
    props: {
      setObj: Function,//父组件赋值 函数
      edit_show: Boolean,//当前界面是否显示
      wUpdBatch: Boolean,//当前界面是否显示
      whetherOptions: Array,//是否
      updForm: Object,
    },
    mounted: function () {
      this.chooseTimed();
    },
		data() {
			return {
        tools:tools,
        defaultDeliveryDate:[],
        show_delivery_date: false,
        calendar: {
          minDate: '',
          maxDate: '',
          defaultDate: '',
          monthNum: 13,
        },


      }
		},
		methods: {
      chooseTimed() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month <= 9) {
          month = '0' + month;
        }
        if (day <= 9) {
          day = '0' + day;
        }
        let minyear = year - 1;
        this.calendar.minDate = minyear + '-' + month + '-' + day;
        this.calendar.maxDate = year + '-' + month + '-' + day;
        this.calendar.defaultDate = year + '-' + month + '-' + day;
      },
      showDeliveryDate(){
        this.show_delivery_date = true;
        if(tools.isNull(this.updForm.deliver_date)){
          this.defaultDeliveryDate = [];
          this.defaultDeliveryDate.push(this.updForm.deliver_date);
        }else {
          this.defaultDeliveryDate = [tools.gitDataCurrent()];
        }
      },

      setDelivery_date(e){
        if(tools.isNull(e)){
          this.updForm.deliver_date = e[0];
        }
        this.show_delivery_date = false;
      },

		}
	}
</script>

