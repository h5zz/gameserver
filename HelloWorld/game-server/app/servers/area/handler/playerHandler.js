//var consts = require('../../../consts/consts');
//var dataApiUtil = require('../../../util/dataApi');
module.exports = function (app) {
    return new PlayerHandler(app);
};

var PlayerHandler = function (app) {
    this.app = app;
    this.consts = null;
    this.areaService = null;
};

//玩家进入场景
PlayerHandler.prototype.enterScene = function (msg, session, next) {
    console.log("进入游戏场景成功")
    //指定角色名
    //var role = dataApiUtil.role().random();

    next(null, {
        code: "200",
        data: {
            msg: "进入游戏成功！！！"
            // area: this.areaService.getAreaInfo(),
            // playerId: player.id
        }
    });
};