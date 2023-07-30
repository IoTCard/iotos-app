<template>
	<view class="mine-container" :style="{height: `${windowHeight}px`}">
		<!--顶部个人信息栏-->
		<view class="header-section">
			<view class="flex padding justify-between">
				<view class="flex align-center">
					<view v-if="!avatar" class="cu-avatar xl round bg-white">
						<view class="iconfont icon-people text-gray icon"></view>
					</view>
					<image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round bg-white"
						mode="widthFix">
					</image>


					<view v-if="!name" @click="handleToLogin" class="login-tip">
						{{ $t('mine_index.clickLogin') }}
					</view>
					<view v-if="name" @click="handleToInfo" class="user-info">
						<view class="u_title">
							{{ $t('mine_index.username') }}：{{ name }}
						</view>
					</view>
				</view>
				<view @click="handleToInfo" class="flex align-center">
					<text>{{ $t('mine_index.info') }}</text>
					<view class="iconfont icon-right"></view>
				</view>
			</view>
		</view>

<!--
    <uni-list-item showExtraIcon="true" :extraIcon="{type: 'person-filled'}" :title="$t('common.nikeName')" :rightText="user.nickName" />
-->

		<u-popup :show="showPlacard" mode="center" @close="closePlacard">
			<view style="width: 100%;margin: auto;">

				<image class="logo" style="height: 180px;" src="@/static/gzhewm.gif"></image>

				<u-button style="width: 80%;" type="primary" @click="closePlacard" text="确认"></u-button>
			</view>
		</u-popup>


		<view class="content-section">
			<view class="mine-actions grid col-4 text-center">
				<view class="action-item" @click="showPlacard=true">
					<view class="iconfont icon-friendfill text-pink icon"></view>
					<text class="text">{{ $t('mine_index.exchange') }}</text>
				</view>
				<view class="action-item" @click="showPlacard=true">
					<view class="iconfont icon-service text-blue icon"></view>
					<text class="text">{{ $t('mine_index.service') }}</text>
				</view>
				<view class="action-item" @click="showPlacard=true">
					<view class="iconfont icon-community text-mauve icon"></view>
					<text class="text">{{ $t('mine_index.feedback') }}</text>
				</view>
				<view class="action-item" @click="showPlacard=true">
					<view class="iconfont icon-dianzan text-green icon"></view>
					<text class="text">{{ $t('mine_index.likeUs') }}</text>
				</view>
			</view>

			<view class="menu-list">
				<view class="list-cell list-cell-arrow" @click="handleToEditInfo">
					<view class="menu-item-box">
						<view class="iconfont icon-user menu-icon"></view>
						<view>{{ $t('mine_index.edit') }}</view>
					</view>
				</view>
				<view class="list-cell list-cell-arrow" @click="handleHelp">
					<view class="menu-item-box">
						<view class="iconfont icon-help menu-icon"></view>
						<view>{{ $t('mine_index.problem') }}</view>
					</view>
				</view>
				<view class="list-cell list-cell-arrow" @click="handleAbout">
					<view class="menu-item-box">
						<view class="iconfont icon-aixin menu-icon"></view>
						<view>{{ $t('mine_index.about') }}</view>
					</view>
				</view>
				<view class="list-cell list-cell-arrow" @click="handleToSetting">
					<view class="menu-item-box">
						<view class="iconfont icon-setting menu-icon"></view>
						<view>{{ $t('mine_index.settings') }}</view>
					</view>
				</view>
			</view>

		</view>
    <myTabbar></myTabbar>
	</view>
</template>

<script>
	import storage from '@/utils/storage'
  import myTabbar from '../../components/tabbar/myTabbar'

	export default {
    components: {
      myTabbar
    },
		data() {
			return {
				name: this.$store.state.user.name,
        nickName: this.$store.state.user,
				version: getApp().globalData.config.appInfo.version,
				showPlacard: false,
			}
		},
		computed: {
			avatar() {
				return this.$store.state.user.avatar
			},
			windowHeight() {
				return uni.getSystemInfoSync().windowHeight - 50
			}
		},
		methods: {

			//关闭
			closePlacard() {
				this.showPlacard = false;
			},

			handleToInfo() {
        console.log(this.$store.state.user)
				this.$tab.navigateTo('/pages/mine/info/index')
			},
			handleToEditInfo() {
				this.$tab.navigateTo('/pages/mine/info/edit')
			},
			handleToSetting() {
				this.$tab.navigateTo('/pages/mine/setting/index')
			},
			handleToLogin() {
				this.$tab.reLaunch('/pages/login')
			},
			handleToAvatar() {
				this.$tab.navigateTo('/pages/mine/avatar/index')
			},
			handleLogout() {
				this.$modal.confirm(this.$t('mine_index.askExit') + '？').then(() => {
					this.$store.dispatch('LogOut').then(() => {
						this.$tab.reLaunch('/pages/index')
					})
				})
			},
			handleHelp() {
				this.$tab.navigateTo('/pages/mine/help/index')
			},
			handleAbout() {
				this.$tab.navigateTo('/pages/mine/about/index')
			},
			handleJiaoLiuQun() {
				this.$modal.showToast('微信：iotos_top')
			},
			handleBuilding() {
				this.$modal.showToast(this.$t('mine_index.construction'))
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f6f7;
	}

	.mine-container {
		width: 100%;
		height: 100%;


		.header-section {
			padding: 7px 7px 35px 7px;
			background-color: rgb(59, 164, 255);
			color: white;

			.login-tip {
				font-size: 18px;
				margin-left: 10px;
			}

			.cu-avatar {
				border: 2px solid #eaeaea;

				.icon {
					font-size: 40px;
				}
			}

			.user-info {
				margin-left: 15px;

				.u_title {
					font-size: 18px;
					line-height: 30px;
				}
			}
		}

		.content-section {
			position: relative;
			top: -50px;

			.mine-actions {
				margin: 15px 15px;
				padding: 20px 0px;
				border-radius: 8px;
				background-color: white;

				.action-item {
					.icon {
						font-size: 28px;
					}

					.text {
						display: block;
						font-size: 13px;
						margin: 8px 0px;
					}
				}
			}
		}
	}
</style>