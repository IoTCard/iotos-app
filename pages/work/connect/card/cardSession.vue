<template>
	<view  style="background-color: white;padding: 0px 5px;min-height: 100ex;">


		<u-search @clickIcon="clickIcon" v-model="value"  @search="findICCID" placeholder="ICCID | MSISDN | IMSI" :showAction="false"></u-search>

    <u-row   style="margin: 10px 10px 0px;" gutter="10">
      <u-col span="6">
        <u-button plain size="mini" type="primary" @click="findICCID" :text="this.$t('common.refresh')" ></u-button>
      </u-col>
      <u-col span="6" >
        <u-button plain size="mini" type="primary" @click="copyOnlineStatus" :text="this.$t('common.copy')" ></u-button>
      </u-col>
    </u-row>

    <u--text v-if="tools.isNull(tableSession) && tableSession.length>0" style="margin: 10px;" :text="onlineTitle"></u--text>

    <u-empty v-if="show_empty" icon="/static/images/icon/data.png" > </u-empty>
    <div style="margin-left: 10px;">
      <div v-for="(item, index) in tableSession">
        <u-row  style="margin: 10px 0px;" gutter="10">
          <u-col span="3">
            {{ tools.isNull(item.label1)?item.label1+"：":''}}
          </u-col>
          <u-col span="6">
            {{ item.value1 }}
          </u-col>
        </u-row>
        <u-line></u-line>
      </div>
    </div>



	</view>
</template>

