import { h } from "../../helpers/helpers.js"
import { _ } from "../../helpers/underscore.js"
import  DragNDropAction from "./drag_n_drop_action.js"
import DefaultAction from "./default_action.js"
import { EventBus } from "../../event_bus.js"

class RotateAction extends DefaultAction {
	static rotate(point) {
		let ship = h.getShip(point, this.c.current_player.gameboard)
    if (ship && this.c.current_player.gameboard.rotateShip(ship.id, point)) {
			_.prepend("board", { gameboard: this.c.current_player.gameboard})
			this.restart()
			DragNDropAction.restart()
    }
	}
	static fns = {
		rotate: (point) => this.rotate(point)
	}
}

export default RotateAction 

