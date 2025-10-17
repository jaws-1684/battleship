export class Ship {
	constructor (length) {
		this.length = length
		this.hits = 0
	}
	hit() {
		this.hits++
	}
	isSunk() {
		return this.hits === this.length
	}
	get location() {
		return this._location
	}
	set location(location){
		this._location = location
	}
	get direction() {
		return this._direction
	}
	set direction(direction){
		this._direction = direction
	}
}