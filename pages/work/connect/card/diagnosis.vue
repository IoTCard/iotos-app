<template>
	<view  style="background-color: white;padding: 0px 5px;min-height: 100ex;">
		

		<u-search @clickIcon="clickIcon" v-model="value"  @search="diagnosis" placeholder="ICCID | MSISDN | IMSI" :showAction="false"></u-search>
<!--
    <u-button @click="diagnosis" :disabled="diagnosisLoading"  icon="search" plain style="width: 80%;margin: 10px auto;" type="primary" size="small" :text="this.$t('diagnosis.oneDiagnosis')"></u-button>
-->

    <u-empty v-if="show_empty" icon="/static/images/icon/data.png" > </u-empty>
    <dsEcV5 v-show="show_tabs" :show_Details="show_tabs"  :v-if="cnTemplate=='oneLink_ECV5'" ref="dsEcV5" @setObj="setObj"  :dsEditexecute="dsEditexecute" :sel="sel" />





	</view>
</template>

<script>
	import tools from "../../../../utils/iotos/tools";
  import dsEcV5 from "./dsEcv5";
  import {
    findCard,
  } from "@/api/iotos/connect/card";
  export default {
    components: {
      dsEcV5,
    },
    mounted() {
      //const query = this.$route.query;

      //加载 卡状态
      if (tools.isNull(uni.getStorageSync('cardStatusShowOptions'))) {
        this.cardStatusShowOptions = uni.getStorageSync('cardStatusShowOptions');
      } else {
        this.getDicts("card_status_show_id").then(response => {
          uni.setStorageSync('cardStatusShowOptions',response.data);
          this.cardStatusShowOptions = uni.getStorageSync('cardStatusShowOptions');
        });
      }
      //加载 是否
      if (tools.isNull(uni.getStorageSync('whetherOptions')) ) {
        this.whetherOptions = uni.getStorageSync('whetherOptions');
      } else {
        this.getDicts("iotos_whether").then(response => {
          uni.setStorageSync('whetherOptions',response.data);
          this.whetherOptions = uni.getStorageSync('whetherOptions');
        });
      }
      if (tools.isNull(uni.getStorageSync('findICCID'))) {
        this.value = uni.getStorageSync('findICCID');
        this.diagnosis();//开始诊断
      }
    },
		data() {
			return {
        cardStatusShowOptions:[],
        whetherOptions:[],
        value: '',
        show_empty: false,
        show_tabs: false,
        cnTemplate: '',
        diagnosisLoading: false,
        dsEditexecute: true,//信息拓展模块 是否已加载
        sel:{//选中数据
          c_no:''
        },
        lgCode:{
          notNull:this.$t('common.notNull'),
        },
      }
		},
		methods: {

      clickIcon(){
        this.diagnosis();
      },
      diagnosis(){

        let _this = this;
        if(tools.VerificationsText(_this, _this.value, this.$t("diagnosis.rs.value")+this.lgCode.notNull) == true){
          this.diagnosisLoading = true;
          this.show_empty = false;
          this.show_tabs = false;


          let map = {};
          map.type = "0";
          map.value = this.value;
          let pwdStr = tools.encryptSy(map);
          findCard(pwdStr).then(response => {
            let jsonObj = JSON.parse(tools.Decrypt(response));
            if (jsonObj.code == 200) {
              let row = jsonObj.data;
              if(tools.isNull(row)){
                this.dsEditexecute = false;
                this.show_tabs = true;

                this.sel.iccid = row.iccid;
                this.sel.c_no = row.c_no;
                this.sel.c_left = row.c_left;
                this.sel.c_used = row.c_used;
                this.sel.channel_id = row.channel_id;
              }else {
                this.show_empty = true;
                this.diagnosisLoading = false;
              }
            } else {
              this.$modal.showToast(jsonObj.msg);
            }


          });

        }
      },
      //提供给子组件 修改父组件属性
      setObj(Key, obj) {
        //console.log(obj);
        switch (Key) {
          case 'setDsEditexecute':
            this.dsEditexecute = obj;//设置  API诊断  是否已经加载
            break;
          case 'setCnTemplate':
            this.cnTemplate = obj;//设置  通道模板
            break;
          case 'setDiagnosisLoading':
            this.diagnosisLoading = obj;//更新 只读状态
            break;
        }
      },

		}
	}
</script>


