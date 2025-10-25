import DefaultAction from "./default_action.js"
import { EventBus } from "../../event_bus.js"

class ResetAction extends DefaultAction {
	static fns = {
		reset: () => this.c.reset()
	}
}

export default ResetAction 
