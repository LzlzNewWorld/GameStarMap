/*           ==============       ==============
            |               |____|               |
            \               /    \               /
              =============        ==============
                             ●   ●                        
 * 地图，大小为20ly×20ly(表示为200 000x200 000个单位)
 * 结构：
 *  {
 *      ......
 *      [星球编号]：{
 *          name:[星球编号],
 *          capacity:{energy,materials},//能量和材料的存量
 *          position:{x,y},
 *          dia:直径,
 *          .......以上是初始属性，后续可添加，如：
 *          ownerId:拥有者的玩家ID
 *      },
 *      ......
 *  }
 * 
 */

//参数 
const STARS_AMOUNT = 10;//星球总数
const MAP_SIZE = 20 * 10000;//10^-4光年
const MAX_ENERGY = 500;//能量值上限
const MIN_ENERGY = 10;//能量值下限
const MAX_MATERIALS = 500;//材料值上限
const MAX_DIA = 10;//最大半径
const MIN_DIA = 1;//最小半径
const MIN_MATERIALS = 10;//材料值下限

var StarMap ={
    createStarMap : ()=> {
        var starMap ={};
        for (var i = 0; i < STARS_AMOUNT; i++) {
            var name = 'S' + i.toString(32);
            var rand = Math.random();
            starMap[name] = {
                name,
                capacity:{
                    energy: Math.round(0.5*(Math.random()+rand) * (MAX_ENERGY - MIN_ENERGY) + MIN_ENERGY),
                    materials: Math.round(0.5*(Math.random()+rand) * (MAX_MATERIALS - MIN_MATERIALS) + MIN_MATERIALS),
                },
                position: {
                    x: Math.round(Math.random() * (MAP_SIZE)),
                    y: Math.round(Math.random() * (MAP_SIZE)),
                },
                dia:Math.round(rand*(MAX_DIA - MIN_DIA) + MAX_DIA)
            }
        };
        return starMap;
    },
    getOwnerlessStar: starMap => {//得到一颗无主的star
        for (starCode in starMap) {
            var star = starMap[starCode];
            if (!star.owner) {
                return star;
            }
        };
        return null;
    },
    move : (x0, y0, x1, y1) => {//当前位置 目的地 坐标
        while(x0<0) x0+=MAP_SIZE;
        while(y0<0) y0+=MAP_SIZE;
        while(x1<0) x1+=MAP_SIZE;
        while(y1<0) y1+=MAP_SIZE;
        while(x0>MAP_SIZE) x0-=MAP_SIZE;
        while(y0>MAP_SIZE) y0-=MAP_SIZE;
        while(x1>MAP_SIZE) x1-=MAP_SIZE;
        while(y1>MAP_SIZE) y1-=MAP_SIZE;
        positionList = [
            { x: x1 - MAP_SIZE, y: y1 - MAP_SIZE },
            { x: x1 - MAP_SIZE, y: y1 },
            { x: x1 - MAP_SIZE, y: y1 + MAP_SIZE },
            { x: x1, y: y1 - MAP_SIZE },
            { x: x1, y: y1 },
            { x: x1, y: y1 + MAP_SIZE },
            { x: x1 + MAP_SIZE, y: y1 - MAP_SIZE },
            { x: x1 + MAP_SIZE, y: y1 },
            { x: x1 + MAP_SIZE, y: y1 + MAP_SIZE },
        ];
        var min = MAP_SIZE * MAP_SIZE;
        var position;
        for (i in positionList) {
            var p = positionList[i];
            var distance = (p.x - x0) * (p.x - x0) + (p.y - y0) * (p.y - y0);
            if (distance < min) {
                min = distance;
                position = p;
            }
        }
        return { position, distance: Math.pow(min, 0.5) };
    },
}
module.exports = StarMap;
