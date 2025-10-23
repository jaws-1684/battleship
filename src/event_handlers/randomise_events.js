import { EventBus } from "../event_bus.js"

export const RandomiseEvents = (() => {
	EventBus.subscribe("randomise-on", () => mount())
	EventBus.subscribe("randomise-off", () => unmount())
	

	let el = document.querySelector("#randomise")

	const handler = (e) => {
		EventBus.emit("randomise")
	}
	const mount = () => {
		el.addEventListener("click", handler)
	}
	const unmount = () => {
		el.removeEventListener("click", handler)
	}
})()


