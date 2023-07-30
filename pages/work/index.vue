<template>
	<view style="background-color: white"  >
		

		<!-- 轮播图 -->
		<u-swiper style="width: 100%;height: 20%;" :list="imgList" keyName="image" previousMargin="30" nextMargin="30"
			circular showTitle :autoplay="true" radius="5" bgColor="#ffffff" :loading='loadingImage'></u-swiper>
    <uni-section :title="$t('work_index.systemManagement')" type="line"></uni-section>

    <u-search style="padding: 0px 15px" v-model="value"   placeholder="查询卡号：ICCID | MSISDN | IMSI" :showAction="false"></u-search>


		<view>
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(listItem,listIndex) in listWMeun" :key="listIndex" @click="navigateTo(listItem.url)">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="listItem.name" :size="22"></u-icon>
					<text class="grid-text">{{ $t('work_index.'+listItem.code) }}</text>
				</u-grid-item>
			</u-grid>
			<u-toast ref="uToast" />
		</view>



    <myTabbar></myTabbar>

	</view>
</template>

<script>
import tools from '../../utils/iotos/tools';
import myTabbar from '../../components/tabbar/myTabbar'

	export default {
    components: {
      myTabbar
    },
    created(){
      if (tools.isNull(uni.getStorageSync('findICCID'))) {
        this.value = uni.getStorageSync('findICCID');
      }

    },
      data() {
			return {
				current: 0,
				swiperDotIndex: 0,
				loadingImage: false,
        value6: 0,
        value: null,
        imgList: [{
					image: '/static/images/banner/banner01.png',
					title: 'IoTOS 后台管理'
				}, {
					image: '/static/images/banner/banner02.png',
					title: 'IoTOS-App 移动端'
				}],

				listWMeun: [
					{
						name: 'search',
						code: 'cardNumberInquiry',
            url: '/pages/work/connect/card/cardInfoDetals',
          },
					{
						name: 'wifi',
						code: 'intelligentDiagnosis',
						url: '/pages/work/connect/card/diagnosis',
					},
					{
						name: 'file-text',
						code: 'usageRecord',
            url: '/pages/work/connect/card/usedRecord'
					},
					{
						name: 'map',
						code: 'sessionLog',
            url: '/pages/work/connect/card/cardSession'
          },
					{
						name: 'bag',
						code: 'businessHandling',
            url: '/pages/work/connect/card/cardApiBusinessHandling'
					},
					
				],
				
			}
		},
		methods: {
			
			navigateTo(url) {

				if(tools.isNull(url)){
          //this.$tab.navigateTo(url)
          if (tools.isNull(this.value)){
            url+="?iccid="+this.value;
            uni.setStorageSync('findICCID',this.value);
          }
				  tools.navigateTo(this,url);
				}
			},

			clickItem(name) {
				console.log(name)
			},
			
		}
	}
</script>

<style lang="scss">
	.grid-text {
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #fff;
		min-height: 100%;
		height: auto;
	}

	view {
		line-height: inherit;
	}

	/* #endif */

	.text {
		text-align: center;
		margin-top: 10rpx;
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
		;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-box {
		height: 150px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		height: 300rpx;
		line-height: 300rpx;
	}

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			/* #ifndef APP-NVUE */
			margin: 0 auto;
			/* #endif */
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}

</style>