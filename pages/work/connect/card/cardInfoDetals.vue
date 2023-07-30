<template>
	<view  style="background-color: white;padding: 0px 5px;min-height: 100ex;">
		

		<u-search @clickIcon="findCardOne" v-model="value"  @search="findCardOne" placeholder="ICCID | MSISDN | IMSI" :showAction="false"></u-search>
    <u-empty v-if="show_empty" icon="/static/images/icon/data.png" > </u-empty>


    <u-row v-if="tablefrom.length>0" style="margin-top: 10px;" gutter="10">
      <u-col span="3">
        <u-button plain size="mini" type="primary" @click="oneDiagnosis" :text="this.$t('diagnosis.oneDiagnosis')"></u-button>
      </u-col>
      <u-col span="3">
        <u-button plain size="mini" @click="goTo" type="primary" :text="this.$t('common.workIndex')"></u-button>
      </u-col>
      <u-col span="3">
        <u-button plain size="mini" type="primary" @click="copyCardInfo" :text="this.$t('cardInfoDetails.copyCardInfo')"></u-button>
      </u-col>
      <u-col span="3">
        <u-button plain size="mini" @click="edit_show=true" type="primary" :text="this.$t('common.edie')"></u-button>
      </u-col>
    </u-row>

    <u-row  v-for="(item, index) in tablefrom" style="margin-top: 10px;" gutter="10">
      <u-col span="6">
        {{ item.label1+"："+item.value1 }}
      </u-col>
      <u-col span="6">
        {{ item.label2+"："+item.value2 }}
      </u-col>
    </u-row>
    <u-row  v-for="(item, index) in tablefrom_1" style="margin-top: 10px;" gutter="10">
      <u-col span="12">
        {{ item.label1+"："+item.value1 }}
      </u-col>
    </u-row>

    <u-modal :show="edit_show" :showCancelButton="true" @confirm="edidOn" @cancel="edit_show=false" @close="edit_show=false">
       <editCard ref="editCard" @setObj="setObj"  :edit_show="edit_show"
              :whetherOptions="whetherOptions" :updForm="updForm" ></editCard>

    </u-modal>

   <confirm v-if="ask_show" :ask_show="ask_show"  @setObj="setObj" :message="message" @trueFun="editCardSub" :trunPar="trunPar"  ></confirm>

    <u-notify ref="uNotify" ></u-notify>

  </view>
</template>

