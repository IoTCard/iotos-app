<template>
	<view >
		<div >
			<u-notice-bar  v-for="(item,listIndex) in listText" :key="listIndex"  
			style="margin-bottom: 3px;" :text="item.text" bgColor="rgb(59, 164, 255)" color="#ffffff" mode="closable" speed="100" @click="jump(item.url)"></u-notice-bar>
		</div>
		<u-popup :show="showPlacard" mode="center" @close="closePlacard">
			<view style="width: 95%;margin: auto;">
				 <h4 style="margin-top: 15px;margin-bottom: 15px;">{{ notice.notice_title }}</h4>
				<u-parse style="margin-top: 15px;margin-bottom: 15px;" :content="notice.notice_content"></u-parse>

				<u-button style="width: 80%;" type="primary" @click="closePlacard" text="确认"></u-button>
			</view>
		</u-popup>




	</view>
</template>

<script>
import { getToken } from '../../utils/auth';
import tools from '../../utils/iotos/tools';


export default {
	
	data() {
		return {
			show: false,
			listText:[],
			showPlacard: false,
			notice: {},
			ip:"127.0.0.1",
			port:"8072",
			socket:null,
			username:null,
			password:null,
			curUser: {},
		}
	},
	computed: {

	},
	created() {
		this.loginSocket(uni.getStorageSync("userName"), getToken());//登录账号和 token
	},
	methods: {


		// 创建 Socket 连接到服务端 接受消息
		loginSocket(username, password) {
			this.username = username;
			this.password = password;
			this.socket = uni.connectSocket({
				url: "ws:" + this.ip + ":" +  this.port + "?username=" + username + "&password=" + password
			}); //创建 连接
		
			uni.onSocketOpen(function(data) { //监听WebSocket连接打开事件。
				//console.log('WebSocket连接已打开！');
				
			});
		
			uni.onSocketError(function(res) { //监听WebSocket错误。
				console.log('WebSocket连接打开失败，请检查！');
			});
			let _this =this;
			uni.onSocketMessage(function(res) { //监听WebSocket接受到服务器的消息事件。
				console.log('onSocketMessage！');
				let dataObj = JSON.parse(res.data)
				console.log(dataObj);
				let code = dataObj.code;
				let command = dataObj.command;
				if (command == 11) { //接收到聊天响应处理;
					_this.COMMAND_CHAT_RESP(dataObj);
				} else if (command == 18) { //获取用户信息响应处理;
					_this.COMMAND_GET_USER_RESP(dataObj);
				} else if (10000 == code && command == 12) { //聊天发送状态;
					_this.COMMAND_CHAT_RESP_SEND_STATUS(dataObj);
				} else if (command == 9) { //加入群组的消息通知处理;
					_this.COMMAND_JOIN_GROUP_NOTIFY_RESP(dataObj);
				} else if (command == 10) {
					_this.COMMAND_EXIT_GROUP_NOTIFY_RESP(dataObj);
				} else if (command == 20 && code == 10015) {
					//获取消息失败，未开启持久化处理
					//...
				} else if (command == 20 && code == 10016) { //处理离线消息;
					var msgFlag = "离线消息";
					_this.COMMAND_GET_MESSAGE_RESP(dataObj, msgFlag);
				} else if (command == 20 && code == 10018) { //处理历史消息;
					var msgFlag = "历史消息";
					var msgObj = dataObj;
					if (msgObj) {
						_this.COMMAND_GET_MESSAGE_RESP(dataObj, msgFlag);
					} else { //没有历史消息;
						_this.OTHER(dataObj);
					}
				} else if (command == 6) { //登陆命令返回状态处理
					_this.COMMAND_LOGIN_RESP(dataObj);
				} else if (10007 == code) { //登录成功;
					_this.COMMAND_LOGIN_RESP(username);
				} else if (10008 == code) { //登录失败;
					_this.OTHER(username);
				} else {
					_this.OTHER(dataObj);
				}
		
		
			})
			uni.onSocketError(function(res) {
				console.log('WebSocket连接打开失败，请检查！');
			});
		
		
		
		
		},
		
		/**
		 * 发送消息
		 * @param {Object} msg 消息主体 
		 {
		   "from": "来源ID",
		   "to": "目标ID",
		   "cmd":"命令码(11)int类型",
		   "createTime": "消息创建时间long类型",
		   "msgType": "消息类型int类型(0:text、1:image、2:voice、3:vedio、4:music、5:news)",
		   "chatType":"聊天类型int类型(0:未知,1:公聊,2:私聊)",
		   "groupId":"群组id仅在chatType为(1)时需要,String类型",
		   "content": "内容",
		   "extras" : "扩展字段,JSON对象格式如：{'扩展字段名称':'扩展字段value'}"
		}
		 * @param {Object} successFn 成功之后执行函数
		 * @param {Object} failFn 失败时执行函数
		 * @param {Object} completeFn 最终执行函数
		 */
		send(msg, successFn, failFn, completeFn) {
			
			let jsonMsg = msg;
			if (Object.prototype.toString.call(msg) !== "[object object]") {
				jsonMsg = JSON.stringify(msg);
			}
			console.log("jsonMsg = ")
			console.log(jsonMsg)
			uni.sendSocketMessage({
				data: jsonMsg,
				success(res) {
					if (successFn != null) {
						successFn(res);
					}
				},
				fail(res) {
					if (failFn != null) {
						failFn(res);
					}
				},
				complete(res) {
					if (failFn != null) {
						completeFn(res);
					}
				}
			});
		},
		
		
		//登录通知处理
		COMMAND_LOGIN_RESP(username) {
			console.log("<font color='green' size='1'>连接成功...</font><br>");
			var userCmd = {
				"cmd": 17,
				"type": "0",
				"userId": "" + username + ""
			};
			var msgCmd = {
				"cmd": 19,
				"type": "0",
				"userId": "" + username + ""
			};
			this.send(userCmd); //获取登录用户信息;
			this.send(msgCmd); //获取用户离线消息(好友+群组);
		}
		,
		COMMAND_EXIT_GROUP_NOTIFY_RESP(data) {
			var exitGroupNotify = data.data;
			console.log(exitGroupNotify)
			console.log(this.curUser)
			var onlineUserCmd = "{\"cmd\":17,\"type\":\"0\",\"userId\":\"" + this.curUser.userId + "\"}";
			console.log("<font color='#A3A3A3' size='1'>" + exitGroupNotify.user.nick + "(" + exitGroupNotify.user.userId +
				")退出群聊...</font><br>");
			this.send(onlineUserCmd); //获取在线用户列表;
		},
		//加入群组的消息通知处理;
		COMMAND_JOIN_GROUP_NOTIFY_RESP(data) {
			var user = data.user;
			this.curUser = user;
			console.log(user)
			console.log(this.curUser)
			console.log("<font color='#A3A3A3' size='1'>" + user.nick + "(" + data.user.userId + ")加入群聊...</font><br>");
			var onlineUserCmd = "{\"cmd\":17,\"type\":\"0\",\"userId\":\"" + this.curUser.userId + "\"}";
			this.send(onlineUserCmd); //获取在线用户列表;
		}
		,
		//加入群组响应状态处理;
		COMMAND_JOIN_GROUP_RESP(data) {
			//成功加入群组响应信息;
		},
		//发送聊天请求发送状态处理;
		COMMAND_CHAT_RESP_SEND_STATUS(data) {
			//发送成功后的状态处理...
		},
		//获取用户信息响应处理;
		COMMAND_GET_USER_RESP(data) {
			console.log("COMMAND_GET_USER_RESP")
			console.log(data)
			var user = data.data;
			this.curUser = user;
			this.initOnlineUsers();
		},
		//接收到聊天响应处理;
		COMMAND_CHAT_RESP(data) {
			var chatObj = data.data;
			console.log("COMMAND_CHAT_RESP")
			console.log(chatObj)
			var createTime = tools.formatTimestamp(chatObj.createTime);
			var from = chatObj.from;
			if (from == this.username)
				return;
			var content = chatObj.content;
			console.log(from)
			if(from=='IoTOSAdmin'){//系统消息
				var msgType = chatObj.msgType;
				console.log(msgType==5)
				
				
				if(msgType==5){//公告
				
					let notice_content = content;
					let title  = "系统公告 ["+createTime+"] ";
					if(content.indexOf("content")!=-1){
						 content = JSON.parse(content);
						 notice_content = content.content;
						 title = content.title;
					}
					let notice =  {notice_title:'',notice_content:''};
					notice.notice_title = title;
					notice.notice_content = notice_content;
					this.notice = notice;
					this.showPlacard = true;
					console.log(this.notice)
				}else if(msgType==0){//通知
					let text = content;
					let url  = "";
					if(content.indexOf("content")!=-1){
						 content = JSON.parse(content);
						 text = content.content;
						 url = content.url;
					}
					let item = {};
					item.text = text;
					const regex = /<p>(https?:\/\/[^\s<]+)<\/p>/i;
					const match = url.match(regex);
					if (match) {
					   url = match[1];
					}
					item.url = url;
					this.listText.push(item);
				}
				
			}else{
				var user = this.getOnlineUserById(from);
				if (user) {
					console.log("<font color='#009ACD' size='1' style='font-weight: bold'>" + user.nick + "(" + user.id + ")" +
						" " + createTime + "</font><br>");
				} else {
					console.log("<font color='#009ACD' size='1' style='font-weight: bold'>" + from + " " + createTime +
						"</font><br>");
				}
				//处理数据
				console.log("<font color='#FFFFFF' size='1'>&nbsp;" + content + "</font><br>");
			}
			
			
			
			
			
			
			
			
		},
		//处理用户同步+持久化消息
		COMMAND_GET_MESSAGE_RESP(data, msgFlag) {
			var msgObj = data.data;
			this.friendOfflineMessage(msgObj, msgFlag);
			this.groupOfflineMessage(msgObj, msgFlag);
		},
		//好友消息
		friendOfflineMessage(msgObj, msgFlag) {
			var friends = msgObj.friends;
			for (var key in friends) {
				var chatDatas = friends[key];
				for (var index in chatDatas) {
					var user_id = chatDatas[index].from;
					var createTime = tools.formatTimestamp(chatDatas[index].createTime);
					console.log("<font color='	#009ACD' size='1' style='font-weight: bold'>" + user_id +
						"</font><font color='#DC143C' size='1' style='font-weight: bold'>(好友" + msgFlag + ")</font>" +
						"<font color='#009ACD' size='1' style='font-weight: bold'>" + createTime + "</font><br>");
					console.log("<font color='#FFFFFF' size='1'>&nbsp;" + chatDatas[index].content + "</font><br>");
				}
			}
		},
		//群组消息
		groupOfflineMessage(msgObj, msgFlag) {
			var groups = msgObj.groups;
			for (var key in groups) {
				var chatDatas = groups[key];
				for (var index in chatDatas) {
					var user_id = chatDatas[index].from;
					var createTime = tools.formatTimestamp(chatDatas[index].createTime);
					console.log("<font color='	#009ACD' size='1' style='font-weight: bold'>" + user_id +
						"</font><font color='#DC143C' size='1' style='font-weight: bold'>(群聊[" + chatDatas[index]
						.groupId + "]" + msgFlag + ")</font>" +
						"<font color='#009ACD' size='1' style='font-weight: bold'>" + createTime + "</font><br>");
					console.log("<font color='#FFFFFF' size='1'>&nbsp;" + chatDatas[index].content + "</font><br>");
				}
			}
		},
		//其它信息处理;
		OTHER(data) {
			//处理数据
			console.log("<font color='green' size='1'>" + data + "</font><br>");
		},
		getOnlineUserById(id) {
			if(this.curUser!=null){
				var groups = this.curUser.groups;
				var onlineUserStr = "";
				console.log(groups);
				if(groups!=null){
					for (var g = 0; g < groups.length; g++) {
						var group = groups[g];
						var users = group.users;
						for (var u = 0; u < users.length; u++) {
							var user = users[u];
							if (user.id == id) {
								return user;
							}
						}
					}
				}
			}
		},
		initOnlineUsers() {
			if(this.curUser!=null && this.curUser.groups!=null){
				var groups = this.curUser.groups;
				var onlineUserStr = "";
				for (var g = 0; g < groups.length; g++) {
					var group = groups[g];
					var users = group.users;
					onlineUserStr += "&nbsp;" + group.name + "在线成员(" + users.length + "/" + users.length + ")";
					for (var u = 0; u < users.length; u++) {
						var user = users[u];
						onlineUserStr += "<div id=\"" + user.userId + "\" nick=\"" + user.nick +
							"\" style=\"line-height: 25px;margin: 5px 5px 0 5px;padding-left:15px;cursor:pointer;\" onclick=\"onlineDb(this);\" onmouseover=\"onlineMove(this);\"  onmouseleave=\"onlineLeave(this);\"><img alt=\"" +
							user.userId + "\" src=\"" + user.avatar +
							"\" height=\"25px\" width=\"25px;\" style=\"float:left\">&nbsp;<font size='2'>" + user.nick + "(" +
							user.userId + ")</font></div>";
					}
				}
				if (!onlineUserStr) {
					onlineUserStr = "&nbsp;在线成员(0/0)";
				}
				console.log(onlineUserStr);
			}
		},
		disConnect() {
			this.socket.close();
		},
		
		sendsssss() {
			var toId = "";
			if (onSelected) {
				toId = onSelected.getElementsByTagName("img")[0].alt;
			}
			var createTime = new Date().getTime();
			var content = document.getElementById('content').value;
			if (content == "")
				return;
			var msg = "{\"from\": \"" + username + "\",\"to\": \"" + toId + "\",\"cmd\":11,\"createTime\":" + createTime +
				",\"chatType\":\"2\",\"msgType\": \"0\",\"content\": \"" + content + "\"}";
			if (!toId) {
				alert("请选择要私聊的人!");
				return;
			}
			if (toId == username) {
				alert("无法给自己发送消息!");
				return;
			}
			//this.sendsssss(msg);
			var chatObj = eval("(" + msg + ")");
			var createTime = tools.formatTimestamp(chatObj.createTime);
			//处理数据
			console.log("<font color='#228B22' size='1' style='font-weight: bold'>" + chatObj.from + " " + createTime +
				"</font><br>");
			//处理数据
			console.log("<font color='#FFFFFF' size='1'>&nbsp;" + chatObj.content + "</font><br>");
			document.getElementById('content').value = "";
		},
		sendGroup() {
			var createTime = new Date().getTime();
			var content = document.getElementById('content').value;
			if (content == "")
				return;
			var msg = "{\"from\": \"" + username + "\",\"createTime\":" + createTime +
				",\"cmd\":11,\"groupId\":\"100\",\"chatType\":\"1\",\"msgType\":\"0\",\"content\": \"" + content + "\"}";
			this.send(msg);
			var chatObj = eval("(" + msg + ")");
			var createTime = tools.formatTimestamp(chatObj.createTime);
			//处理数据
			console.log("<font color='#228B22' size='1' style='font-weight: bold'>" + this.curUser.nick + "(" + this.curUser.userId +
				")" + " " + createTime + "</font><br>");
			//处理数据
			console.log("<font color='#FFFFFF' size='1'>&nbsp;" + chatObj.content + "</font><br>");
			document.getElementById('content').value = "";
		},
		scrollToBottom() {
			// var logDiv = document.getElementById('logs');
			// logDiv.scrollTop = logDiv.scrollHeight;
		},
		clearLogs() {
			// var logDiv = document.getElementById('logs');
			// logDiv.innerHTML="";
		},
		showServerConfig(obj) {
			var target = document.getElementById("serverConfigId");
			if (target.style.display == "block") {
				target.style.display = "none";
				obj.value = "服务器配置";
			} else {
				target.style.display = "block";
				obj.value = '关闭配置';
			}
		},
		onlineDb(obj) {
			if (onSelected) {
				if (onSelected.id != obj.id) {
					onSelected.style.background = "";
				}
			}
			obj.style.background = "#D4D4D4";
			onSelected = obj;
			var sendBtn = document.getElementById("sendBtn");
			sendBtn.style = "width: 150px;"
			sendBtn.value = "发送给:" + onSelected.id;
		},
		onlineMove(obj) {
			if ("undefined" == typeof(onSelected) || onSelected.id != obj.id) {
				obj.style.background = "#F0F0F0";
			}
		},
		onlineLeave(obj) {
			var onlineDiv = document.getElementById("onlinePanel").getElementsByTagName("div");
			for (var i = 0; i < onlineDiv.length; i++) {
				if ("undefined" == typeof(onSelected) || onSelected.id != onlineDiv[i].id) {
					onlineDiv[i].style.background = "";
				}
			}
		},
		setUserName() {
			document.getElementById("username").value = new Date().getTime();
		},
		keyDown(e) {
			var ev = window.event || e;
			//13是键盘上面固定的回车键
			if (ev.keyCode == 13) {
				sendGroup();
			}
		},
		authCmd() {
			if (!this.curUser) {
				alert("demo中模拟命令需要先登录，请先登录!");
			}
			var authCmd = "{\"cmd\":3,\"token\":\"校验码\"}";
			this.send(authCmd);
		},
		heartbeatCmd() {
			if (!this.curUser) {
				alert("demo中模拟命令需要先登录，请先登录!");
			}
			var heartbeatCmd = "{\"cmd\":13,\"hbbyte\":\"-127\"}";
			this.send(heartbeatCmd);
		},
		
		friendHistoryCmd() {
			if (!this.curUser) {
				alert("请先登录!");
				return;
			}
			var friend_id = document.getElementById("history_friend_id").value;;
			if (friend_id == "") {
				alert("请输入要获取的好友ID!");
				return;
			}
			var msgHistoryCmd = "{\"cmd\":19,\"type\":\"1\",\"fromUserId\":\"" + friend_id + "\",\"userId\":\"" + username +
				"\"}";
			this.send(msgHistoryCmd); //获取用户历史消息;
		},
		
		groupHistoryCmd() {
			if (!this.curUser) {
				alert("请先登录!");
				return;
			}
			var group_id = document.getElementById("history_group_id").value;;
			if (group_id == "") {
				alert("请输入要获取的群组ID!");
				return;
			}
			var msgHistoryCmd = "{\"cmd\":19,\"type\":\"1\",\"groupId\":\"" + group_id + "\",\"userId\":\"" + username +
				"\"}";
			this.send(msgHistoryCmd); //获取群组历史消息;
		},


		//关闭公告
		closePlacard() {
			this.showPlacard = false;
			//这里后续标记已读
		},
		jump(url) {
		  if(url!=null){
			  console.info("jump = = = = "+url )
		  }
		},
		
	}

}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>