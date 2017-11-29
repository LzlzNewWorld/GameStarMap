/**
 * 游戏主要控制逻辑，数据通过redis存储
 * 
 */
const Game = require('../game_model/Game');
const Player = require('../game_model/Player');
const Ship = require('../game_model/Ship');
const StarMap = require('../game_model/StarMap');

const redisClient = require('../redisConnect');
require('../util/dateFormat');

const GAME_PERFIX = 'GAMESTARMAP_';//gamecontrol创建games json数据key的前缀

var GameControl = function () {
    var _initialized = false;
    this.games = {};
    this.__proto__ = {
        getGame: name => this.games[name],
        createGame: () => {
            var game = new Game(new StarMap().createStars());
            this.games[GAME_PERFIX + new Date().format('yyMMddhhmmssS')] = game;
            return game;
        },
        addPlayer: (gameName, playerId, playerName) => {
            this.getGame(gameName).addPlayer(new Player(playerId,playerName));
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
                        var starMap = new StarMap();
                        var game = new Game(starMap);
                        starMap.stars = JSON.parse(gameData[0]);
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
                    starMap: JSON.stringify(game.starMap.stars),
                    players: JSON.stringify(game.players),
                });
            }
        }
    }
}
var instance = new GameControl();
module.exports = instance;