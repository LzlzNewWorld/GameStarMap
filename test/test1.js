var gameControl = require('../game/main');

// var game = gameControl.createGame();
// console.log(game);
// gameControl.save();
gameControl.load(()=>{
    var game = gameControl.getGame('GAMESTARMAP_171129145631795');
    // gameControl.addPlayer('GAMESTARMAP_171129145631795',1,'abcde');
    console.dir(game);
    console.log(game.calendar.getGameYear());
    gameControl.save();
});

