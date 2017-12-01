/**
 * game数据的结构
 *  {
 *      playerCount ：玩家数量
 *      starMap : 星图
 *      players : 玩家
 *      travels
 *  }
 * travel数据
 *  {
 *      playerId,shipName,dest 目的地
 *  }
 */
const MAX_PLAYERS =20;

var Game = {
    createGame: (starMap) => {
        return {
            playerCount :0,
            starMap,
            players: {},
            travels : []
        }
    },
    addPlayer: (game, star, player) => {
        if (game.playerCount >= MAX_PLAYERS)
            return false;
        if(star){
            game.players[player.Id] = player;
            player.stars.push(star.name);
            game.playerCount++;
            return true;
        }
        return false;
    },
    getPlayer: (game,playerId) => game.players[playerId],
    addTravel: (playerId, shipName, dest) => {
        game.travels.push({
            playerId,shipName,dest,startTime
        })
    },
    /**
     * game: 不解释 handler(player,ship):对于每个travel的操作
     */
    refreshTravel: (game , handler)=> {
        for (var i in game.travels){
            var travel = game.travels[i];
            travel
            handler(game.players[travel.playerId], game)
        }
    }
};
module.exports = Game;