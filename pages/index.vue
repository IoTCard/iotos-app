<template>
	<view class="container">

		<socketIndex ></socketIndex>

		<image class="logo" style="margin: auto;margin-left: 38%;" src="@/static/logo.png"></image>

		<view class="text-area">
			<text class="title">IoTOS-App</text>
		</view>
		<u--text type="primary" text="请给IoTOS的开源项目一个 Star，\n 这也是对项目的认可与贡献： "></u--text>
		<u-gap height="10" ></u-gap>
		<u--text type="primary" text="1. 后台：https://gitee.com/chinaiot/iotos \n 2. 移动端App：https://gitee.com/chinaiot/iotos-app  \n 3. IM网络通讯：https://gitee.com/chinaiot/iotos-im "></u--text>
		<u-gap height="10" ></u-gap>
		<u--text type="warning" text="文档部署教程：http://www.iotos.top/docs/guide/deploymentService.html"></u--text>
		<u-gap height="10" ></u-gap>
		<u--text type="error" text="可直接分享阿里云镜像 10分钟内搭建 \n 属于您的 IoTOS 添加下方好友进一步交流"></u--text>

		<image style="width: 100%;margin-top: 30px;" src="@/static/images/banner/gzhewm.gif"></image>
		<!-- <u-calendar :show="show"></u-calendar>
	<u-button @click="show = true">打开</u-button> -->

		

	</view>
</template>

<script>
import { getToken } from '../utils/auth';
import socketIndex from './common/socketIndex';



export default {
	data() {
		return {
			show: false,
		}
	},
	components: {
		socketIndex
	},
	onLoad() {
		let systemInfo = uni.getSystemInfoSync();

		this.systemLocale = systemInfo.language;
		this.applicationLocale = uni.getLocale();
		//console.log(this.applicationLocale);
		//根据当前系统语言进行加载   【登录界面可设置】

		this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
		uni.onLocaleChange((e) => {
			this.applicationLocale = e.locale;
		})
		
		
	},
	methods: {


		


		//关闭公告
		closePlacard() {
			this.showPlacard = false;
			console.info(this.showPlacard)
		},
		jump(url) {
		  if(url!=null){
			  console.info("jump = = = = " )
		  }
		},
		onLocaleChange(e) {
			if (this.isAndroid) {
				uni.showModal({
					content: this.$t('index.language-change-confirm'),
					success: (res) => {
						if (res.confirm) {
							uni.setLocale(e.code);
						}
					}
				})
			} else {
				uni.setLocale(e.code);
				this.$i18n.locale = e.code;
			}
		}
	}

}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>