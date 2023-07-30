<template>
	<view style="background-color: white;" >

    <socketIndex ></socketIndex>

    <image class="logo" style="margin: auto;margin-left: 38%;" src="@/static/logo.png"></image>
		<view class="text-area">
			<text class="title">IoTOS-App {{ version }}</text>
		</view>
    <div style="padding: 10px;">
      <u--text type="primary" text="请给IoTOS的开源项目一个 Star，\n 这也是对项目的认可与贡献： "></u--text>
      <u-gap height="10" ></u-gap>
      <u--text type="primary" text="1. 后台：https://gitee.com/chinaiot/iotos \n 2. 移动端App：https://gitee.com/chinaiot/iotos-app  \n 3. IM网络通讯：https://gitee.com/chinaiot/iotos-im "></u--text>
      <u-gap height="10" ></u-gap>
      <u--text type="warning" text="文档部署教程：http://www.iotos.top/docs/guide/deploymentService.html"></u--text>
      <u-gap height="10" ></u-gap>
      <u--text type="error" text="可直接分享阿里云镜像 10分钟内搭建 \n 属于您的 IoTOS 添加下方好友进一步交流"></u--text>

      <image style="width: 100%;margin-top: 10px;" src="@/static/images/banner/gzhewm.gif"></image>

      <u--text style="margin:10px 0px;"type="primary" text="更新日志："></u--text>

      <u-collapse :value="activeNames">
        <u-collapse-item
            v-for="(item, index) in updateList"
            :title="item.desc"
            :name="index"
        >
          <text class="u-collapse-content" >
            <u-list style="height: 100%;">
              <u-list-item
                  v-for="(obj, i) in item.titleArr"
                  :key="i"
              >
                <u-cell  :title="i+1+'. '+obj"></u-cell>
              </u-list-item>
            </u-list>
          </text>
        </u-collapse-item>
      </u-collapse>
    </div>

    <div style="height: 80px;"></div>

    <myTabbar></myTabbar>
	</view>
</template>

<script>
import socketIndex from './common/socketIndex';
import myTabbar from '../components/tabbar/myTabbar'



export default {
	data() {
		return {
      // 版本号
      version: "v0.6.0",
      activeNames:['0'],
			show: false,
      updateList:[
        {
          titleArr:["[新增] 卡信息查询 ","[新增] 智能诊断","[新增] 用量记录查询","[新增] 会话记录查询","[新增] 业务办理","[新增] IoTOS界面"],
          desc:"2023-08-06",
        }
        ,{
          titleArr:["[新增] 后台系统通知 用户登录后\n IoTOS-IM及时下发 公告与通知 ","[新增] 实现国际化语言"],
          desc:"2023-07-06",
        }
      ]
		}
	},
	components: {
		socketIndex,
    myTabbar
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