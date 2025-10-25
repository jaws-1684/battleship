import { EventBus } from "../event_bus.js"
import  InitState from "./init_state.js"
import { Action } from "./actions/action.js"

class RunState {
	static c;
	static on(controller) {
		this.c = controller
		InitState.off()
		Action.Attack.on(this.c)
		Action.Reset.on(this.c)
	}
	static off() {
		Action.Attack.off()
		Action.Reset.off()
	}
}

export default RunState