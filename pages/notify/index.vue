<template>
	<view style="background-color: white;"  >

    <u-search style="padding: 0px 15px"  @focus="searchFocus"  placeholder="搜索" :showAction="false"></u-search>

    <view class="u-page">
      <u-list
          @scrolltolower="scrolltolower"
      >
        <u-list-item
            v-for="(item, index) in indexList"
            :key="index"
        >
          <u-cell :title="tools.getTitle(item)" :label="tools.getIMLabel(item)"	:value="tools.formatMsgDate(item.time)" :center="false" >
            <u-avatar v-if="tools.isNull(item.url)"
                slot="icon"
                shape="square"
                size="35"

                :src="item.url"
                      :badge="item.badge" :dot="item.dot"
                customStyle="margin: -3px 5px -3px 0"
            >
              <u-image @click="clickImg(item)" radius="5" width="35" height="35"  :src="item.url"></u-image>
              <span v-if="item.newmsgCount>0" class="my-badge" >
                {{ item.newmsgCount>99?'99':item.newmsgCount }}
              </span>
            </u-avatar>
            <u-avatar v-if="!tools.isNull(item.url)"
                      slot="icon"
                      shape="square"
                      fontSize="35"
                      customStyle="margin: -3px 5px -3px 0"
            >
              <span class="textImg">{{ item.title.length>1?item.title.substring(0,1):item.title }}</span>
              <span v-if="item.newmsgCount>0" class="my-badge" style="margin-left: -16px;" >
                {{ item.newmsgCount>99?'99':item.newmsgCount}}
              </span>
            </u-avatar>
          </u-cell>
        </u-list-item>
      </u-list>
    </view>




    <myTabbar ></myTabbar>
	</view>
</template>

<script>
import tools from '../../utils/iotos/tools';
import myTabbar from '../../components/tabbar/myTabbar'
import UImage from "../../uni_modules/uview-ui/components/u--image/u--image";

	export default {
    components: {
      UImage,
      myTabbar
    },
    onLoad() {
      this.loadmore()
    },
		data() {
			return {
        tools:tools,
        indexList: [
          {
            url:'http://www.iotos.top/assets/contact1-d2471b63.jpg',
            title:'总平台',
            time:'2023-07-25 22:28:08',
            lastMsg:'王五:IoTOS 不错！',
            newmsgCount:9,
            isDisturb:false,
            badge:3
          },{
            url:'',
            title:'行业交流群',
            time:'2023-07-26 22:28:08',
            lastMsg:'张三:OK!',
            newmsgCount:998,
            isDisturb:false,
            badge:0,
            dot:true
          },{
            url:'',
            title:'IoTOS–官方交流群',
            time:'2023-07-21 22:28:08',
            lastMsg:'AAA-IoTOS:欢迎推广！',
            newmsgCount:1,
            isDisturb:false,
            badge:0,
            dot:true
          },{
            url:'',
            title:'壹、贰、叁、肆、伍、陆、柒、捌、玖、拾壹、贰、叁、肆、伍、陆、柒、捌、玖、拾',
            time:'2023-07-27 22:28:08',
            lastMsg:'',
            newmsgCount:0,
            isDisturb:false,
            badge:0,
            dot:true
          }
        ],

				


			}
		},
		methods: {
      clickImg(item){
        console.log(item)
      },
      searchFocus(){
        console.log("searchFocus")
      },

      scrolltolower() {
        this.loadmore()
      },
      loadmore() {
        /*for (let i = 0; i < 30; i++) {
          this.indexList.push({
            url: this.urls[uni.$u.random(0, this.urls.length - 1)]
          })
        }*/
      }

		}
	}
</script>

<style lang="scss" scoped>
.list-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 24rpx;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}

   /* 自定义徽章样式 */
 .my-badge {
   background-color: #f00; /* 背景颜色 */
   color: #fff; /* 文字颜色 */
   font-size: 1px;
   padding: 1px;
   border-radius: 100%; /* 圆角 */
   float: left;
   margin-top: -30px;
   text-align: center;
   margin-left: -18px;
   z-index: 900;
   width: 16px;
   height: 15px;
 }
 .textImg{
   border-radius: 5px; /* 圆角 */
   background-color: rgb(25, 137, 250); /* 背景颜色 */
   color: #fff; /* 文字颜色 */
   font-size: 18px;
   width: 15px;
   height: 15px;
   text-align: center;
   padding: 4px 13px 16px 8px;
 }
</style>