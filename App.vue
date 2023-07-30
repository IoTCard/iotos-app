<script>
  import config from './config'
  import store from '@/store'
  import { getToken } from '@/utils/auth'
  import tools from '@/utils/iotos/tools'

  export default {
    onLaunch: function() {
      uni.hideTabBar();
      this.initApp();
    },
    methods: {
      // 初始化应用
      initApp() {
        // 初始化应用配置
        this.initConfig()
        // 检查用户登录状态
        //#ifdef H5
        this.checkLogin()
        //#endif
      },
      initConfig() {
        this.globalData.config = config
      },
      checkLogin() {
        if (tools.isNull(getToken())) {
          uni.setStorageSync('selectedIndex', 2);
          this.$tab.reLaunch('/pages/IoTOS')
        }else{
          //

        }
      }
    }
  }
</script>

<style lang="scss">
  @import '@/static/scss/index.scss'
</style>
<style>
.uni-app--showleftwindow  +  .uni-tabbar-bottom {
  display: none;
}
.content{
  padding-bottom: calc(var(--window-bottom) + 20px);
}
</style>