<script>
	import tools from "../../../../utils/iotos/tools";
  import {getDeptName} from "@/api/system/dept";
  import {
    findCard,
    getCard ,
    editCardPublic
  } from "@/api/iotos/connect/card";
  import editCard from "./editCard";
  import confirm from "../../../common/confirm";

  export default {
    components: {
      editCard,
      confirm,
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
      //加载 卡状态描述
      if (tools.isNull(uni.getStorageSync('cardStatusOptions')) ) {
        this.cardStatusOptions = uni.getStorageSync('cardStatusOptions');
      } else {
        this.getDicts("card_status_id").then(response => {
          uni.setStorageSync('cardStatusOptions',response.data);
          this.cardStatusOptions = uni.getStorageSync('cardStatusOptions');
        });
      }
      //加载 断开网状态
      if (tools.isNull(uni.getStorageSync('cardConnectionStatusOptions')) ) {
        this.cardConnectionStatusOptions = uni.getStorageSync('cardConnectionStatusOptions');
      } else {
        this.getDicts("card_connection_status").then(response => {
          uni.setStorageSync('cardConnectionStatusOptions',response.data);
          this.cardConnectionStatusOptions = uni.getStorageSync('cardConnectionStatusOptions');
        });
      }
      //加载 卡网络类型
      if (tools.isNull(uni.getStorageSync('cardNetworkTypeOptions')) ) {
        this.cardNetworkTypeOptions = uni.getStorageSync('cardNetworkTypeOptions');
      } else {
        this.getDicts("card_network_type").then(response => {
          uni.setStorageSync('cardNetworkTypeOptions',response.data);
          this.cardNetworkTypeOptions = uni.getStorageSync('cardNetworkTypeOptions');
        });
      }
      //加载 卡类型
      if (tools.isNull(uni.getStorageSync('cardTypeOptions')) ) {
        this.cardTypeOptions = uni.getStorageSync('cardTypeOptions');
      } else {
        this.getDicts("card_type").then(response => {
          uni.setStorageSync('cardTypeOptions',response.data);
          this.cardTypeOptions = uni.getStorageSync('cardTypeOptions');
        });
      }
      //加载 企业名称
      if (tools.isNull(uni.getStorageSync('deptsOptions')) ) {
        this.deptsOptions = uni.getStorageSync('deptsOptions');
      } else {
        getDeptName().then(response => {
          let jsonObj = JSON.parse(tools.Decrypt(response));
          uni.setStorageSync('deptsOptions',jsonObj.data);
          this.deptsOptions = uni.getStorageSync('deptsOptions');
        });
      }
      //加载 通道
      if (tools.isNull(uni.getStorageSync('channelOptions')) ) {
        this.channelOptions = uni.getStorageSync('channelOptions');
      } else {
        let pwdStr = tools.encryptSy({});
        this.getNameOpen(pwdStr).then(response => {
          let jsonObj = JSON.parse(tools.Decrypt(response));
          uni.setStorageSync('channelOptions',jsonObj.data);
          this.channelOptions = uni.getStorageSync('channelOptions');
        });
      }

      if (tools.isNull(uni.getStorageSync('findICCID'))) {
        this.value = uni.getStorageSync('findICCID');
        this.findCardOne();//开始诊断
      }

    },
		data() {
			return {
        ask_show:false,
        message:'',
        trunPar:null,
        falsePar:null,

        updForm: {
          remarks:'',
          updateNotFilled:'0',
          deliver_date:null,
          imei:null,
          customize_grouping:null,
          iccid:null,
        },
        tools:tools,
        deptsOptions:[],
        channelOptions:[],
        cardTypeOptions:[],
        cardNetworkTypeOptions:[],
        cardConnectionStatusOptions:[],
        cardStatusOptions:[],
        cardStatusShowOptions:[],
        whetherOptions:[],
        value: '',
        show_empty: false,
        show_tabs: false,
        edit_show: false,
        cnTemplate: '',
        diagnosisLoading: false,
        dsEditexecute: true,//信息拓展模块 是否已加载
        sel:{//选中数据
          c_no:''
        },
        lgCode:{
          notNull:this.$t('common.notNull'),
        },
        tablefrom:[],
        tablefrom_1:[],
      }
		},
		methods: {


      edidOn(){
        let _this = this;
        if(tools.VerificationsText(_this, _this.updForm.iccid, this.$t("card_index.rs.updIccid")) == true){
          let  updateNotFilled = this.updForm.updateNotFilled;
          let bool = false;
          let title = "";

          if(updateNotFilled=='1'){
            bool = true;
            this.updForm.remarks = tools.isNull(this.updForm.remarks)?this.updForm.remarks:'';
            this.updForm.imei = tools.isNull(this.updForm.imei)?this.updForm.imei:'';
            this.updForm.deliver_date = tools.isNull(this.updForm.deliver_date)?this.updForm.deliver_date:'';
            this.updForm.customize_grouping = tools.isNull(this.updForm.customize_grouping)?this.updForm.customize_grouping:'';

            title += this.$t('card_index.updForm.remarks')+" ["+this.updForm.remarks+"]";
            title += "IMEI: ["+this.updForm.imei+"]";
            title += this.$t('card_index.updForm.deliver_date')+" ["+this.updForm.deliver_date+"]";
            title += this.$t('card_index.updForm.customize_grouping')+" ["+this.updForm.customize_grouping+"]";

          }else {
            if(tools.isNull(this.updForm.remarks)){
              bool = true;
              title += '\n'+this.$t('card_index.updForm.remarks')+" ["+this.updForm.remarks+"] ";
            }
            if(tools.isNull(this.updForm.imei)){
              bool = true;
              title += "\nIMEI: ["+this.updForm.imei+"]";
            }
            if(tools.isNull(this.updForm.deliver_date)){
              bool = true;
              title += '\n'+this.$t('card_index.updForm.deliver_date')+" ["+this.updForm.deliver_date+"]";
            }
            if(tools.isNull(this.updForm.customize_grouping)){
              bool = true;
              title += '\n'+this.$t('card_index.updForm.customize_grouping')+" ["+this.updForm.customize_grouping+"]";
            }

          }

          if(bool){
            let pwdStr = tools.encryptSy(this.updForm);
            this.ask_show = true;
            this.message = this.$t("card_index.ask.upd")+title+' ?';
            this.trunPar = pwdStr;
          }else {
            this.$modal.showToast(this.$t("card_index.rs.unfilled"));
          }
        }
      },

      editCardSub(pwdStr){
        editCardPublic(pwdStr).then(response => {
          let jsonObj = JSON.parse(tools.Decrypt(response));
          let msg = jsonObj.msg;
          if (jsonObj.code == 200) {
            tools.showToast(this,msg)
            this.edit_show = false;
            this.findCardOne();//刷新
          } else {
            this.$modal.showToast(msg);
          }
        })
      },

      //提供给子组件 修改父组件属性
      setObj(Key, obj) {
        switch (Key) {
          case 'setSel':
            this.sel = obj;
            break;
          case 'openEditShow':
            this.edit_show = true;
            this.wUpdBatch = false;
            this.updForm = obj;
            break;
          case 'setEditShow':
            this.edit_show = obj;
            break;
          case 'setAskShow':
            this.ask_show = obj;
            break;

        }
      },


      findCardOne(){
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
              if (tools.isNull(row)) {
                this.finddata(row)
              }else {
                this.show_empty = true;
              }
            }
          })


        }
      },

      /*获取单卡详细信息*/
      finddata(row) {
        this.tablefrom = [];//清空数据
        this.tablefrom_1 = [];//清空数据

        this.updForm={
          remarks:'',
          updateNotFilled:'0',
          delivery_date:null,
          imei:null,
          customize_grouping:null,
          iccid:null,
        };
        let map = {};
        map.c_no = row.c_no;
        let pwdStr = tools.encryptSy(map);
        getCard(pwdStr).then(response => {
              let jsonObj = JSON.parse(tools.Decrypt(response));
              this.headquarters = jsonObj.deptId == '100' ? true : false;

              if (jsonObj.code == 200) {
                row = jsonObj.data;
                this.tablefrom.push({"label1":"MSISDN","value1":row.msisdn,"label2":"IMSI","value2":tools.getVal(row.imsi)});
                this.tablefrom.push({"label1":"IMEI","value1":tools.getVal(row.imei),"label2":this.$t("cardInfoDetails.tFrom.w_polling"),"value2":tools.getDkeyValue(this.whetherOptions, row.w_polling)});
               let map1 = {},map2 = {},map3 = {},map4 = {},map7 = {},map8 = {}
                    ,map9 = {},map10 = {},map11 = {},map20 = {}
                   ,map21 = {},map22 = {},map23 = {},map24 = {},map25 = {},map26 = {},map27 = {}
                   ,map28 = {},map29 = {},map30 = {};


                map2.label1 = this.$t("cardInfoDetails.tFrom.status_show_id");
                map2.value1 = tools.getDkeyValue(this.cardStatusShowOptions, tools.getVal(row.status_show_id));
                map2.label2 = this.$t("cardInfoDetails.tFrom.type");
                map2.value2 = tools.getDkeyValue(this.cardTypeOptions, tools.getVal(row.type));

                map3.label1 = this.$t("cardInfoDetails.tFrom.network_type");
                map3.value1 = tools.getDkeyValue(this.cardNetworkTypeOptions, tools.getVal(row.network_type));
                map3.label2 = this.$t("cardInfoDetails.tFrom.connection_status");
                map3.value2 = tools.getDkeyValue(this.cardConnectionStatusOptions, tools.getVal(row.connection_status));

                map4.label1 = this.$t("cardInfoDetails.tFrom.nedd_real_name");
                map4.value1 = tools.getDkeyValue(this.whetherOptions, row.nedd_real_name);
                map4.label2 = this.$t("cardInfoDetails.tFrom.w_real_name");
                map4.value2 = tools.getDkeyValue(this.whetherOptions, row.w_real_name);

                map7.label1 = this.$t("common.belongsTo");
                map7.value1 = tools.getkeyValue(this.deptsOptions, row.dept_id,"dept_id","dept_name");
                map7.label2 = this.$t("cardInfoDetails.tFrom.channel_id");
                map7.value2 = tools.getDkeyValue(this.channelOptions, row.channel_id);

                map8.label1 = this.$t("cardInfoDetails.tFrom.package_id");
                map8.value1 =  tools.getVal(row.package_id);
                map8.label2 =  this.$t("cardInfoDetails.tFrom.w_pool");
                map8.value2 =  tools.getDkeyValue(this.whetherOptions, row.w_pool)+ " "+tools.getVal(row.pool_code);


                map9.label1 =  this.$t("cardInfoDetails.tFrom.balance");
                map9.value1 = tools.getVal(row.balance);
                map9.label2 = this.$t("cardInfoDetails.tFrom.payment_key");
                map9.value2 = tools.getVal(row.payment_key);

                map10.label1 = this.$t("cardInfoDetails.tFrom.automatic_renewal");
                map10.value1 = tools.getDkeyValue(this.whetherOptions, row.automatic_renewal);
                map10.label2 = this.$t("cardInfoDetails.tFrom.u_code");
                map10.value2 =  tools.getVal(row.u_code);

                map11.label1 = this.$t("cardInfoDetails.tFrom.w_voice");
                map11.value1 = tools.getDkeyValue(this.whetherOptions, row.w_voice);
                map11.label2 = this.$t("cardInfoDetails.tFrom.w_sms");
                map11.value2 = tools.getDkeyValue(this.whetherOptions, row.w_sms)+" "+tools.getVal(row.sms_number);

                map20.label1 = "ICCID";
                map20.value1 = row.iccid;
                map21.label1 = this.$t("cardInfoDetails.tFrom.activate_date");
                map21.value1 = tools.getVal(row.activate_date);
                map22.label1 = this.$t("cardInfoDetails.tFrom.traffic_sync_time");
                map22.value1 = tools.getVal(row.traffic_sync_time);

                map23.label1 = this.$t("cardInfoDetails.tFrom.state_sync_time");
                map23.value1 = tools.getVal(row.state_sync_time);

                map25.label1 = this.$t("cardInfoDetails.tFrom.prodinsteff_time");
                map25.value1 = tools.getVal(row.prodinsteff_time);
                map27.label1 = this.$t("cardInfoDetails.tFrom.prodinstexp_time");
                map27.value1 = tools.getVal(row.prodinstexp_time);
                map28.label1 = this.$t("cardInfoDetails.tFrom.deliver_date");
                map28.value1 = tools.getVal(row.deliver_date);


                this.tablefrom.push(map2);
                this.tablefrom.push(map3);
                this.tablefrom.push(map4);
                this.tablefrom.push(map7);
                this.tablefrom.push(map8);
                this.tablefrom.push({"label1":this.$t("cardInfoDetails.tFrom.w_network_break"),"value1":tools.getDkeyValue(this.whetherOptions, row.w_network_break),"label2":this.$t("cardInfoDetails.tFrom.operator"),"value2":tools.getVal(row.operator)});
                this.tablefrom.push({"label1":this.$t("cardInfoDetails.tFrom.roaming_country"),"value1":tools.getVal(row.roaming_country),"label2":this.$t("cardInfoDetails.tFrom.internet_signal"),"value2":tools.getVal(row.internet_signal)});
                this.tablefrom.push({"label1":this.$t("cardInfoDetails.tFrom.ip_attribution"),"value1":tools.getVal(row.ip_attribution),"label2":this.$t("cardInfoDetails.tFrom.shutdown_threshold"),"value2":tools.getVal(row.shutdown_threshold)});
                this.tablefrom.push(map9);
                this.tablefrom.push(map10);
                this.tablefrom.push(map11);

                this.tablefrom_1.push(map20);
                this.tablefrom_1.push(map21);
                this.tablefrom_1.push(map22);
                this.tablefrom_1.push(map23);
                this.tablefrom_1.push(map25);
                this.tablefrom_1.push(map27);
                this.tablefrom_1.push(map28);
                this.tablefrom_1.push({"label1":this.$t("cardInfoDetails.tFrom.customize_grouping"),"value1":tools.getVal(row.customize_grouping)});
                this.tablefrom_1.push({"label1":this.$t("cardInfoDetails.tFrom.remarks"),"value1":tools.getVal(row.remarks)});

                if(this.headquarters){
                  map2.value1 += " [" + tools.getDkeyValue(this.cardStatusOptions, row.status_id) + "]";
                  map1.value1 += tools.isNull( row.supplier)?" 供应商 [" + row.supplier + "]":"";

                  this.tablefrom.push({"label1":this.$t("cardInfoDetails.tFrom.storage_date"),"value1":tools.getVal(row.storage_date),"label2":this.$t("cardInfoDetails.tFrom.delivery_date"),"value2":tools.getVal(row.delivery_date)});
                  this.tablefrom.push({"label1":this.$t("cardInfoDetails.tFrom.create_time"),"value1":tools.getVal(row.create_time),"label2":this.$t("cardInfoDetails.tFrom.first_time_using"),"value2":tools.getVal(row.first_time_using)})


                };


                this.updForm.iccid = row.iccid;
                this.updForm.remarks = tools.getValDef(row.remarks,'');
                this.updForm.deliver_date = tools.getValDef(row.deliver_date,null);
                this.updForm.imei = tools.getValDef(row.imei,null);
                this.updForm.customize_grouping = tools.getValDef(row.customize_grouping,null);

              } else {
                this.$modal.showToast(jsonObj.msg);
              }
              this.loading = false;
            }
        );

      },

      //复制 基础信息
      copyCardInfo() {
        let copyText = "";
        for (let i = 0; i < this.tablefrom.length; i++) {
          let obj = this.tablefrom[i];
          let value1 = tools.getVal(obj.value1);
          let value2 = tools.getVal(obj.value2);
          let value3 = tools.getVal(obj.value3);
          let value4 = tools.getVal(obj.value4);
          let value5 = tools.getVal(obj.value5);
          copyText += obj.label1+" : "+value1+" , "+obj.label2+" : "+value2;
          copyText +="\n";
        }
        for (let i = 0; i < this.tablefrom_1.length; i++) {
          let obj = this.tablefrom_1[i];
          copyText += obj.label1+" : "+tools.getVal(obj.value1);
          copyText +="\n";
        }
        let _this = this;
        tools.copyThat(copyText,_this);
      },

      //一键诊断
      oneDiagnosis(){
        if(tools.isNull(this.updForm.iccid)){
          let url ="/pages/work/connect/card/diagnosis?iccid="+this.updForm.iccid;
          tools.navigateTo(this,url);
        }
      },
      goTo(){
          tools.navigateTo(this,"/pages/work/index");
      },
		}
	}
</script>
<style lang="scss">


</style>

