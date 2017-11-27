
module.exports = function (id, name) {
    var _id = id;
    var _name = name;
    var _stars = {};
    var _ships = {};
    this.__proto__ = {
        setId: id => { if (!_id) _id = id },
        setName: name => { if (!_name) _name = name },
        getId: () => _id,
        getName: () => _name,
        getShip: name => _ships[name],
        getStar: name => _stars[name],
        addShip: (name, ship) => {
            if(_ships[name])
                return null;
            _ships[name] = ship; 
            return this;
        },
        addStar: star => {
            star.owner = this;
            _stars[star.name] = star; 
            return this;
        },
        build: (star, production) => {

        }
    }
};