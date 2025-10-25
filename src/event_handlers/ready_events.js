import { EventBus } from "../event_bus.js"

const ReadyEvents = (() => {
  EventBus.subscribe("ready-on", () => mount())
  EventBus.subscribe("ready-off", () => unmount())

  let el;
  const handler = (e) => {
    EventBus.emit("ready")
    unmount()
  }
  const mount = () => {
    el = document.querySelector("#ready")
    el.addEventListener("click", handler)
  }
  const unmount = () => {
    el.removeEventListener("click", handler)
    el.remove()
  }
})()

export default ReadyEvents