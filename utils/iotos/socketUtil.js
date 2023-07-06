import tools from './tools';
let ip = "localhost";
let port = "8888";
let socket;
let username;
let password;
let socketUtil = {};
let curUser = {};
export let notice = {};//公告
export let showPlacard = false;//公告 显示
export let listText = [];//消息通知



// 创建 Socket 连接到服务端 接受消息
socketUtil.loginSocket = function(username, password) {
	socketUtil.username = username;
	socketUtil.password = password;
	socketUtil.socket = uni.connectSocket({
		url: "ws:" + ip + ":" + port + "?username=" + username + "&password=" + password
	}); //创建 连接

	uni.onSocketOpen(function(data) { //监听WebSocket连接打开事件。
		//console.log('WebSocket连接已打开！');
		
	});

	uni.onSocketError(function(res) { //监听WebSocket错误。
		console.log('WebSocket连接打开失败，请检查！');
	});

	uni.onSocketMessage(function(res) { //监听WebSocket接受到服务器的消息事件。
		console.log('onSocketMessage！');
		let dataObj = JSON.parse(res.data)
		console.log(dataObj);
		let code = dataObj.code;
		let command = dataObj.command;
		if (command == 11) { //接收到聊天响应处理;
			socketUtil.COMMAND_CHAT_RESP(dataObj);
		} else if (command == 18) { //获取用户信息响应处理;
			socketUtil.COMMAND_GET_USER_RESP(dataObj);
		} else if (10000 == code && command == 12) { //聊天发送状态;
			socketUtil.COMMAND_CHAT_RESP_SEND_STATUS(dataObj);
		} else if (command == 9) { //加入群组的消息通知处理;
			socketUtil.COMMAND_JOIN_GROUP_NOTIFY_RESP(dataObj);
		} else if (command == 10) {
			socketUtil.COMMAND_EXIT_GROUP_NOTIFY_RESP(dataObj);
		} else if (command == 20 && code == 10015) {
			//获取消息失败，未开启持久化处理
			//...
		} else if (command == 20 && code == 10016) { //处理离线消息;
			var msgFlag = "离线消息";
			socketUtil.COMMAND_GET_MESSAGE_RESP(dataObj, msgFlag);
		} else if (command == 20 && code == 10018) { //处理历史消息;
			var msgFlag = "历史消息";
			var msgObj = dataObj;
			if (msgObj) {
				socketUtil.COMMAND_GET_MESSAGE_RESP(dataObj, msgFlag);
			} else { //没有历史消息;
				socketUtil.OTHER(dataObj);
			}
		} else if (command == 6) { //登陆命令返回状态处理
			socketUtil.COMMAND_LOGIN_RESP(dataObj);
		} else if (10007 == code) { //登录成功;
			socketUtil.COMMAND_LOGIN_RESP(username);
		} else if (10008 == code) { //登录失败;
			socketUtil.OTHER(username);
		} else {
			socketUtil.OTHER(dataObj);
		}


	})
	uni.onSocketError(function(res) {
		console.log('WebSocket连接打开失败，请检查！');
	});




}

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
socketUtil.send = function(msg, successFn, failFn, completeFn) {
	
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
}



//登录通知处理
socketUtil.COMMAND_LOGIN_RESP = function(username) {
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
	socketUtil.send(userCmd); //获取登录用户信息;
	socketUtil.send(msgCmd); //获取用户离线消息(好友+群组);
}

