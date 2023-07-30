<template>
	<view  style="background-color: white;padding: 0px 5px;min-height: 100ex;">

    <u--form
        labelPosition="left"
        :model="subForm"
        labelWidth="auto"
    >
      <u-form-item borderBottom >
        <u--textarea v-model="subForm.iccids" maxlength="2200" @blur="vICCIDS" :placeholder="this.$t('cardApiBusinessHandling.tip.textareaP')" count ></u--textarea>
      </u-form-item>

      <u-subsection :list="list" mode="subsection" :current="curNow" @change="sectionChange"></u-subsection>

      <u-form-item v-if="curNow==0"  :label="lgCode.stop+'：'" borderBottom >
        <u-radio-group v-model="subForm.w_openStop" placement="row">
          <u-radio
              v-for="(item, index) in cardOpenStopOptions"
              :customStyle="{marginLeft:index>0?'20px':''}"
              :key="item.dictValue"
              :label="item.dictLabel"
              :name="item.dictValue"
          >
          </u-radio>
        </u-radio-group>
      </u-form-item>

      <u-form-item v-if="curNow==0" :label="lgCode.shutdown+'：'" borderBottom >
        <u-radio-group v-model="subForm.w_openClose" placement="row">
          <u-radio
              v-for="(item, index) in cardOpenCloseOptions"
              :customStyle="{marginLeft:index>0?'20px':''}"
              :key="item.dictValue"
              :label="item.dictLabel"
              :name="item.dictValue"
          >
          </u-radio>
        </u-radio-group>
      </u-form-item>

      <u-form-item v-if="curNow==1" :label="lgCode.gprsReset+'：'" borderBottom >
        <u-radio-group v-model="subForm.w_reset" placement="row">
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

      <u-form-item v-if="curNow==2" :label="lgCode.flexibleChange+'：'" borderBottom >
        <u--input    @focus="show_sel=true" border="bottom"  v-model="flexibleChangeOptions[subForm.fIndex].dictLabel" ></u--input>

      </u-form-item>

      <u-button plain type="primary" v-if="submitFileFormBtn" @click="submitFileForm" :text="this.$t('common.sure')"></u-button>

    </u--form>
    <u-picker :show="show_sel" @cancel="show_sel=false" @close="show_sel=false" closeOnClickOverlay :columns="[flexibleChangeOptions]" @confirm="selFlexibleChange" keyName="dictLabel"></u-picker>



	</view>
</template>

