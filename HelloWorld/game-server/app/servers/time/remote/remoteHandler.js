module.exports = function (app) {
    return new Remote(app);
};

var Remote = function (app) {
    this.app = app;
};

Remote.prototype.getCurrentTime = function (cb) {
    var d = new Date();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    cb(hour, min, sec);

};