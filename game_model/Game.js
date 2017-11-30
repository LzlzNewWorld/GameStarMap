const MAX_PLAYERS =20;

var Game = function (starMap) {
    this.playerCount = 0;
    this.starMap = starMap;
    this.players = {};
    this.__proto__ = {
        //new 一个player需要属性：id,name
        addPlayer: player => {
            if(this.playerCount>=MAX_PLAYERS)
                return false;
            var star = this.starMap.getOwnerlessStar();
            if(star){
                this.players[player.getId()] = player;
                player.addStar(star);
                this.playerCount++;
                return true;
            }
            return false;
        },
        getPlayer: playerID => this.players[playerID],
    };
}
module.exports = Game;