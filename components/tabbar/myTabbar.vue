<template>

  <view v-if="showselected">
    <view class="tabbar">
      <view class="box">
        <view class="item" v-for="(item,index) in tabBar.list" :key="item.pagePath"
              @click="switchTab(index,item)">

          <view class="icon" v-if="item.flag == 'icon'">
            <image :src="item.iconPath" class="icon" v-if="selectedIndex !== index">
              <image :src="item.selectedIconPath" class="icon" v-else>
                <view>
                  <text :class="['item-text',{'text-active':selectedIndex === index}]">{{item.text}}</text>
                </view>
          </view>
          <view class="icon iotos"
                v-else>
            <image :src="item.iconPath" mode=""></image>
          </view>
        </view>
      </view>
    </view>
  </view>

</template>

<script>

export default {
  onLoad(){
    uni.hideTabBar();
  },
  data() {
    return {
      selectedIndex: uni.getStorageSync('selectedIndex') || 0,  // 是否选中
      showselected: true, // 是否启用tarBer
      tabBar: {
        list: [{
          "flag": 'icon',
          "pagePath": "pages/index",
          "iconPath": "/static/images/tabbar/home.png",
          "selectedIconPath": "/static/images/tabbar/home_.png",
          "text": this.$t("tabbar.index")
        },{
          "flag": 'icon',
          "pagePath": "pages/work/index",
          "iconPath": "/static/images/tabbar/work.png",
          "selectedIconPath": "/static/images/tabbar/work_.png",
          "text": this.$t("tabbar.work"),
        },{
          "flag": 'iotos',
          "pagePath": "pages/IoTOS",
          "iconPath": "/static/images/tabbar/iotos.png",
          "selectedIconPath": "/",
          "text": ""
        },{
          "flag": 'icon',
          "pagePath": "pages/notify/index",
          "iconPath": "/static/images/tabbar/msg.png",
          "selectedIconPath": "/static/images/tabbar/msg_.png",
          "text": this.$t("tabbar.notify"),
        },{
          "flag": 'icon',
          "pagePath": "pages/mine/index",
          "iconPath": "/static/images/tabbar/mine.png",
          "selectedIconPath": "/static/images/tabbar/mine_.png",
          "text": this.$t("tabbar.mine"),
        }
        ]
      },



    }
  },
  methods: {


    switchTab(index, item) {
      let url = '/' + item.pagePath
      let pagePath = url;
      uni.setStorageSync('selectedIndex', index);
      /*this.tabBar.list.forEach((v, i) => {
        if (item.pagePath === v.pagePath) {
          uni.setStorageSync('selectedIndex', i);
        }
      })*/
      uni.switchTab({url})
    },


  }
}
</script>
<style lang="scss">

.tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 130rpx;
  z-index: 999;
  background: #ffffff;
  border-top: 2rpx solid #eee;

  .box {
    padding: 0 40rpx;
    display: flex;
    justify-content: space-around;
    .item {
      width: 15%;
      .icon {
        margin-top: 10rpx;
        width: 100%;
        font-size: 24rpx;
        color: grey;
        text-align: center;
        image {
          width: 50rpx;
          height: 50rpx;
        }

        .text-active {
          color: #3ba4ff;
        }
      }
      .iotos {
        height: 100rpx;
        width: 130rpx;
        border-radius: 50rpx ;
        top: -10px;
        position: absolute;
        image {
          top: -8px;
          width: 120rpx;
          height: 150rpx;
        }
      }
    }
  }
}

</style>