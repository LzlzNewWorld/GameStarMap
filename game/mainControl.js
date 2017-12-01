/**
 * 游戏主要控制逻辑
 * 
 */
const Game = require('./model_control/game');
const Player = require('./model_control/player');
const Ship = require('./model_control/ship');
const StarMap = require('./model_control/starMap');

const GameCalendar = require('./calendar');

const redisClient = require('../redisConnect');
require('../util/dateFormat');

const GAME_PERFIX = 'GAMESTARMAP_';//gamecontrol创建games json数据key的前缀

var GameControl = function () {
    var buildObject =  (Type,data) => {var obj = new Type();for(i in data){obj[i] =data[i]} return obj}
    var _initialized = false;
    this.games = {};
    this.__proto__ = {
        getGame: name => this.games[name],
        createGame: () => {
            var game = Game.createGame(StarMap.createStarMap());
            this.games[GAME_PERFIX + new Date().format('yyMMddhhmmssS')] = game;
            return game;
        },
        addPlayer: (gameName, playerId, playerName) => {
            var game = this.getGame(gameName)
            var star = StarMap.getOwnerlessStar(game.starMap);
            var player = Player.createPlayer(playerId, playerName);
            Game.addPlayer(this.getGame(gameName), star, player);
        },
        load: callback => {//从redis加载数据
            this.games = {};
            redisClient.keys(GAME_PERFIX + '*', (err, key) => {
                var multi = redisClient.multi();
                for (i in key) {
                    multi.hmget(key[i], 'starMap', 'players','createTime')
                }
                multi.exec((err, data) => {
                    for (var i in data) {
                        var gameData = data[i];
                        var game = {};
                        var starMap = JSON.parse(gameData[0]);
                        game.starMap = starMap;
                        game.players = JSON.parse(gameData[1]);
                        game.playerCount = 0;
                        game.creatTime = gameData[2];
                        game.calendar = new GameCalendar(gameData[2])
                        for (j in game.players) {
                            ++game.playerCount;
                        }
                        this.games[key[i]] = game;
                    }
                    _initialized = true;
                    callback();
                })
            })
        },
        save: () => {//保存数据到redis
            for (name in this.games) {
                var game = this.games[name];
                redisClient.hmset(name, {
                    createTime : game.creatTime,
                    saveTime: new Date() + "",
                    starMap: JSON.stringify(game.starMap),
                    players: JSON.stringify(game.players),
                });
            }
        }
    }
}
var instance = new GameControl();
require('./schedule')(instance);//添加时间控制
module.exports = instance;