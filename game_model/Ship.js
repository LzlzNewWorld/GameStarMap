const shipType = {
    "C1":{
        name:"C-1",
        consumption:{
            energy:100,
            material:100,
        },
        speed : 0.1*10000,
        detection: 0.1*10000,
        energyConsumptionPerLy:100,
        capacity:{
            people:1000,
            material:100,
            energy:300,
        },
        ATK: 0,
        DEF: 10,
    },
    "F1":{
        name:"F-1",
        consumption:{
            energy:30,
            material:10,
        },
        speed : 0.2*10000,
        detection: 0.1*10000,
        energyConsumptionPerLy:5,
        capacity:{
            people:0,
            material:0,
            energy:20,
        },
        ATK: 5,
        DEF: 5,
    },
    "R1":{
        name:"R-1",
        consumption:{
            energy:10,
            material:10,
        },
        speed : 0.3*10000,
        detection: 0.1*10000,
        energyConsumptionPerLy : 5,
        capacity:{
            people:0,
            material:0,
            energy:20,
        },
        ATK: 5,
        DEF: 5,
    },

}

var Ship = function (type) {
    this.properties = type;

};
Ship.type = shipType;

module.exports = Ship;