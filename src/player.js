export class Player {
	constructor(name, gameboard) {
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
	get opponent() {
		return this._opponent
	}
	set opponent(opponent) {
		this._opponent = opponent
	}
}
