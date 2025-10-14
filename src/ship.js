export class Ship {
	constructor (type) {
		this.types = { destroyer: 1, submarine: 2, cruiser: 3, carrier: 4 }
		this.length = this.types[type]
		this.hits = 0
	}
	hit() {
		this.hits++
	}
	isSunk() {
		return this.hits === this.length
	}
}