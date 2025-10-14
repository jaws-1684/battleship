import { Ship } from "./ship.js"
import { Gameboard } from "./gameboard.js"

export class Player {
	constructor(name, board=new Gameboard()) {
		this.name = name
		this.gameboard = board
	}
}
