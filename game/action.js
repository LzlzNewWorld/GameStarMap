import { posix } from 'path';

const StarMap = require('../game_model/StarMap');

module.exports = {
    tryTravel : (ship, x0, y0, x1, y1)=>{
        var tmp = StarMap.move(x0,y0,x1,y1);
        var distance = tmp.distance;
        var point = tmp.position;
        
    }
}