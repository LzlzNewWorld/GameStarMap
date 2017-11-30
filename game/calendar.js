const redisClient = require('../redisConnect');

const GAME_SPEED = 10; //代表现实中1天代表游戏中多少年
const START_YEAR = 2300//游戏初始时间

var GameCalendar = function(createTime){
    var timeScale = GAME_SPEED*365;
    var gameTimestamp =  new Date(START_YEAR,0,1).getTime();
    this.createTimestamp = new Date(createTime).getTime();//游戏开始的现实时间戳
    this.__proto__={
        getGameTime :()=>{
            return new Date((Date.now()- this.createTimestamp)*timeScale + gameTimestamp);
        },
        getGameYear : ()=>{
            var time = new Date((Date.now()- this.createTimestamp)*timeScale + gameTimestamp);
            return time.getFullYear()-START_YEAR;
        }
    }
    
}

module.exports= GameCalendar;