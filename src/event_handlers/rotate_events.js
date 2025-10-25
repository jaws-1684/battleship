import { EventBus } from "../event_bus.js";
import { evh } from "./event_helpers.js";

const RotateEvents = (() => {
  EventBus.subscribe("rotate-on", () => mount());
  EventBus.subscribe("rotate-off", () => {
    unmount();
  });
  let cells;
  const rotate = (e) => {
    e.preventDefault();
    let target = e.target;
    let point = evh.parseCoordinates(target);
    EventBus.emit("rotate", point);
    return;
  };

  const mount = () => {
    cells = document.querySelectorAll(".cell.rotatable");
    cells.forEach((cell) => cell.addEventListener("click", rotate));
  };
  const unmount = () => {
    cells.forEach((cell) => cell.removeEventListener("click", rotate));
  };
})();

export default RotateEvents;
