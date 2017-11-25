/*           ==============       ==============
            |               |____|               |
            \               /    \               /
              =============        ==============
                             ●   ●                        
 * 地图，大小为20ly×20ly(表示为200 000x200 000个单位)
 * 需要实现的功能：
 * 把20ly×20ly的地图内容无限循环（类似图片平铺），并且能够找到到达某个位置的最短路径
 * 地图初始化：n颗星球随机分布在20x20ly的空间中,
 * 以下为测试用：
 * 保存在json文件中
 * 从json加载数据
 * 
 */
const fs = require("fs");

//参数 
const MAP_SIZE = 20 * 10000;//10^-4光年
const MAX_ENERGY = 500;//能量值上限
const MIN_ENERGY = 10;//能量值下限
const MAX_MATERIALS = 500;//材料值上限
const MIN_MATERIALS = 10;//材料值下限
const STARS_AMOUNT = 256;//星球总数


var StarMap = function () {
    var _stars = {};
    this.__proto__ = {
        initStars: () => {
            for (var i = 0; i < STARS_AMOUNT; i++) {
                var name = 'S' + i.toString(32);
                _stars[name] = {
                    name,
                    capacity:{
                        energy: Math.round(Math.random() * (MAX_ENERGY - MIN_ENERGY) + MIN_ENERGY),
                        materials: Math.round(Math.random() * (MAX_MATERIALS - MIN_MATERIALS) + MIN_MATERIALS),
                    },
                    position: {
                        x: Math.round(Math.random() * (MAP_SIZE)),
                        y: Math.round(Math.random() * (MAP_SIZE)),
                    }
                }
            };
            return this;
        },
        getStar : name => _stars[name],
        getOwnerlessStar:()=>{
            for (starCode in _stars) {
                var star = _stars[starCode];
                if (!star.owner) {
                    return star;
                }
            };
            return null;
        },
        //测试用方法
        saveStars: fileName => {
            if (!fileName) return;
            fs.writeFileSync(__dirname + '/data/map/' + fileName, JSON.stringify(_stars));
            return this;
        },
        loadStars: (fileName) => {
            if (!fileName) return;
            var data = fs.readFileSync(__dirname + '/data/map/' + fileName)
            _stars= JSON.parse(data.toString());
            return this;
        },
    };
};
StarMap.move= (x0, y0, x1, y1) => {//当前位置 目的地 坐标
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
};
module.exports = StarMap;
