
module.exports = function (id, name) {
    this.id = id;
    this.name = name;
    this.stars = [];
    this.ships = {};
    this.__proto__ = {
        setId: id => { if (!this.id) this.id = id },
        setName: name => { if (!this.name) this.name = name },
        getId: () => this.id,
        getName: () => this.name,
        getShip: name => this.ships[name],
        addShip: (name, ship, star) => {
            if(this.ships[name])
                return false;
            ship.position = star.position;
            this.ships[name] = ship; 
            return true;
        },
        addStar: star => {
            star.ownerId = this.id;
            this.stars.push(star.name); 
            return true;
        },
        build: (star, production) => {

        },
    }
};