import { EventBus } from "../event_bus.js";

const ReadyEvents = (() => {
  EventBus.subscribe("ready-on", () => mount());
  EventBus.subscribe("ready-off", () => unmount());

  let el;
  let panel;
  const handler = () => {
    EventBus.emit("ready");
    unmount();
  };
  const mount = () => {
    panel = document.querySelector(".ready-game");
    el = document.querySelector("#ready");
    el.addEventListener("click", handler);
  };
  const unmount = () => {
    el.removeEventListener("click", handler);
    panel.remove();
  };
})();

export default ReadyEvents;