<script>
	import tools from "../../../../utils/iotos/tools";
  import {
    textFieldHandling,
  } from "@/api/iotos/connect/card";
  export default {

    mounted() {
     /* const query = this.$route.query;
      tools.showToast(this,query)*/
      //加载 是否
      if (tools.isNull(uni.getStorageSync('flexibleChangeOptions')) ) {
        this.flexibleChangeOptions = uni.getStorageSync('flexibleChangeOptions');
      } else {
        this.getDicts("card_flexiblechange").then(response => {
          uni.setStorageSync('flexibleChangeOptions',response.data);
          this.flexibleChangeOptions = uni.getStorageSync('flexibleChangeOptions');
        });
      }
      //加载 断开网操作
      if (tools.isNull(uni.getStorageSync('cardOpenCloseOptions')) ) {
        this.cardOpenCloseOptions = uni.getStorageSync('cardOpenCloseOptions');
      } else {
        this.getDicts("card_openclose").then(response => {
          uni.setStorageSync('cardOpenCloseOptions',response.data);
          this.cardOpenCloseOptions = uni.getStorageSync('cardOpenCloseOptions');
        });
      }
      //加载 停复机操作
      if (tools.isNull(uni.getStorageSync('cardOpenStopOptions')) ) {
        this.cardOpenStopOptions = uni.getStorageSync('cardOpenStopOptions');
      } else {
        this.getDicts("card_openstop").then(response => {
          uni.setStorageSync('cardOpenStopOptions',response.data);
          this.cardOpenStopOptions = uni.getStorageSync('cardOpenStopOptions');
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
        this.subForm.iccids = uni.getStorageSync('findICCID');
      }
    },
		data() {
			return {
        show_sel:false,
        lgCode:{
          notNull:this.$t('common.notNull'),
          title:this.$t('cardApiBusinessHandling.title'),
          openClose:this.$t('cardApiBusinessHandling.openClose'),
          gprsReset:this.$t('cardApiBusinessHandling.gprsReset'),
          shutdown:this.$t('cardApiBusinessHandling.shutdown'),
          stop:this.$t('cardApiBusinessHandling.stop'),
          flexibleChange:this.$t('cardApiBusinessHandling.flexibleChange'),

        },
        cardOpenStopOptions:[],
        cardOpenCloseOptions:[],
        flexibleChangeOptions:[],//灵活变更

        list: [this.$t('cardApiBusinessHandling.openClose'), this.$t('cardApiBusinessHandling.gprsReset'),this.$t('cardApiBusinessHandling.flexibleChange')],
        curNow: 0,
        subForm:{
          w_openStop:'0',
          w_openClose:'0',
          w_reset:'0',
          flexibleChange:'0',
          fIndex:'0',
          iccids:'',
        },
        cardStatusShowOptions:[],
        whetherOptions:[],
        value: '',
        show_empty: false,
        sel:{//选中数据
          c_no:''
        },
        submitFileFormBtn:true,//导入 btn

      }
		},
		methods: {

      //下拉选中
      selFlexibleChange(e){
        this.subForm.fIndex = e.indexs[0];
        this.subForm.flexibleChange = e.value[0].dictValue;
        this.show_sel = false;
      },
      sectionChange(index) {
        this.curNow = index;
      },
      vICCIDS(){
        this.subForm.iccids = this.subForm.iccids.replace(/[^a-zA-Z0-9\n]/g, '');
      },
      // 加密数据
      getPwdStr(){
        let map = {};
        let activeName = '';
        switch (this.curNow) {
          case 0:
            map.w_openStop = this.subForm.w_openStop;
            map.w_openClose = this.subForm.w_openClose;
            activeName = 'openClose';
            break;
          case 1:
            map.w_reset = this.subForm.w_reset;
            activeName = 'gprsReset';
            break;
          case 2:
            map.flexibleChange = this.subForm.flexibleChange;
            activeName = 'flexibleChange';
            break;
        }
        map.activeName = activeName;
        return map;
      },
      // 提交上传文件
      submitFileForm() {
        let _this = this;
        let sMap = this.getPwdStr();
        let bool = false;
        switch (this.curNow) {
          case 0:
            this.subForm.w_openStop;
            this.subForm.w_openClose;
            if(this.subForm.w_openStop!=0 || this.subForm.w_openClose!=0){
              bool = true;
            }else {
              tools.open(_this,this.$t("cardApiBusinessHandling.rs.openClose"));
            }
            break;
          case 1:
            if(this.subForm.w_reset!=0){
              bool = true;
            }else {
              tools.open(_this,this.$t("cardApiBusinessHandling.rs.gprsReset"));
            }
            break;
          case 2:
            if(tools.VerificationsText(_this, this.subForm.flexibleChange, this.$t("cardApiBusinessHandling.rs.flexibleChange")) == true ){
              bool = true;
            }
            break;
        }
        if(bool){
            if(tools.VerificationsText(_this, this.subForm.iccids, this.$t("cardApiBusinessHandling.rs.iccids"))){
              let onList = tools.textareaGet(_this.subForm.iccids);
              const newList = [...new Set(onList)];
              let repeatCount = onList.length>newList.length?tools.NumberSub(onList.length,newList.length):0;
              if(repeatCount>0){
                tools.showToast(_this,this.$t("common.repeat")+" [ "+repeatCount+" ] "+this.$t("common.articleData"));
              }
              if(tools.VerificationsText(_this, newList, this.$t("cardApiBusinessHandling.rs.iccids"))){
                let iccidList =[];
                for (let i = 0; i < newList.length; i++) {
                  iccidList.push({"iccid":newList[i]});
                }
                sMap.iccidList = iccidList;
                let pwdStr = tools.encryptSy(sMap);
                tools.openAsk(_this,'warning', this.$t("cardApiBusinessHandling.ask.txUpd"), this.subTextField,pwdStr, null,null);
              }
            }

        }
      },
      //文本域操作提交
      subTextField(pwdStr){
        this.submitFileFormBtn = false;
        textFieldHandling(pwdStr).then(response => {
          let jsonObj = JSON.parse(tools.Decrypt(response));
          let msg = jsonObj.msg;
          if (jsonObj.code == 200) {
            tools.showToast(this,msg);
            this.submitFileFormBtn = true;
            this.$emit("setObj", "setApiBH_show", false);//成功后 关闭界面
          } else {
            tools.showToast(this,msg);
          }
        })
      },

		}
	}
</script>


