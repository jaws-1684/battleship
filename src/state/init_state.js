import { EventBus } from "../event_bus.js"
import { _ } from "../helpers/underscore.js"
import { Action } from "./actions/action.js"

class InitState {
	static c;

	static on(controller) {
		this.c = controller

		EventBus.bulk("subscribe", this.fns)

		Action.DragNDrop.on(this.c)
		Action.Rotate.on(this.c)
		Action.Randomise.on(this.c)
	}
	static start(secondPlayer) {
		if (secondPlayer == "friend") {
			this.c.setPlayer("friend")
			this.c.switchPlayer()
			_.show("courtain")
			_.render("game", { current_player: this.c.current_player })
			_.render("fight")
			EventBus.emit("ready-on")

			Action.DragNDrop.restart()
			Action.Rotate.restart()

			EventBus.subscribe("ready", () => {
				_.render("game", { current_player: this.c.current_player })
				this.c.start()
			})
			return
		}
		this.c.start()        
	}
	static fns = {
		start: (secondPlayer) => this.start(secondPlayer)
	}
	static off() {
		EventBus.bulk("unsubscribe", this.fns)
		Action.DragNDrop.off()
		Action.Rotate.off()
		Action.Randomise.off()
	}
}

export default InitState