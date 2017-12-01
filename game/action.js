const StarMap = require('./model_control/starMap');

module.exports = {
    canTravel: (ship, x0, y0, x1, y1) => {
        var tmp = StarMap.move(x0, y0, x1, y1);
        var distance = tmp.distance;
        // var point = tmp.position;
        var farthest = 0;
        if (ship.load.energy) {
            farthest = 10000 * ship.load.energy / ship.energyConsumptionPerLy;
        }
        return distance <= farthest;
    },
    
}