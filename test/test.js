var Game = require('../game_model/Game');
var StarMap = require('../game_model/StarMap');
var Player = require('../game_model/Player');
var Ship = require('../game_model/Ship');

var g = new Game();
g.starMap = new StarMap().loadStars('test1.json');
g.addPlayer(new Player(1,"player1"));
var player = g.getPlayer(1);
player.addShip("s1",Ship.type.C1);
console.dir(player.getShip('s1'));
console.dir(g.starMap.getStar('S0').owner.getName());
console.dir(StarMap.move(199999,1,99000,123333));
console.dir(StarMap.move(-1,1,99000,123333));
// new StarMap().initStars().saveStars('test1.json')