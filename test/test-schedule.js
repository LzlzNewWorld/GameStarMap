
const schedule = require("node-schedule");
//  node-schedule的使用http://www.jianshu.com/p/6f5e329bc95e
// var rule = new schedule.RecurrenceRule();
// var times = [];
// for (var i = 1; i < 60; i++) {
//     times.push(i);
// }
// rule.second = times;
// var c = 0;
// var j = schedule.scheduleJob(rule, function () {
//     c++;
//     console.log(c);
// });
var now = new Date();
//new Date 的月份要-1 坑
var date = new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds()+5);
var date1 = new Date(now.getFullYear(),now.getMonth(),now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds()+10);
console.log(date);
var j = schedule.scheduleJob(date, function () {
    console.log("执行任务");
});
var j = schedule.scheduleJob(date1, function () {
    console.log("执行任务1");
});
setInterval(() => {
    console.log('abc');
}, 1000);