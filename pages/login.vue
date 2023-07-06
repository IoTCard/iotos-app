<template>
  <view class="normal-login-container">
    <view class=" align-center justify-center flex">
		<image style="width: 100px;height: 130px;" :src="globalConfig.appInfo.logo" mode="widthFix"></image>
    </view>
	 <view class="logo-content align-center justify-center flex">
		 
		 <text class="title">IoTOS-App 
		 <img style="width: 35px;" @click="show=true" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElD
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
		 </text>
		  
	</view>
	 
		
	
	
	
	
	<u-popup :show="show" :round="10" mode="bottom" @close="show=false" >
		<view>
			<LangSelect/>
		</view>
	</u-popup>
	

	
    <view class="login-form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-user icon"></view>
        <input v-model="loginForm.username" class="input" type="text" :placeholder="login_lCode.pleaseEnter+login_lCode.account" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-password icon"></view>
        <input v-model="loginForm.password" type="password" class="input" :placeholder="login_lCode.pleaseEnter+login_lCode.password" maxlength="20" />
      </view>
    <view class="input-item flex align-center" style="width: 60%;margin: 0px;" v-if="captchaEnabled">
        <view class="iconfont icon-code icon"></view>
         <input v-model="loginForm.code" type="number" class="input" :placeholder="login_lCode.pleaseEnter+login_lCode.verificationCode" maxlength="4" />
      	<view class="login-code">
          <image :src="codeUrl" @click="getCode" class="login-code-img"></image>
        </view  >
     </view>
      <view class="action-btn">
        <button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">{{  login_lCode.logIn }}</button>
      </view>
    </view>

	
    <view class="xieyi text-center">
      <text class="text-grey1">{{  login_lCode.signingInMeansAgreeing }}</text>
      <text @click="handleUserAgrement" class="text-blue">《{{  login_lCode.userAgreement }}》</text>
      <text @click="handlePrivacy" class="text-blue">《{{  login_lCode.privacyAgreement }}》</text>
    </view>
  </view>
</template>

<script>
  import { getCodeImg } from '@/api/login'
  import LangSelect from '@/components/LangSelect'

  export default {
	components: { LangSelect },
    data() {
      return {
		show: false,
		  
        codeUrl: "",
        captchaEnabled: true,
        globalConfig: getApp().globalData.config,
        loginForm: {
          username: "iotos",
          password: "iotos.top",
          code: "",
          uuid: ''
        },
		dialogVisible: false,
		login_lCode:{
			pleaseEnter: this.$t('login_index.pleaseEnter'),
			account: this.$t('login_index.account'),
			password: this.$t('login_index.password'),
			verificationCode: this.$t('login_index.verificationCode'),
			logIn: this.$t('login_index.logIn'),
			signingInMeansAgreeing: this.$t('login_index.signingInMeansAgreeing'),
			userAgreement: this.$t('login_index.userAgreement'),
			privacyAgreement: this.$t('login_index.privacyAgreement'),
			loginPleaseBePatient:this.$t('login_index.loginPleaseBePatient'),
		}
		
      }
    },
    created() {
      this.getCode()
    },
    methods: {
      // 隐私协议
      handlePrivacy() {
        let site = this.globalConfig.appInfo.agreements[0]
        this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      },
      // 用户协议
      handleUserAgrement() {
        let site = this.globalConfig.appInfo.agreements[1]
        this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      },
      // 获取图形验证码
      getCode() {
        getCodeImg().then(res => {
          this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled
          if (this.captchaEnabled) {
            this.codeUrl = 'data:image/gif;base64,' + res.img
            this.loginForm.uuid = res.uuid
          }
        })
      },
      // 登录方法
      async handleLogin() {
        if (this.loginForm.username === "") {
          this.$modal.msgError(this.login_lCode.pleaseEnter+this.login_lCode.account)
        } else if (this.loginForm.password === "") {
          this.$modal.msgError(this.login_lCode.pleaseEnter+this.login_lCode.password)
        } else if (this.loginForm.code === "" && this.captchaEnabled) {
          this.$modal.msgError(this.login_lCode.pleaseEnter+this.login_lCode.verificationCode)
        } else {
          this.$modal.loading(this.login_lCode.loginPleaseBePatient)
          this.pwdLogin()
        }
      },
      // 密码登录
      async pwdLogin() {
        this.$store.dispatch('Login', this.loginForm).then(() => {
          this.$modal.closeLoading();
		  uni.setStorageSync("userName", this.loginForm.username);
		  
          this.loginSuccess();
        }).catch(() => {
          if (this.captchaEnabled) {
            this.getCode()
          }
        })
      },
      // 登录成功后，处理函数
      loginSuccess(result) {
		  console.log(result)
        // 设置用户信息
        this.$store.dispatch('GetInfo').then(res => {
          this.$tab.reLaunch('/pages/index')
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }

  .normal-login-container {
    width: 100%;

    .logo-content {
      width: 100%;
      font-size: 21px;
      text-align: center;
      padding-top: 5%;

      image {
        border-radius: 4px;
      }

      .title {
        margin-left: 10px;
      }
    }

    .login-form-content {
      text-align: center;
      margin: 20px auto;
      margin-top: 10%;
      width: 85%;

      .input-item {
        margin: 20px auto;
        background-color: #f5f6f7;
        height: 45px;
        border-radius: 20px;

        .icon {
          font-size: 38rpx;
          margin-left: 10px;
          color: #999;
        }

        .input {
          width: 100%;
          font-size: 14px;
          line-height: 20px;
          text-align: left;
          padding-left: 15px;
        }

      }

      .login-btn {
        margin-top: 40px;
        height: 45px;
      }

      .xieyi {
        color: #333;
        margin-top: 20px;
      }
      
      .login-code {
        height: 38px;
        float: right;
      
        .login-code-img {
          height: 38px;
          position: absolute;
          margin-left: 10px;
          width: 200rpx;
        }
      }
    }
  }

</style>
