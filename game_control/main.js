/**
 * 游戏主要控制，数据通过redis存储
 */
const Game = require('../game_model/Game');
const Player = require('../game_model/Player');
const Ship = require('../game_model/Ship');
const StarMap = require('../game_model/StarMap');

const redisClient = require('../redisConnect');

var Main = function(){

}
Main.loadData = function(){

}
Main.createGame = function(cb){
    redisClient.hmset('game_'+new Date(),{playerCount:0,},)
}