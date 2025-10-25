import { EventBus } from "../../event_bus.js"

class DefaultAction {
	static c;

	static on(controller) {
		this.c = controller
		EventBus.bulk("subscribe", this.fns)
	}

	static off() {
		EventBus.bulk("unsubscribe", this.fns)
	}
	static restart() {
		EventBus.bulk("restart", this.fns)
	}

}

export default DefaultAction