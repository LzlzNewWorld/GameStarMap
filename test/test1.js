var gameControl = require('../game/mainControl');
var calendar = require('../game/calendar');

// var game = gameControl.createGame();
// console.log(game);
// gameControl.save();
gameControl.load(()=>{
    var game = gameControl.getGame('GAMESTARMAP_171129145631795');
    // gameControl.addPlayer('GAMESTARMAP_171129145631795',1,'abcde');
    console.dir(game);
    var time = game.calendar.getGameTime();
    var realTime = game.calendar.getRealTime(time);
    console.log(time,realTime);
    gameControl.save();
});

