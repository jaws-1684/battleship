import { EventBus } from "../event_bus.js";
import { evh } from "./event_helpers.js";

const RotateEvents = (() => {
  EventBus.subscribe("rotate-on", () => mount());
  EventBus.subscribe("rotate-off", () => {
    unmount();
  });
  let container = document.querySelector(".battlefield_container.self");
  const rotate = (e) => {
    e.preventDefault();
    let target = e.target;
    if (target.classList.contains("rotatable")) {
      let point = evh.parseCoordinates(target);
      EventBus.emit("rotate", point);
    }
  };

  const mount = () => {
    container.addEventListener("click", rotate);
  };
  const unmount = () => {
    container.removeEventListener("click", rotate);
  };
})();

export default RotateEvents;
