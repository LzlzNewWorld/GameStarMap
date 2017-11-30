/**
 * 游戏定时控制逻辑
 */
//  node-schedule的使用http://www.jianshu.com/p/6f5e329bc95e
const schedule = require('node-schedule');

var gameSchedule = function (gameControl) {
    //指定时间保存数据
    (() => {
        var saveRule = new schedule.RecurrenceRule();
        saveRule.minute = 0;//只设置saveRule.minute = 0 意味着 每小时0分保存用户数据
        schedule.scheduleJob(saveRule, function () {
            gameControl.save();
        })
    })();
}
module.exports = gameSchedule