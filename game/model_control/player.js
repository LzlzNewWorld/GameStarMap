/**
 * player数据
 *  {
 *      id ：玩家id
 *      name : 游戏中的名字
 *      stars : [] 存储game中star.name
 *      ships : {} 
 *  }
 */
var Player = {
    createPlayer : (id, name) =>{
        return {
            id,name,
            stars:[],
            ships:{}
        }
    },
    addShip: (player, name, ship, star) => {
        if (this.ships[name])
            return false;
        ship.position = star.position;
        ship.name = name;
        this.ships[name] = ship;
        return true;
    },
    addStar: (id, name, star) => {
        
        star.ownerId = this.id;
        this.stars.push(star.name);
        return true;
    },
}
module.exports = Player;