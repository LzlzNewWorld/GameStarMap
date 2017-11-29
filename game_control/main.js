/**
 * 游戏主要控制，数据通过redis存储
 */
const Game = require('../game_model/Game');
const Player = require('../game_model/Player');
const Ship = require('../game_model/Ship');
const StarMap = require('../game_model/StarMap');

const redisClient = require('../redisConnect');

const GAME_PERFIX = 'game_';

var GameControl=function(){
    var _hasStarted = false;
    var _games={};
    this.__proto__ = {
        start = () => {//开始游戏
            if(hasStarted) return;
            this.load();
            hasStarted = true;
        },
        getGame= name => _games[name],
        createGame = () => {
            GameControl.games[GAME_PERFIX + new Date()] = new Game(new StarMap().createStars());
        },
        load = ()=>{//从redis加载数据
            var games = {};
            redisClient.keys(GAME_PERFIX,(err,key)=>{
                if(err) return false;
                for(i in key){
                    redisClient.hmget(key[i],'starMap','players',(err,data)=>{
                        if(err) return false;
                        var starMap = new StarMap();
                        var game = new Game(starMap);
                        starMap.stars = data[0];
                        game.players = data[1];
                        game.playerCount=0;
                        for(key in game.players){
                            ++game.playerCount;
                        }
                        games[key[i]] = game;
                    })
                }
            })
            _games = games;//所有数据加载完成赋值给 _games
            return true;
        },
        save = ()=>{//保存数据到redis
            for(name in _games){
                var game = _games[name];
                redisClient.hmset(name,{
                    saveTime: new Date()+"",
                    starMap:JSON.stringify(game.starMap.stars),
                    players:JSON.stringify(game.players),
                });
            }
        }
    }
}
var instance = new GameControl();
module.exports = instance;