var Code = require('../../../../../shared/code');
module.exports = function (app) {
	return new Handler(app);
};

var Handler = function (app) {
	this.app = app;
	this.serverId = app.get("serverId").split('-')[2];
	console.log("serverId:", this.serverId);
};

var id = 1;
/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function (msg, session, next) {
	var self = this;
	console.log("成功连接connector", msg);
	if (!msg.uid) {
		console.log("收到uid", msg.uid);
		next(null, { code: Code.FAIL, msg: "uid错误" });
		return;
	};
	//判断是否存在uid
	var sessionService = self.app.get("sessionService");
	//console.log("查询uid:", sessionService);
	// if (!!sessionService.getByUid(uid)) {
	// 	next(null, {
	// 		code: code.FAIL,
	// 		msg: "uid已经存在"
	// 	});
	// 	return;
	// }
	var uid = msg.uid;
	var rid = 1;//默认房间1
	var playerId = this.serverId + "*" + uid;
	//console.log("playerId:", playerId);
	session.bind(uid);
	session.set('playerId', playerId);//设置用户的玩家ID
	session.set('rid', rid);//设置房间ID
	session.set('areaId', 1);//设置场景ID
	session.on('closed', onUserLeave.bind(null, self.app));
	session.pushAll();

	console.log("0000playerId", session.get("playerId"));
	console.log(self.app.rpc)
	self.app.rpc.chat.remoteHanlder.add(session,
		uid,
		self.app.get('serverId'),
		rid,
		function (users, rid) {

			console.log("加入频道成功", users);
			next(null, {
				code: Code.OK,
				users: users,
				rid: rid
			});
		});
};

var onUserLeave = function (app, session) {
	var self = this;
	console.log("session.get('rid')", session.get('rid'))
	//远程调用玩家离开了
	app.rpc.chat.remoteHanlder.kick(session,
		session.uid,
		app.get('serverId'),
		session.get('rid'),
		function (users) {
			console.log("离开频道", users);
			//next(null, { code: Code.OK, users: users })
		}
	);

};
