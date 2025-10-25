import { EventBus } from "../event_bus.js";

const RandomiseEvents = (() => {
  EventBus.subscribe("randomise-on", () => mount());
  EventBus.subscribe("randomise-off", () => unmount());

  let el = document.querySelector("#randomise");

  const handler = () => {
    EventBus.emit("randomise");
  };
  const mount = () => {
    el.classList.remove("hidden");
    el.addEventListener("click", handler);
  };
  const unmount = () => {
    el.removeEventListener("click", handler);
    el.classList.add("hidden");
  };
})();

export default RandomiseEvents;
