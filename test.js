var Game = require('./game/Game');
var StarMap = require('./game/StarMap');
var Player = require('./game/Player');
var Ship = require('./game/Ship');

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