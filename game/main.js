/**
 * 游戏主要控制逻辑
 * 
 */
const Game = require('./model/game');
const Player = require('./model/player');
const Ship = require('./model/ship');
const StarMap = require('./model/starMap');

const redisClient = require('../redisConnect');
require('../util/dateFormat');

const GAME_PERFIX = 'GAMESTARMAP_';//gamecontrol创建games json数据key的前缀

var GameControl = function () {
    var _initialized = false;
    this.games = {};
    this.__proto__ = {
        getGame: name => this.games[name],
        createGame: () => {
            var game = {
                playerCount : 0,
                starMap : StarMap.createStarMap(),
                players : {}
            }
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
                    multi.hmget(key[i], 'starMap', 'players')
                }
                multi.exec((err, data) => {
                    for (var i in data) {
                        var gameData = data[i];
                        var game = {};
                        var starMap = JSON.parse(gameData[0]);
                        game.starMap = starMap;
                        game.players = JSON.parse(gameData[1]);
                        game.playerCount = 0;
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