<template>
    <view>

      <u-swipe-action>

        <u-swipe-action-item @click="clickSwipe"	 v-for="(item, index) in indexList" :options="options2">
          <view class="swipe-action u-border-top u-border-bottom">
            <view class="swipe-action__content">
              <text class="swipe-action__content__text">
                <ul class="custom-ul">
                  <li><div class="sTitle">标题：</div><div>{{ tools.getTitle(item) }}</div></li>
                  <li><div class="sTitle">创建者：</div><div>{{ item.create_by }}</div></li>
                  <li><div class="sTitle">时间：</div><div>{{ tools.formatMsgDate(item.time) }}</div></li>
                </ul>
              </text>
            </view>
          </view>
        </u-swipe-action-item>

      </u-swipe-action>


    <myTabbar></myTabbar>
	</view>
</template>

<script>
import myTabbar from '../components/tabbar/myTabbar'
import tools from "../utils/iotos/tools";



export default {
	data() {
		return {
      tools:tools,
      form:{
        name:'张三',
      },
      options2: [{
        text: '详情',
        style: {
          backgroundColor: '#3c9cff'
        }
      },{
        text: '忽略',
        style: {
          backgroundColor: '#888'
        }
      }],
      indexList: [
       {
          title:'行业交流群',
          time:'2023-07-26 22:28:08',
          create_by:'iotos',
        },{
          title:'IoTOS–官方交流群',
          time:'2023-07-21 22:28:08',
          create_by:'admin',
        },{
          title:'壹、贰、叁、肆、伍、陆、柒、捌、玖、拾壹、贰、叁、肆、伍、陆、柒、捌、玖、拾',
          time:'2023-07-27 22:28:08',
          create_by:'admin',
        }
      ],
		}
	},
	components: {
    myTabbar
	},

	methods: {

    clickSwipe(iten){
        console.log(iten)
    },


		//关闭公告
		closePlacard() {
			this.showPlacard = false;
			console.info(this.showPlacard)
		},
		jump(url) {
		  if(url!=null){
			  console.info("jump = = = = " )
		  }
		}
	}

}
</script>

<style lang="scss" scoped>
.u-page {
  padding: 0;
}

.u-demo-block__title {
  padding: 10px 0 2px 15px;
}

.swipe-action {
  &__content {
    border-bottom: 1px solid rgb(25, 137, 250);
    &__text {
      font-size: 15px;
      color: $u-main-color;
      padding-left: 30rpx;
    }
  }
}

.sTitle{
  width: 80px;
  float: left;
}
.custom-ul {
  list-style: none; /* 去掉默认的列表样式 */
  padding: 0px; /* 去掉默认的内边距 */
  margin-left: 10px;
}
.custom-ul li{
  height: 25px;
}
</style>