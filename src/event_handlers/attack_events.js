import { evh } from "./event_helpers.js"
import { EventBus } from "../event_bus.js"

const AttackEvents = (() => {
	EventBus.subscribe("attack-on", () => mount())
	EventBus.subscribe("attack-off", () => {
		unmount()
	})
	

	let el = document.querySelector(".game")
	const handler = (e) => {
		let target  = e.target
		if (evh.validTarget(target)) {
			e.preventDefault()
			e.stopPropagation()
			let point = evh.parseCoordinates(target)
			EventBus.emit("attack", point)
			return
		}
		
	}
	const mount = () => {
		el.addEventListener("click", handler)
	}
	const unmount = () => {
		el.removeEventListener("click", handler)
	}
})()

export default AttackEvents