socketUtil.COMMAND_EXIT_GROUP_NOTIFY_RESP = function(data) {
	var exitGroupNotify = data.data;
	console.log(exitGroupNotify)
	console.log(socketUtil.curUser)
	var onlineUserCmd = "{\"cmd\":17,\"type\":\"0\",\"userId\":\"" + socketUtil.curUser.userId + "\"}";
	console.log("<font color='#A3A3A3' size='1'>" + exitGroupNotify.user.nick + "(" + exitGroupNotify.user.userId +
		")退出群聊...</font><br>");
	socketUtil.send(onlineUserCmd); //获取在线用户列表;
}
//加入群组的消息通知处理;
socketUtil.COMMAND_JOIN_GROUP_NOTIFY_RESP = function(data) {
	var user = data.user;
	socketUtil.curUser = user;
	console.log(user)
	console.log(socketUtil.curUser)
	console.log("<font color='#A3A3A3' size='1'>" + user.nick + "(" + data.user.userId + ")加入群聊...</font><br>");
	var onlineUserCmd = "{\"cmd\":17,\"type\":\"0\",\"userId\":\"" + socketUtil.curUser.userId + "\"}";
	socketUtil.send(onlineUserCmd); //获取在线用户列表;
}
//加入群组响应状态处理;
socketUtil.COMMAND_JOIN_GROUP_RESP = function(data) {
	//成功加入群组响应信息;
}
//发送聊天请求发送状态处理;
socketUtil.COMMAND_CHAT_RESP_SEND_STATUS = function(data) {
	//发送成功后的状态处理...
}
//获取用户信息响应处理;
socketUtil.COMMAND_GET_USER_RESP = function(data) {
	console.log("COMMAND_GET_USER_RESP")
	console.log(data)
	var user = data.data;
	socketUtil.curUser = user;
	socketUtil.initOnlineUsers();
}
//接收到聊天响应处理;
socketUtil.COMMAND_CHAT_RESP = function(data) {
	var chatObj = data.data;
	console.log("COMMAND_CHAT_RESP")
	console.log(chatObj)
	var createTime = tools.formatTimestamp(chatObj.createTime);
	var from = chatObj.from;
	if (from == socketUtil.username)
		return;
	var content = chatObj.content;
	console.log(from)
	if(from=='IoTOSAdmin'){//系统消息
		var msgType = chatObj.msgType;
		console.log(msgType==5)
		if(msgType==5){//公告
			let notice =  {notice_title:'',notice_content:''};
			notice.notice_title = "系统公告 ["+from+"] "+createTime;
			notice.notice_content = content;
			socketUtil.notice = notice;
			socketUtil.showPlacard = true;
			console.log(socketUtil.notice)
		}else if(msgType==1){//通知
			
		}
		
	}else{
		var user = socketUtil.getOnlineUserById(from);
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
	
	
	
	
	
	
	
	
}
//处理用户同步+持久化消息
socketUtil.COMMAND_GET_MESSAGE_RESP = function(data, msgFlag) {
	var msgObj = data.data;
	socketUtil.friendOfflineMessage(msgObj, msgFlag);
	socketUtil.groupOfflineMessage(msgObj, msgFlag);
}
//好友消息
socketUtil.friendOfflineMessage = function(msgObj, msgFlag) {
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
}
//群组消息
socketUtil.groupOfflineMessage = function(msgObj, msgFlag) {
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
}
//其它信息处理;
socketUtil.OTHER = function(data) {
	//处理数据
	console.log("<font color='green' size='1'>" + data + "</font><br>");
}
socketUtil.getOnlineUserById = function(id) {
	if(socketUtil.curUser!=null){
		var groups = socketUtil.curUser.groups;
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
}
socketUtil.initOnlineUsers = function() {
	if(socketUtil.curUser!=null && socketUtil.curUser.groups!=null){
		var groups = socketUtil.curUser.groups;
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
}
socketUtil.disConnect = function() {
	socketUtil.socket.close();
}

socketUtil.sendsssss = function() {
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
	//socketUtil.sendsssss(msg);
	var chatObj = eval("(" + msg + ")");
	var createTime = tools.formatTimestamp(chatObj.createTime);
	//处理数据
	console.log("<font color='#228B22' size='1' style='font-weight: bold'>" + chatObj.from + " " + createTime +
		"</font><br>");
	//处理数据
	console.log("<font color='#FFFFFF' size='1'>&nbsp;" + chatObj.content + "</font><br>");
	document.getElementById('content').value = "";
}
socketUtil.sendGroup = function() {
	var createTime = new Date().getTime();
	var content = document.getElementById('content').value;
	if (content == "")
		return;
	var msg = "{\"from\": \"" + username + "\",\"createTime\":" + createTime +
		",\"cmd\":11,\"groupId\":\"100\",\"chatType\":\"1\",\"msgType\":\"0\",\"content\": \"" + content + "\"}";
	socketUtil.send(msg);
	var chatObj = eval("(" + msg + ")");
	var createTime = tools.formatTimestamp(chatObj.createTime);
	//处理数据
	console.log("<font color='#228B22' size='1' style='font-weight: bold'>" + socketUtil.curUser.nick + "(" + socketUtil.curUser.userId +
		")" + " " + createTime + "</font><br>");
	//处理数据
	console.log("<font color='#FFFFFF' size='1'>&nbsp;" + chatObj.content + "</font><br>");
	document.getElementById('content').value = "";
}
socketUtil.scrollToBottom = function() {
	// var logDiv = document.getElementById('logs');
	// logDiv.scrollTop = logDiv.scrollHeight;
}
socketUtil.clearLogs = function() {
	// var logDiv = document.getElementById('logs');
	// logDiv.innerHTML="";
}
socketUtil.showServerConfig = function(obj) {
	var target = document.getElementById("serverConfigId");
	if (target.style.display == "block") {
		target.style.display = "none";
		obj.value = "服务器配置";
	} else {
		target.style.display = "block";
		obj.value = '关闭配置';
	}
}
socketUtil.onlineDb = function(obj) {
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
}
socketUtil.onlineMove = function(obj) {
	if ("undefined" == typeof(onSelected) || onSelected.id != obj.id) {
		obj.style.background = "#F0F0F0";
	}
}
socketUtil.onlineLeave = function(obj) {
	var onlineDiv = document.getElementById("onlinePanel").getElementsByTagName("div");
	for (var i = 0; i < onlineDiv.length; i++) {
		if ("undefined" == typeof(onSelected) || onSelected.id != onlineDiv[i].id) {
			onlineDiv[i].style.background = "";
		}
	}
}
socketUtil.setUserName = function() {
	document.getElementById("username").value = new Date().getTime();
}
socketUtil.keyDown = function(e) {
	var ev = window.event || e;
	//13是键盘上面固定的回车键
	if (ev.keyCode == 13) {
		sendGroup();
	}
}
socketUtil.authCmd = function() {
	if (!socketUtil.curUser) {
		alert("demo中模拟命令需要先登录，请先登录!");
	}
	var authCmd = "{\"cmd\":3,\"token\":\"校验码\"}";
	socketUtil.send(authCmd);
}
socketUtil.heartbeatCmd = function() {
	if (!socketUtil.curUser) {
		alert("demo中模拟命令需要先登录，请先登录!");
	}
	var heartbeatCmd = "{\"cmd\":13,\"hbbyte\":\"-127\"}";
	socketUtil.send(heartbeatCmd);
}

socketUtil.friendHistoryCmd = function() {
	if (!socketUtil.curUser) {
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
	socketUtil.send(msgHistoryCmd); //获取用户历史消息;
}

socketUtil.groupHistoryCmd = function() {
	if (!socketUtil.curUser) {
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
	socketUtil.send(msgHistoryCmd); //获取群组历史消息;
}







export default socketUtil