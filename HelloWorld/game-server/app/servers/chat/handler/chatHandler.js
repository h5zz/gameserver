var Code = require('../../../../../shared/code')

module.exports = function (app) {
    return new ChatHandler(app);
};

var ChatHandler = function (app) {
    this.app = app;
};


//处理发送聊天消息
ChatHandler.prototype.send = function (msg, session, next) {

    console.log("消息来了", msg)
    var rid = session.get('rid');
    console.log("rid", rid);
    var uid = session.get("uid");
    var channelService = this.app.get("channelService");
    channel = channelService.getChannel(rid, false);
    var param = {
        msg: msg.content,
        from: msg.playerId,
        target: msg.target
    }
    channel.pushMessage('onChat', param);

    next(null, {
        code: Code.OK,
        route: msg.route
    });
}