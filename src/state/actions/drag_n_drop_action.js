import { h } from "../../helpers/helpers.js"
import { _ } from "../../helpers/underscore.js"
import DefaultAction from "./default_action.js"
import  RotateAction from "./rotate_action.js"
import { EventBus } from "../../event_bus.js"

class DragNDropAction extends DefaultAction {
	static dragstart (point) {
		let ship = h.getShip(point, this.c.current_player.gameboard)

    if (ship) {
    	let len = Number(ship.length)
    	let dir = ship.direction
    	let shipId = ship.id
			this.c.current_player.gameboard.clear(ship.location)

    	EventBus.emit("set-data", { len, dir, shipId })
    }
	}

	static dragover (cells) {
		if (this.c.current_player.gameboard.validPlace(cells)) {
			EventBus.emit("color", "lightgreen")
		} else {
			EventBus.emit("color", "red")
		}
	}
	static async drop (id, newLocation) {
		let ship = h.getShipById(id, this.c.current_player.gameboard)
		let oldLocation = ship.location
		
		if (this.c.current_player.gameboard.place(newLocation, ship)) {
			ship.location = newLocation
			_.prepend("board", { gameboard: this.c.current_player.gameboard})
			this.restart()
			RotateAction.restart()
		} else {
			this.c.current_player.gameboard.place(oldLocation, ship)
		}
	}
	static fns = {
		dragstart: (point) => this.dragstart(point),
		dragover: (cells) => this.dragover(cells), 
		drop: ({id, newLocation}) => this.drop(id, newLocation)
	}
}

export default DragNDropAction

