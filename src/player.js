import { Ship } from "./ship.js"
import { Gameboard } from "./gameboard.js"

export class Player {
	constructor(name, gameboard=new Gameboard()) {
		this.name = name
		this.gameboard = gameboard
		this.board = gameboard.board
	}

	get ships() {
		return this._ships
	}
	set ships(ships) {
		this._ships = ships
	}
}
