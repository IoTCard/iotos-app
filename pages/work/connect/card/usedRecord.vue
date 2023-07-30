<template>
	<view  style="background-color: white;padding: 0px 5px;min-height: 100ex;">
		

		<u-search @clickIcon="clickIcon" v-model="value"  @search="findICCID" placeholder="ICCID | MSISDN | IMSI" :showAction="false"></u-search>

    <u-row   style="margin: 10px 10px 0px;" gutter="10">

      <u-col span="3">
        <u--input :placeholder="this.$t('cardInfoModule.recordTime')"  readonly
            border="bottom "  v-model="recordTime"   ></u--input>
      </u-col>
      <u-col span="3">
        <u-button plain size="mini" type="primary" @click="show_ms=true,exBool_ms=false" :text="this.$t('cardInfoModule.recordTime')" ></u-button>
      </u-col>
      <u-col span="3">
        <u-button plain size="mini" type="primary" @click="findICCID" :text="this.$t('cardInfoModule.last30Days')" ></u-button>
      </u-col>
      <u-col span="3" >
        <u-button plain size="mini" type="primary" @click="copyData" :text="this.$t('common.copy')" ></u-button>
      </u-col>
    </u-row>

    <monthSelector ref="monthSelector" :show="show_ms" :exBool="exBool_ms" @setObj="setObj"
                   :defaultIndex="defualtIndex" :maxYear="maxYear"  :ascMBool="false" ></monthSelector>

    <u-empty v-if="show_empty" icon="/static/images/icon/data.png" > </u-empty>

    <u-row  v-for="(item, index) in dataList" style="margin: 10px 10px 0px;" gutter="10">
      <u-col span="3">
        {{lgCode.MMdd+" : "+item.MMdd}}
      </u-col>
      <u-col span="4.5">
        {{lgCode.day_used+" : "+item.reveal_day_used }}
      </u-col>
      <u-col >
        {{ lgCode.month_used+" : "+item.reveal_month_used }}
      </u-col>
    </u-row>

	</view>
</template>

<script>
	import tools from "../../../../utils/iotos/tools";
  import {
    findCard,
  } from "@/api/iotos/connect/card";
  import {
    listUsedRecord
  } from "@/api/iotos/connect/usedRecord";
  import monthSelector from '../../../common/monthSelector'

  export default {
    components: {
      monthSelector,
    },
    mounted() {
     // const query = this.$route.query;
      //初始化 时间选择


      if (tools.isNull(uni.getStorageSync('findICCID'))) {
        this.value = uni.getStorageSync('findICCID');
        this.findICCID();//开始诊断
      }
    },
		data() {
			return {
        show_empty:false,
        show_ms:false,
        exBool_ms:true,
        defualtIndex:[0,0],
        lgCode:{
          notNull:this.$t('common.notNull'),
          MMdd:this.$t('usedRecord.MMdd'),
          month_used:this.$t('usedRecord.month_used'),
          day_used:this.$t('usedRecord.day_used'),
          timeFormatNo:this.$t('common.timeFormatNo'),

        },
        sel:{//选中数据
          c_no:''
        },
        value:'',
        maxYear:null,
        recordTime:'',
        dataList:[],
      }
		},
		methods: {
      copyData(){
        if(tools.isNull(this.dataList) && this.dataList.length>0){
          let copyText = "";
          for (let i = 0; i < this.dataList.length; i++) {
            let obj = this.dataList[i];
            copyText += this.lgCode.MMdd+" : "+tools.getVal(obj.MMdd)+",\t"+this.lgCode.day_used+" : "+tools.getVal(obj.reveal_day_used)+",\t"+this.lgCode.month_used+" : "+tools.getVal(obj.reveal_month_used);
            copyText +="\n";
          }
          let _this = this;
          tools.copyThat(copyText,_this);
        }else {
          tools.showToast(this,this.$t("common.noDataFound"));
        }
      },

      //近30 天 用量
      last30Days(){
        this.recordTime = '';
        this.loadUsedRecord(tools.gitDatayyyyMM());//默认当月
      },
      //切换
      changeRecordTime(){
        if(tools.isNull(this.recordTime)){
          let bool = true;
          if(this.recordTime.indexOf("-")==-1){
            bool = false;
          }
          if(this.recordTime.length!=7){
            bool = false;
          }
          if(bool){
            this.loadUsedRecord(this.recordTime);
          }else {
            tools.showToast(this,this.lgCode.timeFormatNo);
          }
        }
      },
      //查询用量记录
      loadUsedRecord(record_date){
        this.show_empty = false;
        this.dataList = [];
        let str = record_date.split("-");
        let yyyyMM = str[0]+str[1];
        let map = {};
        map.iccid = this.sel.iccid;
        map.record_date = record_date;
        map.yyyyMM = yyyyMM;
        map.pageNum = 1;
        map.pageSize = 31;
        //console.log(map)
        let pwdStr = tools.encryptSy(map);
        listUsedRecord(pwdStr).then(res => {
          let jsonObj = JSON.parse(tools.Decrypt(res));
          //console.log(jsonObj)
          if (jsonObj.code == 200) {
            let dataList = jsonObj.data.data;
            let total = jsonObj.data.Pu.rowCount;
            if(tools.isNull(dataList) && dataList.length>0){
              //倒敘排列
              this.dataList = dataList.slice().reverse();;
            }else {
              this.show_empty = true;
              tools.showToast(this,this.$t("common.noDataFound"));
            }
          } else {
            tools.showToast(this,jsonObj.msg);
          }
        })
      },



      clickIcon(){
        this.findICCID();
      },
      findICCID(){
        let _this = this;
        if(tools.VerificationsText(_this, _this.value, this.$t("diagnosis.rs.value")+this.lgCode.notNull) == true){
          this.show_empty = false;
          let map = {};
          map.type = "0";
          map.value = this.value;
          let pwdStr = tools.encryptSy(map);
          findCard(pwdStr).then(response => {
            let jsonObj = JSON.parse(tools.Decrypt(response));
            if (jsonObj.code == 200) {
              let row = jsonObj.data;
              if(tools.isNull(row)){

                this.sel.iccid = row.iccid;
                this.sel.c_no = row.c_no;
                this.sel.c_left = row.c_left;
                this.sel.c_used = row.c_used;
                this.sel.channel_id = row.channel_id;
                this.last30Days();
              }else {
                this.show_empty = true;
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
          case 'setCnTemplate':
            this.cnTemplate = obj;//设置  通道模板
            break;
          case 'setDiagnosisLoading':
            this.findICCIDLoading = obj;//更新 只读状态
            break;
          case 'setRecordTime':
            this.recordTime = obj;//更新 记录日期
            this.changeRecordTime();
            break;
          case 'setMaxYear':
            this.maxYear = obj;//更新 最大年份
            break;
          case 'setExBoolMS':
            this.exBool_ms = obj;//日期选择已加载
            break;
          case 'setShowMS':
            this.show_ms = obj;//日期选择 显示
            break;

        }
      },

		}
	}
</script>


