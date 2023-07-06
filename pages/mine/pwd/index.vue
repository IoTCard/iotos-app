<template>
  <view class="pwd-retrieve-container">
    <uni-forms ref="form" :value="user" labelWidth="80px">
      <uni-forms-item name="oldPassword" :label="$t('pwd_index.ordPwd')">
        <uni-easyinput type="password" v-model="user.oldPassword" :placeholder="$t('common.pleaseEnter')+$t('pwd_index.ordPwd')" />
      </uni-forms-item>
      <uni-forms-item name="newPassword" :label="$t('pwd_index.newPwd')">
        <uni-easyinput type="password" v-model="user.newPassword" :placeholder="$t('common.pleaseEnter')+$t('pwd_index.newPwd')" />
      </uni-forms-item>
      <uni-forms-item name="confirmPassword" :label="$t('pwd_index.verifyPwd')">
        <uni-easyinput type="password" v-model="user.confirmPassword" :placeholder="$t('common.pleaseEnter')+$t('pwd_index.verifyPwd')" />
      </uni-forms-item>
      <button type="primary" @click="submit">{{ $t('common.sub') }}</button>
    </uni-forms>
  </view>
</template>

<script>
  import { updateUserPwd } from "@/api/system/user"

  export default {
    data() {
      return {
        user: {
          oldPassword: undefined,
          newPassword: undefined,
          confirmPassword: undefined
        },
        rules: {
          oldPassword: {
            rules: [{
              required: true,
              errorMessage: '旧密码不能为空'
            }]
          },
          newPassword: {
            rules: [{
                required: true,
                errorMessage: '新密码不能为空',
              },
              {
                minLength: 6,
                maxLength: 20,
                errorMessage: '长度在 6 到 20 个字符'
              }
            ]
          },
          confirmPassword: {
            rules: [{
                required: true,
                errorMessage: '确认密码不能为空'
              }, {
                validateFunction: (rule, value, data) => data.newPassword === value,
                errorMessage: '两次输入的密码不一致'
              }
            ]
          }
        }
      }
    },
    onReady() {
      this.$refs.form.setRules(this.rules)
    },
    methods: {
      submit() {
        this.$refs.form.validate().then(res => {
          updateUserPwd(this.user.oldPassword, this.user.newPassword).then(response => {
            this.$modal.msgSuccess("修改成功")
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

  .pwd-retrieve-container {
    padding-top: 36rpx;
    padding: 15px;
  }
</style>
