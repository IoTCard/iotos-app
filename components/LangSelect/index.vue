<template>
  <view class="content">
	
<!-- 	<view class="title">{{$t('index.demo')}}</view>
	<view class="description">{{$t('index.demo-description')}}</view>
	<view class="detail-link">{{$t('index.detail')}}: <text
	    class="link">https://uniapp.dcloud.net.cn/collocation/i18n</text></view>
	<view class="locale-setting">{{$t('index.language-info')}}</view>
	<view class="list-item">
	  <text class="k">{{$t('index.system-language')}}:</text>
	  <text class="v">{{systemLocale}}</text>
	</view>
	<view class="list-item">
	  <text class="k">{{$t('index.application-language')}}:</text>
	  <text class="v">{{applicationLocale}}</text>
	</view>
	<view class="locale-setting">{{$t('index.language')}}</view> -->
	<u-toast ref="uToast"></u-toast>

	<u-radio-group
	style="width: 85%;padding: 8%;"
	    v-model="applicationLocale"
	    placement="column"
		iconPlacement="right"
	  >
	    <u-radio
	
	      :customStyle="{marginBottom: '8px'}"
	      v-for="(item, index) in locales"
	      :key="index"
	      :label="item.text"
	      :name="item.code"
	      @change="onLocaleChange(item)"
	    >
	    </u-radio>
	  </u-radio-group>

	
	
	
  </view>
</template>

<script>
import { setLg } from "@/api/system/user"

	
import tools from '../../utils/iotos/tools';
  export default {
	created() {
	 let lgCode = uni.getStorageSync("lgCode");
	 if(tools.isNull(lgCode)){
	 	let lang = 'auto';
	 	if(lgCode=='zh-CN'){
	 	  lang = "zh-Hans";
	 	}else if(lgCode=='zh-TW'){
	 	  lang = "zh-Hant";
	 	}else if(lgCode=='en'){
	 	  lang = "en";
	 	}
		this.applicationLocale = lang;
	}
	},
	data() {
		return {
			show: false,
			systemLocale:'',
			applicationLocale:'auto',
			isAndroid:'',
		}
	},
    computed:{
      locales() {
        return [{
            text: this.$t('locale.auto'),
            code: 'auto'
          }, {
            text: this.$t('locale.en'),
            code: 'en'
          },
          {
            text: this.$t('locale.zh-hans'),
            code: 'zh-Hans'
          },
          {
            text: this.$t('locale.zh-hant'),
            code: 'zh-Hant'
          }
        ]
      }
    },
    onLoad() {
      let systemInfo = uni.getSystemInfoSync();
      this.systemLocale = systemInfo.language;
      this.applicationLocale = uni.getLocale();
      this.isAndroid = systemInfo.platform.toLowerCase() === 'android';
      uni.onLocaleChange((e) => {
        this.applicationLocale = e.locale;
      })
    },
    methods: {
      onLocaleChange(e) {
			//储存key 相当于 Cookies
			let lgCode = uni.getStorageSync("lgCode");
			let lang = e.code;
		if(tools.isNull(lgCode)){
			let map ={};
			if(lang=='zh-Hans'){
			  map.lgCode = "zh-CN";
			}else if(lang=='zh-Hant'){
			  map.lgCode = "zh-TW";
			}else {
			  map.lgCode = "en";
			}
		
			let pwdStr = tools.encrypt(JSON.stringify(map));
			setLg(pwdStr).then(response => {
			  let jsonObj = JSON.parse(tools.Decrypt(response));
			  if (jsonObj.code == 200) {
				uni.setStorageSync("lgCode",map.lgCode);
				this.$refs.uToast.show({type: 'success',message: jsonObj.msg,})
			  } else {
				this.$refs.uToast.show({type: 'error',message: jsonObj.msg,})
			  }
			})
	     }
			
			
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


