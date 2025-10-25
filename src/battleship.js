import { Model } from "./models/model.js"
import { EventBus } from "./event_bus.js"
import { h } from "./helpers/helpers.js"
import { EventHandler } from "./event_handlers/event_handler.js"
import { State } from "./state/state.js"
import { _ } from "./helpers/underscore.js"

export class Battleship {
	constructor (player1name, player2name) {
		this.setPlayers(player1name, player2name)
	}

	init() {
		_.message("Start the game")
		this.placeShips(this.player1, this.player2)
		_.render("game", { current_player: this.current_player })
		_.render("panel")
		State.Init.on(this)
	}
	update() {
		this.placeShips(this.current_player)
		_.prepend("board", { gameboard: this.current_player.gameboard})
	}
	reset() {
		State.Run.off()
		this.setPlayers("axis", "computer")
		this.init()
	}
	start() {
		State.Run.on(this)
	}
	
	switchPlayer() {
		this.current_player = this.current_player === this.player1 ? this.player2 : this.player1
	}
	
	placeShips(...players) {
    let ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
    for (let player of players) {
    	player.ships = ships.map(length => new Model.Ship(length))
    	player.ships.forEach(ship => player.gameboard.placeRandom(ship))
    }
	}
	setPlayers(player1name, player2name) {
		this.player1 = new Model.Player(player1name)
		this.player1.gameboard = new Model.Gameboard()
		this.player2 = new Model.Computer(player2name)
		this.player2.gameboard = new Model.Gameboard()

		this.current_player = this.player1
		this.setOpponents(this.player1, this.player2)
	}
	setPlayer(name) {
		let gameboard = this.player2.gameboard
		this.player2 = new Model.Player(name)
		this.player2.gameboard = gameboard
		this.current_player = this.player1
		this.setOpponents(this.player1, this.player2)
	}
	setOpponents(player1, player2) {
		player1.opponent = player2
		player2.opponent = player1
	}
	newBoard() {
		this.current_player.gameboard = new Model.Gameboard()
	}
}
