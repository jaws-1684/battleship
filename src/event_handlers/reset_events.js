import { EventBus } from "../event_bus.js"

const ResetEvents = (() => {
	EventBus.subscribe("reset-on", () => mount())
	EventBus.subscribe("reset-off", () => unmount())
	

		let el = document.querySelector("#reset")

	const handler = (e) => {
		EventBus.emit("reset")
	}
	const mount = () => {
		el.classList.remove("hidden")
		el.addEventListener("click", handler)
	}
	const unmount = () => {
		el.removeEventListener("click", handler)
		el.classList.add("hidden")
	}
})()


export default ResetEvents