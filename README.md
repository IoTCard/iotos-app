# IoTOS-App v0.6.0

> 后端程序为 https://gitee.com/chinaiot/iotos
<p></p>

![IoTOS logo.png](readme-pic/cn/logo.png)



## 一款高效实用 IoTCard 管理 & 运营系统 - 移动端。

> IoTOS 移动端；基于[RuoYi-App](https://gitee.com/y_project/RuoYi-App?_from=gitee_search) 开发 适配国际化多语言 UI 使用 [uView](https://gitee.com/umicro/uView) ，集成 [J-IM](https://gitee.com/xchao/j-im?_from=gitee_search)([t-io](https://gitee.com/tywo45/t-io?_from=gitee_search) 网络框架 谭聊原型核心)


中文 / [English](README.en.md)

<div class="shields-wrapper">
<a target="_blank" class="shields-wrapper-image" href='https://github.com/IoTCard/iotos-app'><img  alt="GitHub license" src="https://img.shields.io/github/license/IoTCard/iotos-app?style=flat-square&logo=github&color=616ae5"></a>
          <a target="_blank" class="shields-wrapper-image" href='https://github.com/IoTCard/iotos-app'><img  alt="GitHub stars" src="https://img.shields.io/github/stars/IoTCard/iotos-app?style=flat-square&logo=github&color=616ae5"></a>
          <a target="_blank" class="shields-wrapper-image" href='https://github.com/IoTCard/iotos-app'><img alt="GitHub forks" src="https://img.shields.io/github/forks/IoTCard/iotos-app?style=flat-square&logo=github&color=616ae5"></a>
<a target="_blank" href='https://gitee.com/chinaiot/iotos-app/stargazers'><img src='https://gitee.com/chinaiot/iotos-app/badge/star.svg?theme=dark' alt='star'></img></a>
<a target="_blank" href='https://gitee.com/chinaiot/iotos-app/members'><img src='https://gitee.com/chinaiot/iotos-app/badge/fork.svg?theme=dark' alt='fork'></img></a>
</div>


# 一、 关于 IoTOS-App

## 1.1 介绍

IoTOS-App 移动解决方案，采用uniapp框架，一份代码多终端适配，同时支持APP、小程序、H5！实现了与[IoTOS](https://gitee.com/chinaiot/iotos)、[IoTOS-IM](https://gitee.com/chinaiot/iotos-im)完美对接的移动解决方案！目前已经实现登录、国际语言切换、工作台、编辑资料、头像修改、密码修改、常见问题、关于我们等基础功能。

* 配套后端代码仓库地址[IoTOS](https://gitee.com/chinaiot/iotos) 。
* 中间件网络框架[IoTOS-IM](https://gitee.com/chinaiot/iotos-im) 。
* 应用框架基于[uniapp](https://uniapp.dcloud.net.cn)，支持小程序、H5、Android和IOS。
* 前端组件采用[uView](https://gitee.com/umicro/uView)，全端兼容的高性能UI框架。

## 1.2 功能介绍

> 目前已实现功能

- 后台系统通知 用户登录后通过 IoTOS-IM 及时下发 公告 与通知
- 实现国际化语言

# 二、演示安装包

- 'apk' 目录下 [iotos-app_v0.6.0.apk](/apk/iotos-app_v0.6.0.apk)  【安卓版本】
- 'apk' 目录下 [iotos-app_v0.1.0.apk](/apk/iotos-app_v0.1.0.apk)  【安卓版本】

# 三、后台演示地址

开源演示地址：[http://demo.iotos.top/](http://demo.iotos.top/)

默认账号密码：iotos，iotos.top


# 四、联系我们

如果你想加入我们的开源交流群、有任何 IoTOS 产品上的想法、意见或建议，或商务上的合作需求，请扫码添加 IoTOS 项目作者，加入群聊：

- 微信

![WeChat](readme-pic/cn/contact1.jpg)


- 微信公众号

![WeChatPublicAccount](readme-pic/cn/gzhewm.gif)

# 五、更新日志


## V0.1.0 更新日志

- [x] 多语言国际化；
- [x] 系统通知与公告；

## V0.6.0 更新日志

- [x] 工作台UI样式优化 工作台增加卡号查询跳转功能输入卡号后，点击跳转功能自动载入卡号填写进入功能搜索或待执行状态；搜索返回后载入上一次搜索卡号在搜索框中。；
- [x] 新增卡信息查询 单卡信息查询适配PC端卡详情展示；提供一键复制功能到剪切板；可编辑IMEI、备注、分组。提供一键跳转到智能诊断。；
- [x] 新增智能诊断 适配PC端智能诊断，还原诊断动效与信息展示；卡状态、设备状态、是否冻结、通信服务、策略限制、状态变更记录。；
- [x] 新增用量记录 适配PC端用量记录以表格行形式展示用量记录、日用量、月用量记录日期，提供按月查询一键复制到剪切板。；
- [x] 新增会话记录 适配PC端会话记录；展示会话时间、在线状态、接入方式、APN、IP地址、ipv6、ipv6Prefix；
- [x] 新增批量业务办理 适配PC端批量业务办理；提供批量 停复机&断开网、网络重置、灵活变更卡状态；单次100卡号上限，执行任务可在PC端 执行任务 查询。；
- [x] 新增IoTOS界面 主要展示更新日志记录。；
- [x] 新增消息界面UI 后续如果拓展企业内部交流消息或推送消息展示等提供编辑的消息展示，为后续业务做铺垫，感兴趣的可自行拓展。；

# 六、项目展示

- 登录页

![loginLgChange](readme-pic/cn/loginLgChange.jpg)

- 工作台

![workIndex](readme-pic/cn/work_index_app.png)

- 我的

![my](readme-pic/cn/my.png)

- 语言切换

![lgChange](readme-pic/cn/lgChange.jpg)

- 登录公告与通知{#app-notify}

![notify](readme-pic/cn/notify.jpg)

- 卡信息查询{#app-cardInfo_app}

![cardInfo_app](readme-pic/cn/cardInfo_app.png)

- 会话记录{#app-cardSession_app}

![cardSession_app](readme-pic/cn/cardSession_app.png)

- 智能诊断{#app-diagnosis_app}

![diagnosis_app](readme-pic/cn/diagnosis_app.png)

- 用量记录{#app-usedRecord_app}

![usedRecord_app](readme-pic/cn/usedRecord_app.png)

- 业务办理{#app-cardApiBuinessHandIing_app}

![cardApiBuinessHandIing_app](readme-pic/cn/cardApiBuinessHandIing_app.png)

- 通知消息{#app-notify_app}

> 暂未实现 仅完善了单界面ui

![notify_app](readme-pic/cn/notify_app.png)
