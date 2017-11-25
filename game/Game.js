var Game = function (starMap) {
    var _players = {};
    this.starMap = starMap;
    this.__proto__ = {
        //new 一个player需要属性：id,name
        addPlayer: player => {
            var star = this.starMap.getOwnerlessStar();
            if(star){
                _players[player.getId()] = player;
                player.addStar(star);
            }
            return this;
        },
        getPlayer: playerID => _players[playerID],
    };
}
module.exports = Game;