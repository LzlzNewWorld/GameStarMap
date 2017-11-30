/**
 * game数据的结构
 *  {
 *      playerCount ：玩家数量
 *      starMap : 星图
 *      players : 玩家
 *  }
 */

const MAX_PLAYERS =20;

var Game = {
    addPlayer: (game, star, player) => {
        if (game.playerCount >= MAX_PLAYERS)
            return false;
        if(star){
            game.players[player.id] = player;
            player.stars.push(star.name);
            game.playerCount++;
            return true;
        }
        return false;
    },
    getPlayer: (game,playerID) => game.players[playerID],
};
module.exports = Game;