<script>
	import tools from "../../../../utils/iotos/tools";
  import {
    findCard,
    synSession
  } from "@/api/iotos/connect/card";

  export default {
    mounted() {
      //const query = this.$route.query;
      //初始化 时间选择


      //加载 oneLink在线状态
      if (tools.isNull(uni.getStorageSync('onelinkSessionStatusOptions'))) {
        this.onelinkSessionStatusOptions = uni.getStorageSync('onelinkSessionStatusOptions');
      } else {
        this.getDicts("onelink_session_status").then(response => {
          uni.setStorageSync('onelinkSessionStatusOptions',response.data);
          this.onelinkSessionStatusOptions = uni.getStorageSync('onelinkSessionStatusOptions');
        });
      }
      //加载 onelink_rat接入方式
      if (tools.isNull(uni.getStorageSync('onelinkRatTypeOptions'))) {
        this.onelinkRatTypeOptions = uni.getStorageSync('onelinkRatTypeOptions');
      } else {
        this.getDicts("onelink_rat_type").then(response => {
          uni.setStorageSync('onelinkRatTypeOptions',response.data);
          this.onelinkRatTypeOptions = uni.getStorageSync('onelinkRatTypeOptions');
        });
      }
      if (tools.isNull(uni.getStorageSync('findICCID'))) {
        this.value = uni.getStorageSync('findICCID');
        this.findICCID();
      }
    },
		data() {
			return {
        tools:tools,
        onlineTitle: this.$t("cardInfoModule.cardSession")+' ('+this.$t("common.synchronization")+')',
        value:'',
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
        maxYear:null,
        recordTime:'',
        tableSession:[],
        sessionLie:[],//session 列
        onelinkSessionStatusOptions:[],
        onelinkRatTypeOptions:[],
        headquartersBool: false,//内部人员

      }
		},
		methods: {

      //通道变更时适配 不同的通道
      channelTemplateChange(channelTemplate){
        let sessionLie = [];
        if(channelTemplate=='oneLink_ECV5'){
          sessionLie.push({label:this.$t('cardInfoModule.oneLink_ECV5.label_0'),prop:'apn_id',width:'80px'});
          sessionLie.push({label:this.$t('cardInfoModule.oneLink_ECV5.label_1'),prop:'status',width:'80px',options:this.onelinkSessionStatusOptions});
          sessionLie.push({label:this.$t('cardInfoModule.oneLink_ECV5.label_2'),prop:'ip',width:''});
          sessionLie.push({label:this.$t('cardInfoModule.oneLink_ECV5.label_3'),prop:'ipv6_prefix',width:''});
          sessionLie.push({label:this.$t('cardInfoModule.oneLink_ECV5.label_4'),prop:'ipv6',width:''});
          sessionLie.push({label:this.$t('cardInfoModule.oneLink_ECV5.label_5'),prop:'create_date',width:''});
          sessionLie.push({label:this.$t('cardInfoModule.oneLink_ECV5.label_6'),prop:'rat',width:'80px',options:this.onelinkRatTypeOptions});
          sessionLie.push({label:this.$t('cardInfoModule.oneLink_ECV5.label_7'),prop:'create_time',width:''});
        }
        this.sessionLie = sessionLie;
      },



      //复制实时会话信息
      copyOnlineStatus(){
        let copyText = "";
        for (let i = 0; i < this.tableSession.length; i++) {
          let obj = this.tableSession[i];
          let value1 = tools.getVal(obj.value1);
          copyText += obj.label1+" : "+value1;
          copyText +="\n";
        }
        let _this = this;
        tools.copyThat(copyText,_this);
      },



      //会话信息 更新
      getOnlineStatus() {
        this.tableSession = [];//重置数据
        let map = {};
        map.iccid = this.sel.iccid;
        let pwdStr = tools.encryptSy(map);
        synSession(pwdStr).then(res => {
          let jsonObj = JSON.parse(tools.Decrypt(res));
          this.headquartersBool = jsonObj.deptId=='100'?true:false;
          if (jsonObj.code == 200 && jsonObj.data.retuenList!=null && jsonObj.data.retuenList[0]!=null) {
            let retuenList = jsonObj.data.retuenList;
            let obj = retuenList[0].rData;
            let map1 = {},map2 = {},map3 = {},map4 = {},map5 = {},map6 = {};
            let template = jsonObj.data.template;
            let createDate = '';
            if (template == "oneLink_ECV5" ) {
              map1.value1 = tools.getDkeyValue(this.onelinkSessionStatusOptions, obj.status);
              map2.value1 = tools.getDkeyValue(this.onelinkRatTypeOptions, obj.rat);
              map3.value1 = tools.getVal(obj.apnId);
              map4.value1 = tools.getVal(obj.ip);
              map5.value1 = tools.getVal(obj.ipv6);
              map6.value1 = tools.getVal(obj.ipv6Prefix);
              createDate = tools.getVal(obj.createDate);
            }
            map1.label1 = this.$t("cardInfoModule.session.onlineStatus");
            map2.label1 = this.$t("cardInfoModule.session.accessMethod");
            map3.label1 = "APN";
            map4.label1 = this.$t("cardInfoModule.session.iPAddress");
            map5.label1 = "ipv6";
            map6.label1 = "ipv6Prefix";
            this.tableSession.push(map1);
            this.tableSession.push(map2);
            this.tableSession.push(map3);
            this.tableSession.push(map4);
            this.tableSession.push(map5);
            this.tableSession.push(map6);

            if (tools.isNull(createDate)) {
              this.onlineTitle = this.$t("cardInfoModule.cardSession")+' ('+this.$t("common.sessionCreationTime")+' : ' + createDate + ')';
            } else {
              this.onlineTitle = this.$t("cardInfoModule.cardSession")+' ('+this.$t("common.synchronization")+')';
            }
          } else {
            let map1 = {};
            map1.label1 = "";
            map1.label2 = "";
            map1.value2 = "";
            if (this.headquartersBool) {
              map1.label2 = this.$t("cardInfoModule.session.hint1");
              map1.value2 = this.$t("cardInfoModule.session.hint2");
            }else{
              jsonObj.msg = this.$t("cardInfoModule.session.error1");
            }
            this.show_empty = true;
            map1.value1 = jsonObj.msg;
            this.tableSession.push(map1);
            this.onlineTitle = this.$t("cardInfoModule.cardSession")+' ('+this.$t("common.synced")+')';
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
                this.getOnlineStatus();
              }else {
                this.show_empty = true;
              }
            } else {
              this.$modal.showToast(jsonObj.msg);
            }


          });

        }
      },


		}
	}
</script>


