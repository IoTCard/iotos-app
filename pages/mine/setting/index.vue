<template>
  <view class="setting-container" :style="{height: `${windowHeight}px`}">
    <view class="menu-list">
		<view class="list-cell list-cell-arrow" @click="show=true">
		  <view class="menu-item-box">
			<img style="width: 22px;" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElD
			ICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NW
			Ry8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjg3NTc5NjE3NTU4IiBjbGFzcz0iaWNvbiIg
			dmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53
			My5vcmcvMjAwMC9zdmciIHAtaWQ9IjEzNjIiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB4bWxu
			czp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBhdGggZD0iTTM4OC4xIDY0
			Mi40aDUzLjhjMy45IDAgNi43LTMuOCA1LjUtNy42bC0yNi44LTgyLjZjLTEuNy01LjMtOS4zLTUu
			NC0xMSAwbC0yNyA4Mi42Yy0xLjMgMy44IDEuNSA3LjYgNS41IDcuNnoiIGZpbGw9IiMzYmE0ZmYi
			IHAtaWQ9IjEzNjMiPjwvcGF0aD48cGF0aCBkPSJNNTUzLjMgNDEzLjNIMjc2LjJjLTI5IDAtNTIu
			OCAyMy44LTUyLjggNTIuOFY3NzRjMCAyOSAyMy44IDUyLjggNTIuOCA1Mi44aDI3Ny4xYzI5IDAg
			NTIuOC0yMy44IDUyLjgtNTIuOFY0NjYuMWMwLTI5LjEtMjMuNy01Mi44LTUyLjgtNTIuOHpNNTIw
			IDc1OWMtMi45IDMuNS02LjkgNS45LTExLjcgNi45LTEuNyAwLjQtMy40IDAuNS01IDAuNS0yLjkg
			MC01LjYtMC41LTguMi0xLjYtNi42LTIuOC04LjktNy41LTkuNy0xMS4ybC0yMy4zLTcyLjJjLTEu
			Mi0zLjctNC43LTYuMy04LjYtNi4zaC03OS4zYy0yLjkgMC01LjQgMS44LTYuMyA0LjVsLTI0LjIg
			NzMuOWMtMi4xIDQuNS01LjUgOC0xMC4yIDEwLjMtNC44IDIuMy05LjUgMy0xNC4xIDEuOS02Ljgt
			MS4zLTEwLjMtNS4zLTExLjktOC4zLTEuOC0zLjEtMy4zLTguNiAwLjUtMTYuNGw3OS40LTI0Mi44
			YzUuMS0xMi45IDE0LjYtMTkuNSAyNy43LTE5LjVoMC4yYzEyLjYgMC4zIDIyLjIgNi44IDI3Ljcg
			MTguOGwwLjMgMC43TDUyMi40IDc0NGMxLjkgNS42IDEgMTAuOS0yLjQgMTV6IiBmaWxsPSIjM2Jh
			NGZmIiBwLWlkPSIxMzY0Ij48L3BhdGg+PHBhdGggZD0iTTc2MS43IDIyNC4xaC0yNTRjLTM1LjQg
			MC02NC4zIDI4LjktNjQuMyA2NC4zVjM2N2MwIDYuNCA1LjIgMTEuNSAxMS41IDExLjVoNjguOGM5
			LjcgMCAxOS4xIDEuMiAyOC4yIDMuNi0yLjgtOS4zLTUuMy0xOC44LTcuNS0yOC42aC0zNC42Yy03
			LjUtMC44LTExLjYtNi44LTEyLjMtMTcuOSAwLjctMTEgNC44LTE3IDEyLjMtMTcuOUg2MTdjLTMu
			Ny0xMS02LTIwLjQtNi43LTI4LjEtMS41LTkuMyAxLjktMTUuNyAxMC4xLTE5LjEgOS43LTIuNiAx
			Ni44IDAgMjEuMiA3LjcgMS41IDUuMSAzLjcgMTIuOCA2LjcgMjMgMi4yIDcuNyAzLjcgMTMuMiA0
			LjUgMTYuNmg4OS40YzkuNyAwLjkgMTQuOSA2LjggMTUuNiAxNy45IDAgMTEuMS00LjkgMTctMTQu
			NSAxNy45SDcyMWMtMyAwLTQuNSAwLjQtNC41IDEuMy0xMC40IDUyLjgtMjkuNCA5Ni41LTU3IDEz
			MS40IDIyLjMgMTcuOSA1MC42IDMzLjYgODQuOSA0Ny4yIDkuNyAzLjQgMTMgMTEgMTAuMSAyMy0z
			LjcgOS4zLTExLjIgMTIuMy0yMi4zIDguOS0zNS4yLTEyLjMtNjYuOS0yOC42LTk1LjEtNDguOHYx
			MDkuNmMwIDYuNCA1LjIgMTEuNSAxMS41IDExLjVoMTEzLjNjMzUuNCAwIDY0LjMtMjguOSA2NC4z
			LTY0LjN2LTI4NWMtMC4xLTM1LjQtMjkuMS02NC4zLTY0LjUtNjQuM3oiIGZpbGw9IiMzYmE0ZmYi
			IHAtaWQ9IjEzNjUiPjwvcGF0aD48cGF0aCBkPSJNNjc0LjkgMzUzLjVoLTg4LjdjLTMuNyAwLTYu
			NCAzLjUtNS41IDcgNC4xIDE1LjMgOS40IDMwLjEgMTUuOSA0NC4zIDAuMyAwLjcgMC44IDEuMyAx
			LjQgMS45IDE0LjMgMTIuNSAyNS41IDI4LjYgMzIuMSA0Ni44IDYuNSAwLjggMy43IDAuNSAxMC4y
			IDEuMyAxOS41LTI5LjkgMzIuOC02MS40IDQwLTk0LjQgMC44LTMuNi0xLjktNi45LTUuNC02Ljl6
			IiBmaWxsPSIjM2JhNGZmIiBwLWlkPSIxMzY2Ij48L3BhdGg+PC9zdmc+"> 
			<view>{{$t('index.language')}}</view>
		  </view>
		</view>
      <view class="list-cell list-cell-arrow" @click="handleToPwd">
        <view class="menu-item-box">
          <view class="iconfont icon-password menu-icon"></view>
          <view>{{$t('setting_index.changePassword')}}</view>
        </view>
      </view>
      <view class="list-cell list-cell-arrow" @click="handleToUpgrade">
        <view class="menu-item-box">
          <view class="iconfont icon-refresh menu-icon"></view>
          <view>{{$t('setting_index.checkUpdates')}}</view>
        </view>
      </view>
      <view class="list-cell list-cell-arrow" @click="handleCleanTmp">
        <view class="menu-item-box">
          <view class="iconfont icon-clean menu-icon"></view>
          <view>{{$t('setting_index.clearCache')}}</view>
        </view>
      </view>
    </view>
    <view class="cu-list menu">
      <view class="cu-item item-box">
        <view class="content text-center" @click="handleLogout">
          <text class="text-black">{{$t('setting_index.signOut')}}</text>
        </view>
      </view>
    </view>
	<u-popup :show="show" :round="10" mode="bottom" @close="show=false" >
		<view>
			<LangSelect/>
		</view>
	</u-popup>
	<u-toast ref="uToast"></u-toast>
  </view>
</template>

<script>
  import LangSelect from '@/components/LangSelect'
	
  export default {
	components: { LangSelect },
    data() {
      return {
        windowHeight: uni.getSystemInfoSync().windowHeight,
		show: false,
      }
    },
    methods: {
      handleToPwd() {
        this.$tab.navigateTo('/pages/mine/pwd/index')
      },
      handleToUpgrade() {
        this.$modal.showToast(this.$t('mine_index.construction'))
      },
      handleCleanTmp() {
			try {
				uni.clearStorageSync();
				this.$refs.uToast.show({type: 'success',message: this.$t('common.success'),})
			} catch (e) {
				this.$refs.uToast.show({type: 'error',message: this.$t('common.error'),})
			}
      },
      handleLogout() {
        this.$modal.confirm(this.$t('mine_index.askExit')+'？').then(() => {
          this.$store.dispatch('LogOut').then(() => {
            this.$tab.reLaunch('/pages/index')
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page {
    background-color: #f8f8f8;
  }

  .item-box {
    background-color: #FFFFFF;
    margin: 30rpx;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10rpx;
    border-radius: 8rpx;
    color: #303133;
    font-size: 32rpx;
  }
</style>
