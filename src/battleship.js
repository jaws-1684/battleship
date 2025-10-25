import { Model } from "./models/model.js"
import { EventBus } from "./event_bus.js"
import { _ } from "./helpers/underscore.js"
import { h } from "./helpers/helpers.js"
import { EventHandler } from "./event_handlers/event_handler.js"

export class Battleship {
	constructor (player1name, player2name) {
		this.setPlayers(player1name, player2name)
		this.setOpponents(this.player1, this.player2)
		
		this.setInitEventResposes()
		this.setDragnDropEventResponses()
		this.setGameEventResponses()
		this.setRotateEventResponses()
		this.setRandomiseEventResponses()

		this.initEvts = [this.startEvents, this.dragNdropEvents, this.rotateEvents, this.randomiseEvents]
		this.shipEvts = [this.dragNdropEvents, this.rotateEvents]
	}

	init() {
		_.message("Start the game")
		this.placeShips(this.player1, this.player2)
		_.render("game", { current_player: this.current_player })
		_.render("panel")
		this.events("on", ...this.initEvts)
	}
	update() {
		this.placeShips(this.current_player)
		_.prepend("board", { gameboard: this.current_player.gameboard})
	}
	start() {
		this.events("off", ...this.initEvts)
		this.events("on", this.gameEvents)
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
	
	async attackResponse(attack) {
		if (attack === "target-twice") {
			_.message("Cannot target the same point twice")
			return
		}
		
    if (attack === 'hit' && this.current_player.opponent.gameboard.allSunk()) {
			_.message("Game over " + this.current_player.name + " won.")
			this.end()
    } 
    else if (attack === "missed-hit") {
  		switch (this.current_player.opponent.name) {
  			case "computer":
  				let computerAttack = this.player2.makeMove()
      		_.message(computerAttack)
      		_.render("game", { current_player: this.current_player })

	        while (computerAttack === "hit") {
	        	await h.sleep(1000);
	        	computerAttack = this.player2.makeMove()
	        	_.message(computerAttack)
	        	_.render("game", { current_player: this.current_player })

	        	if (this.player1.gameboard.allSunk()) {
	    				_.message("Game over c0mput3r won.")
	    				this.end()
	    				return
	    			}
	    		}
	    		break	
	    	default:
	    		_.show("courtain")
  				this.switchPlayer()
  				break
	    }
		}
	}
	setInitEventResposes() {
		this.startEvents = {
		start: (secondPlayer) => {
			if (secondPlayer == "friend") {
				this.setPlayer("friend")
				this.switchPlayer()
				_.show("courtain")
				_.render("game", { current_player: this.current_player })
				_.render("fight")
				EventBus.emit("ready-on")
				this.events("restart", this.randomiseEvents, this.dragNdropEvents, this.rotateEvents)
				EventBus.subscribe("ready", () => {
					_.render("game", { current_player: this.current_player })
					this.events("off", this.dragNdropEvents, this.rotateEvents, this.randomiseEvents)
					this.events("on", this.gameEvents)
				})
				return
			}
			this.start()        
		}
	}
}
	setRandomiseEventResponses() {
		this.randomiseEvents = {
				randomise: () => {
				this.current_player.gameboard = new Model.Gameboard()
				this.update()
				this.events("restart", ...this.shipEvts)
			}
		}
	}
	setRotateEventResponses() {
		this.rotateEvents = { 
			rotate: (point) => {
				let ship = h.getShip(point, this.current_player.gameboard)
		    if (ship instanceof Model.Ship && this.current_player.gameboard.rotateShip(ship.id, point)) {
					_.prepend("board", { gameboard: this.current_player.gameboard})
					this.events("restart", ...this.shipEvts)
		    }
			}
		}
	}

	setDragnDropEventResponses() {
		this.dragNdropEvents = {
			dragstart: (point) => {
				let ship = h.getShip(point, this.current_player.gameboard)

	      if (ship instanceof Model.Ship) {
	      	let len = Number(ship.length)
	      	let dir = ship.direction
	      	let shipId = ship.id
					this.current_player.gameboard.clear(ship.location)

	      	EventBus.emit("set-data", { len, dir, shipId })
	      }
			},
			dragover: (cells) => {
				if (this.current_player.gameboard.validPlace(cells)) {
					EventBus.emit("color", "lightgreen")
				} else {
					EventBus.emit("color", "red")
				}
			},
			drop: async ({ id, newLocation }) => {
				let ship = h.getShipById(id, this.current_player.gameboard)
				let oldLocation = ship.location
				
				if (this.current_player.gameboard.place(newLocation, ship)) {
					ship.location = newLocation
					_.prepend("board", { gameboard: this.current_player.gameboard})
					this.events("restart", ...this.shipEvts)
				} else {
					this.current_player.gameboard.place(oldLocation, ship)
				}
			}
		}
	}
	setGameEventResponses() {
		this.gameEvents = {
			attack: async (point) => {
				_.message("Choose a target")
				let attack = this.current_player.opponent.gameboard.receiveAttack(...point)
				await this.attackResponse(attack)
				_.message(attack)
				_.render("game", { current_player: this.current_player })
			},
			reset: () => {
				this.events("off", this.gameEvents)
				this.setPlayers("axis", "computer")
				this.setOpponents(this.player1, this.player2)
				this.init()
			}
		}
	}
	events(action, ...events) {
		let evts = Object.assign({}, ...events)
		for (let [key, value] of Object.entries(evts)) {
			if (action === "off") {
				EventBus.emit(key + "-off")
				EventBus.unsubscribe(key, value)
			} else if (action === "restart") {
				EventBus.emit(key + "-off")
				EventBus.emit(key + "-on")
				EventBus.unsubscribe(key, value)
				EventBus.subscribe(key, value)
			} else if ("on") {
				EventBus.emit(key + "-on")
				EventBus.subscribe(key, value)
			}
		}
	} 
}
