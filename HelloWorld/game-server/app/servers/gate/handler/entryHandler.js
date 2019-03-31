module.exports = function (app) {
    return new Handler(app);
};

var Handler = function (app) {
    this.app = app;
};

/**
 * New client entry.
 *
 * @param  {Object}   msg     request message
 * @param  {Object}   session current session object
 * @param  {Function} next    next step callback
 * @return {Void}
 */
Handler.prototype.entry = function (msg, session, next) {
    console.log("成功连接gate", msg);
    //这里可以检查数据库中是否存在该用户
    //进行注册返回uid
    var uid = null;
    if (!msg.name || !msg.pass || msg.name.length < 1 || msg.pass.length < 1) {
        next(null, { code: 500, msg: "uid错误" });
        return;
    }
    else {
        uid = 1;
    }
    //查找connectors服务器，进行分配
    var connectors = this.app.getServersByType('connector');
    if (!connectors || connectors.length === 0) {
        next(null, { code: 500, msg: "connectors错误" });
        return;
    } else {
        //返回给客户端uid和协调服务器地址
        var res = this.dispatcher.dispatch(uid, connectors);
        next(null, { code: 200, host: res.host, port: res.clientPort, msg: "返回协调地址" });
    }
};
