//类别
const shipType = {
    "C1": {
        name: "C1",
        consumption: {
            energy: 100,
            material: 100,
        },
        speed: 0.1 * 10000,
        detection: 0.1 * 10000,
        energyConsumptionPerLy: 100,
        capacity: {
            people: 1000,
            material: 100,
            energy: 300,
        },
        ATK: 0,
        DEF: 10,
    },
    "F1": {
        name: "F1",
        consumption: {
            energy: 30,
            material: 10,
        },
        speed: 0.2 * 10000,
        detection: 0.1 * 10000,
        energyConsumptionPerLy: 5,
        capacity: {
            people: 0,
            material: 0,
            energy: 20,
        },
        ATK: 5,
        DEF: 5,
    },
    "R1": {
        name: "R1",
        consumption: {
            energy: 10,
            material: 10,
        },
        speed: 0.3 * 10000,
        detection: 0.1 * 10000,
        energyConsumptionPerLy: 5,
        capacity: {
            people: 0,
            material: 0,
            energy: 20,
        },
        ATK: 5,
        DEF: 5,
    },

}
var Ship ={
    createShip : (type)=>{
        var ship ={};
        ship.type = type.name;
        ship.maxSpeed = type.speed;
        ship.detection = type.detection;
        ship.energyConsumptionPerLy = type.energyConsumptionPerLy;
        ship.capacity = type.capacity;
        ship.load = {};
        ship.ATK = type.ATK;
        ship.DEF = type.DEF;
        ship.v = 0;//初始速度
        return ship;
    },
    
}
Ship.type = shipType;

module.exports = Ship;