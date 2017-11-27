const MAX_PLAYERS =20;
var Game = function (starMap) {
    var _playerCount = 0;
    var _players = {};
    this.starMap = starMap;
    this.__proto__ = {
        //new 一个player需要属性：id,name
        addPlayer: player => {
            if(_playerCount>=MAX_PLAYERS)
                return false;
            var star = this.starMap.getOwnerlessStar();
            if(star){
                _players[player.getId()] = player;
                player.addStar(star);
                _playerCount++;
                return true;
            }
            return false;
        },
        getPlayer: playerID => _players[playerID],
    };
}
module.exports = Game;