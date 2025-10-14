import { Ship } from "./ship.js"

export class Gameboard {
	constructor() {
		this.board = []
		this.ships = {}
		for (let i = 0; i < 10; i++) {
  		this.board[i] = new Array(10).fill(null);
		}
	}
	receiveAttack(coordinate) {
		let [x, y] = coordinate
		let code = this.board[x][y]
		let ship = this.ships[code]

		if (ship) {
			ship.hit()
			this.board[x][y] = "hit"
			return "hit"
		}
		else {
			this.board[x][y] = "missed-hit"
			return "missed-hit"
		}
	}

	allSunk() {
		let ships = Object.values(this.ships)
		return ships.every(ship => ship.isSunk() === true)
	}

	placeShip(coordinates, shipType) {
		let ship = new Ship(shipType)
		let code = crypto.randomUUID()
  	this.ships[code] = ship;

		for(coordinate of coordinates) {
			let [x, y] = coordinate
			this.board[x][y] = code
		}
	}
}