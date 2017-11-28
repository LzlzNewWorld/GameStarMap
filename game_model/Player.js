
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
        addShip: (name, ship) => {
            if(this.ships[name])
                return null;
            this.ships[name] = ship; 
            return this;
        },
        addStar: star => {
            star.ownerId = this.id;
            this.stars.push(star.name); 
            return this;
        },
        build: (star, production) => {

        },
    }
};