module.exports = function (app) {
    return new Remote(app);
};

var Remote = function (app) {
    this.app = app;
    this.channelService = app.get("channelService");
};
//加入频道
Remote.prototype.add = function (uid, sid, rid, cb) {

    console.log("1111uid, sid, rid, cb", uid, sid, rid)
    var channel = this.channelService.getChannel(rid, true);
    var param = {
        route: "onAdd",
        user: uid
    };
    channel.pushMessage(param);
    if (!!channel) {
        channel.add(uid, sid);
    };

    var users = [];
    users = channel.getMembers();
    for (var i = 0; i < users.length; i++) {
        users[i] = users[i];
    }
    //返回频道中的用户
    cb(users, rid);
};
//离开频道
Remote.prototype.kick = function (uid, sid, rid, cb) {
    //console.log("2222uid, sid, rid", uid, sid, rid)
    var channel = this.channelService.getChannel(rid, false);
    param = {
        route: "onLeave",
        user: uid
    };
    channel.pushMessage(param);
    if (!!channel) {
        channel.leave(uid, sid);
    };
    var users = [];
    users = channel.getMembers();
    for (var i = 0; i < users.length; i++) {
        users[i] = users[i];
    };
    cb(users);
};