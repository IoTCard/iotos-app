<template>
  <view class="about-container">
    <view class="header-section text-center">
      <image style="width: 150rpx;height: 150rpx;" src="/static/logo200.png" mode="widthFix">
      </image>
      <uni-title type="h2" title="IoTOS-App"></uni-title>
    </view>

    <view class="content-section">
      <view class="menu-list">
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>{{ $t('about_index.version') }}</view>
            <view class="text-right">v{{version}}</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>{{ $t('about_index.ofEmail') }}</view>
            <view class="text-right">card@iotos.top</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>{{ $t('about_index.weChat') }}</view>
			<view class="text-right">
				<uni-link href="https://gitee.com/chinaiot/iotos/blob/master/readme-pic/cn/contact1.jpg" text="iotos_top" showUnderLine="false"></uni-link>
			</view>
          </view>
        </view>
		<view class="list-cell list-cell-arrow">
		  <view class="menu-item-box">
		    <view>{{ $t('about_index.noPublic') }}</view>
			<view class="text-right">
				<uni-link href="https://mp.weixin.qq.com/s/-rNuGZlG2BEYK759SYLGNg" text="chinaiot_iotos" showUnderLine="false"></uni-link>
			</view>
		  </view>
		</view>
        <view class="list-cell list-cell-arrow">
          <view class="menu-item-box">
            <view>{{ $t('about_index.ofWebsite') }}</view>
            <view class="text-right">
              <uni-link href="http://www.iotos.top" text="www.iotos.top" showUnderLine="false"></uni-link>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="copyright">
      <view>Copyright &copy; 2023 iotos.top All Rights Reserved.</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        url: getApp().globalData.config.appInfo.site_url,
        version: getApp().globalData.config.appInfo.version
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f8f8f8;
  }

  .copyright {
    margin-top: 50rpx;
    text-align: center;
    line-height: 60rpx;
    color: #999;
  }

  .header-section {
    display: flex;
    padding: 30rpx 0 0;
    flex-direction: column;
    align-items: center;
  }
</style>
