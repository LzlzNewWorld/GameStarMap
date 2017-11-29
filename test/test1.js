var gameControl = require('../game_control/main');

// var game = gameControl.createGame();
// console.log(game);
// gameControl.save();
gameControl.load(()=>{
    gameControl.addPlayer('GAMESTARMAP_171129145631795',1,'abcde');
    var game = gameControl.getGame('GAMESTARMAP_171129145631795');
    console.log(JSON.stringify(game))
});

