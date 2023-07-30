<template>
	<view v-if="show_Details" style="background-color: white;padding: 0px 5px;">

    <div v-if="dgForm.te1.show" style="width: 100%;font-size: 20px;height: 30px;padding:5px;">
      <span :style="{color: dgForm.iColor}">{{ dgForm.iTitle }}</span>

    </div>
    <u-line-progress v-if="dgForm.te1.show" style="margin: 0px 0px 10px;" :percentage="percentage" activeColor="rgb(59, 164, 255)"  />
    <u-collapse :value="activeNames"
        @change="changeCollapse"
        @close="closeCollapse"
        @open="openCollapse"
    >
      <u-collapse-item name="1" :title="lgCode.te1.title" v-if="dgForm.te1.show">
        <u-icon :name="dgForm.te1.class" size="20" slot="icon" :color="dgForm.te1.color"></u-icon>
        <text class="u-collapse-content">

          <u-row customStyle="margin-bottom: 10px" gutter="10">
            <u-col span="6">
              <view >
                {{ lgCode.te1.i_1 }}: {{ dgForm.te1.value1 }}
              </view>
            </u-col>
            <u-col span="6" v-if="dgForm.te1.value2Sohw">
              <view >
                {{ lgCode.te1.i_2 }}: {{ dgForm.te1.value2 }}
              </view>
            </u-col>
          </u-row>
          <u-row customStyle="margin-bottom: 10px" gutter="10">
            <u-col span="6">
              <view >
                {{ lgCode.te1.i_3 }}: {{ dgForm.te1.value3 }}
              </view>
            </u-col>
            <u-col span="6">
              <view >
                {{ lgCode.te1.i_4 }}: {{ dgForm.te1.value4 }}
              </view>
            </u-col>
          </u-row>
          <div  v-if="dgForm.te1.showSuggested">
            <u-notice-bar icon="server-man" :text="lgCode.suggestedSolution+lgCode.te1.solution"></u-notice-bar>
          </div>
        </text>


      </u-collapse-item>

      <u-collapse-item name="2" :title="lgCode.te2.title" v-if="dgForm.te2.show">
        <u-icon :name="dgForm.te2.class" size="20" slot="icon" :color="dgForm.te2.color"></u-icon>
        <text class="u-collapse-content">
          <u-row gutter="10">
            <u-col span="3.5">
              <view >{{ columns[0].label }}</view>
            </u-col>
            <u-col span="2">
              <view >{{ columns[1].label }}</view>
            </u-col>
            <u-col span="1.5">
              <view >{{ columns[2].label }}</view>
            </u-col>
            <u-col span="5">
              <view >{{ columns[3].label }}</view>
            </u-col>
          </u-row>
          <u-line class="myLine" color="rgb(59, 164, 255)"></u-line>
          <u-row  v-for="(item,index) in serviceTypeList" :key="index" customStyle="margin-bottom: 10px" gutter="10">
            <u-col span="3.5">
              <view >{{ tools.getDkeyValue(ecv5ServiceTypeOptions, item.serviceType) }}</view>
            </u-col>
            <u-col span="1.5">
              <view >{{ item.apnName }}</view>
            </u-col>
            <u-col span="1.5">
              <view :class="item.serviceStatus=='1'?'myGreen':'mygRed'" >{{ tools.getDkeyValue(ecv5ServiceStatusOptions, item.serviceStatus) }}</view>
            </u-col>
            <u-col span="5.5">
              <view > {{ item.statusTime.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1-$2-$3 $4:$5:$6") }} </view>
            </u-col>
          </u-row>
        </text>
      </u-collapse-item>
      <u-collapse-item name="3" :title="lgCode.te3.title" v-if="dgForm.te3.show">
        <u-icon :name="dgForm.te3.class" size="20" slot="icon" :color="dgForm.te3.color"></u-icon>
        <text class="u-collapse-content">
          <u-row customStyle="margin-bottom: 10px" gutter="10">
            <u-col span="3">
              <view >
                {{ lgCode.te3.i_1 }}: {{ dgForm.te3.value1 }}
              </view>
            </u-col>
            <u-col span="9">
              <view >
                {{ lgCode.te3.i_2 }}: {{ dgForm.te3.value2 }}
              </view>
            </u-col>
          </u-row>
          <u--text style="margin-bottom: 10px;" :text="lgCode.te3.i_3"></u--text>



             <u-checkbox-group  v-model="restrictedArea"  placement="column">
               <u-checkbox
                   :customStyle="{marginBottom: '8px'}"
                   :key="index"
                   :label="item.dictLabel"
                   :name="item.dictValue"
                   v-for="(item, index) in selRestrictedAreaOptions"
               >
               </u-checkbox>
             </u-checkbox-group>




        </text>
      </u-collapse-item>
      <u-collapse-item name="4" :title="lgCode.te4.title" v-if="dgForm.te4.show">
        <u-icon :name="dgForm.te4.class" size="20" slot="icon" :color="dgForm.te4.color"></u-icon>
        <text class="u-collapse-content" style="height: 230px;">
            <u-steps current="-1" inactiveColor="#1890ff"	 direction="column">
              <u-steps-item v-for="item in dgForm.cardApiBusinessList" :title="'['+tools.getDkeyValue(ecv5ChangeStatusOptions, item.descStatus)+']'+$t('cardInfoModule.cafterward')+'['+tools.getDkeyValue(ecv5ChangeStatusOptions, item.targetStatus)+']'" :desc="item.changeDate"></u-steps-item>
            </u-steps>
        </text>
      </u-collapse-item>
    </u-collapse>


    <!-- 触发加载数据函数-->
    <span v-if="show_Details ==true && dsEditexecute == false">
        {{ LoadEx() }}
    </span>


	</view>
</template>

<script>
import {
  queryFStatus,
  queryApiTariff,
  querySimStopReason,
  querySimProduct,
  querySimRLStatus,
  querySimRLArea,
  queryOnOffStatus,
  synStatus,
  queryCardBindStatus,
  querySimChangeHistory,
} from "@/api/iotos/connect/card";
	import tools from "../../../../utils/iotos/tools";

  export default {
    props: {
      setObj: Function,//父组件赋值 函数
      dsEditexecute: Boolean,//加载是否 已执行
      show_Details: Boolean,//当前界面是否显示
      sel: Object,
    },
		data() {
			return {
        tools:tools,
        activeNames:['1','2','3','4'],
        dgForm:{
          te1:{color:'#4CAF50',class:'checkmark-circle',value1:'--',value2:'--',value3:'--',value4:'--',showSuggested:true, show:false,value2Sohw:false},
          te2:{color:'#4CAF50',class:'checkmark-circle',show:false},
          te3:{color:'#4CAF50',class:'checkmark-circle',value1:'--',value2:'--',show:false},
          te4:{color:'#4CAF50',class:'checkmark-circle',show:false},
          cardApiBusinessList: [],
          iColor:'#3ba4ff',
          iClass:'more-dot-fill',
          iTitle:this.$t('dsEcV5.dTitle.i_1')
        },
        // 列信息
        columns: [
          {key: 0, label: this.$t('dsEcV5.table.i_1')},
          {key: 1, label: this.$t('dsEcV5.table.i_2')},
          {key: 2, label: this.$t('dsEcV5.table.i_3')},
          {key: 3, label: this.$t('dsEcV5.table.i_4')},
        ],
        lgCode:{
          dTitle:{
            i_2:this.$t('dsEcV5.dTitle.i_2'),
          },
          te1:{
            title:this.$t('dsEcV5.te1.title'),
            i_1:this.$t('dsEcV5.te1.i_1'),
            i_2:this.$t('dsEcV5.te1.i_2'),
            i_3:this.$t('dsEcV5.te1.i_3'),
            i_3top:this.$t('dsEcV5.te1.i_3top'),
            i_4:this.$t('dsEcV5.te1.i_4'),
            solution:this.$t('dsEcV5.te1.solution'),
          },
          te2:{
            title:this.$t('dsEcV5.te2.title'),
            titletop:this.$t('dsEcV5.te2.titletop'),
          },
          te3:{
            title:this.$t('dsEcV5.te3.title'),
            i_1:this.$t('dsEcV5.te3.i_1'),
            i_2:this.$t('dsEcV5.te3.i_2'),
            i_3:this.$t('dsEcV5.te3.i_3'),
          },
          te4:{
            title:this.$t('dsEcV5.te4.title'),
          },
          suggestedSolution:this.$t('dsEcV5.suggestedSolution'),
        },
        percentage:20,
        value: '',
        showEmpty: false,
        serviceTypeList:[],
        ecv5ServiceStatusOptions:[],
        ecv5ServiceTypeOptions:[],
        restrictedAreaOptions:[],
        selRestrictedAreaOptions:[],
        restrictedArea:[],
        ecv5ChangeStatusOptions:[],
        cardStatusShowOptions:[],
        cardStatusOptions:[],
        ecv5OnoffStatusOptions:[],
        whetherOptions:[],
        color:{
          green:'#4CAF50',
          red:'#ff5f57',
          blue:'#3ba4ff'
        },
        ecv5BindStatus:[],

			}
		},
    mounted() {
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
      //加载 ECV5服务状态
      if (tools.isNull(uni.getStorageSync('ecv5ServiceStatusOptions')) ) {
        this.ecv5ServiceStatusOptions = uni.getStorageSync('ecv5ServiceStatusOptions');
      } else {
        this.getDicts("ecv5_service_status").then(response => {
          uni.setStorageSync('ecv5ServiceStatusOptions',response.data);
          this.ecv5ServiceStatusOptions = uni.getStorageSync('ecv5ServiceStatusOptions');
        });
      }
      //加载 ECV5通信功能服务类型
      if (tools.isNull(uni.getStorageSync('ecv5ServiceTypeOptions')) ) {
        this.ecv5ServiceTypeOptions = uni.getStorageSync('ecv5ServiceTypeOptions');
      } else {
        this.getDicts("ecv5_service_type").then(response => {
          uni.setStorageSync('ecv5ServiceTypeOptions',response.data);
          this.ecv5ServiceTypeOptions = uni.getStorageSync('ecv5ServiceTypeOptions');
        });
      }
      //加载 ECV5限制区域
      if (tools.isNull(uni.getStorageSync('restrictedAreaOptions')) ) {
        this.restrictedAreaOptions = uni.getStorageSync('restrictedAreaOptions');
      } else {
        this.getDicts("ecv5_restricted_area").then(response => {
          uni.setStorageSync('restrictedAreaOptions',response.data);
          this.restrictedAreaOptions = uni.getStorageSync('restrictedAreaOptions');
        });
      }
      //加载 ECV5变更状态类型
      if (tools.isNull(uni.getStorageSync('ecv5ChangeStatusOptions')) ) {
        this.ecv5ChangeStatusOptions = uni.getStorageSync('ecv5ChangeStatusOptions');
      } else {
        this.getDicts("ecv5_change_status").then(response => {
          uni.setStorageSync('ecv5ChangeStatusOptions',response.data);
          this.ecv5ChangeStatusOptions = uni.getStorageSync('ecv5ChangeStatusOptions');
        });
      }
      //加载 ECV5开关机状态
      if (tools.isNull(uni.getStorageSync('ecv5OnoffStatusOptions')) ) {
        this.ecv5OnoffStatusOptions = uni.getStorageSync('ecv5OnoffStatusOptions');
      } else {
        this.getDicts("ecv5_onoff_status").then(response => {
          uni.setStorageSync('ecv5OnoffStatusOptions',response.data);
          this.ecv5OnoffStatusOptions = uni.getStorageSync('ecv5OnoffStatusOptions');
        });
      }
      //加载 ECV5开关机状态
      if (tools.isNull(uni.getStorageSync('ecv5BindStatus')) ) {
        this.ecv5BindStatus = uni.getStorageSync('ecv5BindStatus');
      } else {
        this.getDicts("ecv5_bind_status").then(response => {
          uni.setStorageSync('ecv5BindStatus',response.data);
          this.ecv5BindStatus = uni.getStorageSync('ecv5BindStatus');
        });
      }
    },
		methods: {



      LoadEx() {
        //this.activeNames = [];
        this.$emit("setObj", "setDsEditexecute", true);//已加载
        this.te1Load();
      },

      //诊断板块一
      te1Load(){
        this.percentage = 0;//进度条
        //重置状态
        this.dgForm = {
          te1:{color:'#4CAF50',class:'checkmark-circle',value1:'--',value2:'--',value3:'--',value4:'--',showSuggested:false, show:false,value2Sohw:false},
          te2:{color:'#4CAF50',class:'checkmark-circle',show:false},
          te3:{color:'#4CAF50',class:'checkmark-circle',value1:'--',value2:'--',show:true},
          te4:{color:'#4CAF50',class:'checkmark-circle',show:true},
          cardApiBusinessList: [],//业务变更 数组
          iColor:'#3ba4ff',
          iClass:'more-dot-fill',
          iTitle:this.$t('dsEcV5.dTitle.i_1')
        };
        this.serviceTypeList = [];
        this.restrictedArea = [];
        this.dgForm.te1.show = true;
        this.addPercentage(10);//进度条

        this.synCardStatus();//同步状态
        this.queryOOStatus();//设备状态（开关机状态）
        this.queryCardFStatus();//冻结状态查询

        this.queryProduct(); //单卡通信功能开通查询


        this.queryRLStatus(); //物联卡区域限制状态查询
        this.queryRLArea();//物联卡区域限制区域查询
        this.queryBindStatus(); //物联卡机卡分离状态查询
        this.queryChangeHist();//单卡状态变更历史查询
        this.addPercentage(10);//进度条

      },


      //同步状态
      synCardStatus(){
        synStatus(this.synCommonParameter()).then(response => {
          let retuenList = this.synCommonFeedback(response);
          if(tools.isNull(retuenList)){
            let row = retuenList[0].rData;
            let value = tools.getDkeyValue(this.cardStatusShowOptions, row.status_show_id);
            value += " [" + tools.getDkeyValue(this.cardStatusOptions, row.status_id) + "]";
            this.dgForm.te1.value1 = value;
            let eArr = ['2','3','4'];
            if(!tools.VerificationValIsArray(eArr,row.status_show_id)){
              this.dgForm.te1.showSuggested = true;
              this.addActiveNames("1","te1");
              if(row.status_show_id=="5"){//已停机 停机原因
                this.queryStopReason();
              }
            }
          }
          this.addPercentage(10);//进度条
        })
      },
      //查询停机原因
      queryStopReason(){
        querySimStopReason(this.synCommonParameter()).then(response => {
          let retuenList = this.synCommonFeedback(response);
          if(tools.isNull(retuenList)){
            let result = retuenList[0].rData.result;
            let stopReason = result[0].stopReason;
            let value2 = '';
            if(stopReason=="000000000000"){
              value2 = "该卡当前不处于“已停机”或系统暂无停机原因";
            }else{
              value2 = this.causeAnalysis(stopReason);
              this.addActiveNames("1","te1");
            }
            this.dgForm.te1.value2 = value2;
            this.dgForm.te1.value2Sohw = true;
          }
        })
      },
      //设备状态（开关机状态）
      queryOOStatus(){
        queryOnOffStatus(this.synCommonParameter()).then(response => {
          let retuenList = this.synCommonFeedback(response);
          if(tools.isNull(retuenList)){
            let result = retuenList[0].rData.result;
            let status = result[0].status;
            if(status=='0'){
              this.addActiveNames("1","te1");
            }
            this.dgForm.te1.value3 = tools.getDkeyValue(this.ecv5OnoffStatusOptions, status);
          }
          this.addPercentage(10);//进度条
        })
      },



      //展开面板
      addActiveNames(val,te){
          this.activeNames.push(val);
          this.dgForm[te].color = this.color.red;
          this.dgForm[te].class = 'close-circle';
      },

      //冻结状态查询
      queryCardFStatus(){
        queryFStatus(this.synCommonParameter()).then(response => {
          let retuenList = this.synCommonFeedback(response);
          if(tools.isNull(retuenList)){
            let result = retuenList[0].rData.result;
            let map = result[0];
            if(tools.isNull(map)){
              let rs = map.manageStopRestartStatus;
              let reason = map.reason;
              let value4 = tools.getDkeyValue(this.whetherOptions, rs);
              if(tools.isNull(reason)){
                value4 +="["+reason+"]"
              }
              this.dgForm.te1.value4 = value4;
            }
          }
          this.addPercentage(10);//进度条
        })
      },


      //单卡通信功能开通查询
      queryProduct(){
        querySimProduct(this.synCommonParameter()).then(response => {
          let retuenList = this.synCommonFeedback(response);
          this.dgForm.te2.show = true;
          if(tools.isNull(retuenList)){
            let result= retuenList[0].rData.result;
            if(tools.isNull(result)==true && result.length>0){
              this.serviceTypeList = result[0].serviceTypeList;
              if(this.serviceTypeList[0].serviceStatus=='0'){
                this.addActiveNames("2","te2");
              }
            }
          }
          this.addPercentage(10);//进度条
        })
      },


      //物联卡区域限制状态查询
      queryRLStatus(){
        querySimRLStatus(this.synCommonParameter()).then(response => {
          let retuenList = this.synCommonFeedback(response);
          if(tools.isNull(retuenList)){
            let result= retuenList[0].rData.result;
            if(tools.isNull(result)==true && result.length>0){
              let regionLimitStatus = result[0].regionLimitStatus;
              if(tools.install(regionLimitStatus)){
                let value1 = tools.getDkeyValue(this.whetherOptions, regionLimitStatus);
                this.dgForm.te3.value1 = value1;
                if(regionLimitStatus=='1'){
                  this.addActiveNames("3","te3");
                }
              }
            }
          }
          this.addPercentage(10);//进度条
        })
      },

      //物联卡区域限制区域查询
      queryRLArea(){
        querySimRLArea(this.synCommonParameter()).then(response => {
          let retuenList = this.synCommonFeedback(response);
          if(tools.isNull(retuenList)){
            let result= retuenList[0].rData.result;
            if(tools.isNull(result)==true && result.length>0){
              let restrictedArea = result[0].restrictedArea;
              if(tools.isNull(restrictedArea)){
                let arr = [];
                for (let j = 0; j < restrictedArea.length; j++) {
                  let val = restrictedArea[j];
                  arr.push(""+val)
                }
                restrictedArea = arr;
                this.restrictedArea = restrictedArea;
                let selRestrictedAreaOptions = [];
                for (let i = 0; i < this.restrictedAreaOptions.length; i++) {
                  let obj = this.restrictedAreaOptions[i];
                  for (let j = 0; j < restrictedArea.length; j++) {
                    let val = restrictedArea[j];
                    if(obj.dictValue==val){
                      selRestrictedAreaOptions.push(obj);
                    }
                  }
                }
                this.selRestrictedAreaOptions = selRestrictedAreaOptions;
              }
            }
          }
          this.addPercentage(10);//进度条
        })
      },

      //物联卡机卡分离状态查询
      queryBindStatus(){
        queryCardBindStatus(this.synCommonParameter()).then(response => {
          let retuenList = this.synCommonFeedback(response);
          if(tools.isNull(retuenList)){
            let result= retuenList[0].rData.result;
            if(tools.isNull(result)==true && result.length>0){
              let bStats = result[0].result;
              let sepTime = result[0].sepTime;
              let value2 = tools.getDkeyValue(this.ecv5BindStatus, bStats);
              if(tools.isNull(sepTime)){
                value2 +="["+sepTime+"]"
              }
              this.dgForm.te3.value2 = value2;
            }
          }
          this.addPercentage(10);//进度条
        })
      },
      //单卡状态变更历史查询
      queryChangeHist(){
        querySimChangeHistory(this.synCommonParameter()).then(response => {
          let retuenList = this.synCommonFeedback(response);
          if(tools.isNull(retuenList)){
            let result= retuenList[0].rData.result;
            if(tools.isNull(result)==true && result.length>0){
              let changeHistoryList = result[0].changeHistoryList;
              if(tools.isNull(changeHistoryList)){
                changeHistoryList =  tools.listMapSort(changeHistoryList,['changeDate'],'asc');
                changeHistoryList.sort((a, b) => {//依据时间字段排序
                  const dateA = new Date(a.changeDate);
                  const dateB = new Date(b.changeDate);
                  return dateA - dateB;
                });
                this.dgForm.cardApiBusinessList = changeHistoryList;

                if(changeHistoryList[changeHistoryList.length-1].targetStatus=='4'){
                  this.addActiveNames("4","te4");
                }
              }
            }
          }
          this.addPercentage(10);//进度条
        })
      },


      //进度条增长
      addPercentage(val){
        this.percentage = uni.$u.range(0, 100, this.percentage + 10);
        if(this.percentage==100){//诊断完成
          this.dgForm.iClass = '';
          this.dgForm.iColor = this.color.green;
          this.dgForm.iTitle = this.lgCode.dTitle.i_2;
          //诊断完成之后将诊断记录储存至数据库 【待完善】
          this.$emit("setObj", "setDiagnosisLoading", false);//取消只读

        }
      },


      //停机原因解析（这里不使用国际化语言配置 ）
      causeAnalysis(stopReason){
        let value2 = "";
        if(stopReason.substring(0,1)=="2"){
          value2 += " + 窄带网商品到期失效停机";
        }
        if(stopReason.substring(1,2)=="2"){
          value2 += " + 机卡分离停机";
        }
        if(stopReason.substring(3,4)=="2"){
          value2 += " + M2M 管理停机";
        }
        if(stopReason.substring(4,5)=="2"){
          value2 += " + 信控双向停机";
        }
        if(stopReason.substring(8,9)=="2"){
          value2 += " + 主动（申请）双向停机";
        }
        if(stopReason.substring(9,10)=="2"){
          value2 += " + 区域限制（位置固定）管理型停机";
        }
        if(stopReason.substring(10,11)=="2"){
          value2 += " + 强制双向停机";
        }
        value2 = value2.substring(0,3)==" + "?value2.substring(3,value2.length):value2;
        return value2;
      },



      //同步公共返回 反馈
      synCommonFeedback(response){
        let jsonObj = JSON.parse(tools.Decrypt(response));
        let msg = jsonObj.msg;
        if (jsonObj.code == 200) {
          if(tools.isNull(jsonObj.data) && tools.isNull(jsonObj.data.retuenList) && jsonObj.data.retuenList.length>0) {
            return jsonObj.data.retuenList;
          }
        } else {
          this.$modal.showToast(msg);
        }
      },
      //同步公共 参数加密
      synCommonParameter(){
        let map = {};
        map.iccid = this.sel.iccid;
        let pwdStr = tools.encryptSy(map);
        return pwdStr;
      },



      openCollapse(e) {
        // console.log('open', e)
      },
      closeCollapse(e) {
        // console.log('close', e)
      },
      changeCollapse(e) {
        // console.log('change', e)
      },


      codeChange(text) {
       // this.tips = text;
      },
      diagnosis(){
        //console.log(this.value)
      },

      clickIcon(){
        //console.log("clickIcon")
      },

		}
	}
</script>
<style lang="scss">


.myLine {
  padding: 5px 0px;
}


</style>

