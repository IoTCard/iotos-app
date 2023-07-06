<template>
  <view class="container">
    <view class="example">
      <uni-forms ref="form" :model="user" labelWidth="80px">
        <uni-forms-item :label="$t('common.nikeName')" name="nickName">
          <uni-easyinput v-model="user.nickName" :placeholder="$t('common.pleaseEnter')+$t('common.nikeName')" />
        </uni-forms-item>
        <uni-forms-item :label="$t('mine_info_index.phoneNumber')" name="phonenumber">
          <uni-easyinput v-model="user.phonenumber" :placeholder="$t('common.pleaseEnter')+$t('mine_info_index.phoneNumber')" />
        </uni-forms-item>
        <uni-forms-item :label="$t('mine_info_index.mail')" name="email">
          <uni-easyinput v-model="user.email" :placeholder="$t('common.pleaseEnter')+$t('common.mail')" />
        </uni-forms-item>
        <uni-forms-item :label="$t('mine_info_index.gender') " name="sex" required>
          <uni-data-checkbox v-model="user.sex" :localdata="sexs" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit">{{ $t('common.sub') }}</button>
    </view>
  </view>
</template>

<script>
  import { getUserProfile } from "@/api/system/user"
  import { updateUserProfile } from "@/api/system/user"

  export default {
    data() {
      return {
        user: {
          nickName: "",
          phonenumber: "",
          email: "",
          sex: ""
        },
        sexs: [{
          text: '男',
          value: "0"
        }, {
          text: '女',
          value: "1"
        }],
        rules: {
          nickName: {
            rules: [{
              required: true,
              errorMessage: this.$t('common.nikeName')+this.$t('common.notNull')
            }]
          },
          phonenumber: {
            rules: [{
              required: true,
              errorMessage: this.$t('mine_info_index.phoneNumber')+this.$t('common.notNull')
            }, {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              errorMessage: this.$t('mine_info_index.ask.phoneNumber')
            }]
          },
          email: {
            rules: [{
              required: true,
              errorMessage: this.$t('mine_info_index.mail')+this.$t('common.notNull')
            }, {
              format: 'email',
              errorMessage: this.$t('mine_info_index.ask.mail')
            }]
          }
        }
      }
    },
    onLoad() {
      this.getUser()
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      getUser() {
        getUserProfile().then(response => {
          this.user = response.data
        })
      },
      submit(ref) {
        this.$refs.form.validate().then(res => {
          updateUserProfile(this.user).then(response => {
            this.$modal.msgSuccess($t('common.updSuccess'))
          })
        })
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }

  .example {
    padding: 15px;
    background-color: #fff;
  }

  .segmented-control {
    margin-bottom: 15px;
  }

  .button-group {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
  }

  .form-item {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .button {
    display: flex;
    align-items: center;
    height: 35px;
    line-height: 35px;
    margin-left: 10px;
  }
</style>
