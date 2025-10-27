import { evh } from "./event_helpers.js";
import { EventBus } from "../event_bus.js";
import { Param } from "../param.js";

const DragNdropEvents = (() => {
  let activeCells = [];

  EventBus.subscribe("dragstart-on", () => mount());
  EventBus.subscribe("color", (c) => (color = c));
  EventBus.subscribe("dragstart-off", () => unmount());

  let container = document.querySelector(".battlefield_container.self");
  // let el;
  const dragstart = (e) => {
    console.log(e)
    e.dataTransfer.setData('text', 'anything');
    e.dataTransfer.setDragImage(new Image(), 0, 0);  
    if (e.target.hasAttribute("draggable")) {
      let point = evh.parseCoordinates(e.target);
      EventBus.emit("dragstart", point);
    }
  };

  const dragover = (e) => {
    e.preventDefault();

    if (e.target.hasAttribute("draggable") || !e.target.classList.contains("cell")) {
      return;
    }
    let target = e.target;
    let [shipLength, shipDirection, color] = Param.bulkGet("shipLength", "shipDirection", "dragOverColor") 

    let parent = target.parentElement.parentElement;
    clearCells();

    let [x, y] = evh.parseCoordinates(target);

    switch (shipDirection) {
      case "vertical":
        calculateVerticalPos(parent, shipLength, x, y);
        break;
      case "horizontal":
        calculateHorizontalPos(parent, shipLength, x, y);
        break;
      default:
        activeCells.push(target);
        break;
    }
    let coordinates = activeCells.map((cell) => evh.parseCoordinates(cell));
    EventBus.emit("dragover", coordinates);
    activeCells.forEach(
      (cell) => (cell.style.cssText = `border: 2px solid ${color}`),
    );
  };
  const drop = (e) => {
    if(e.preventDefault) { e.preventDefault(); }
    if(e.stopPropagation) { e.stopPropagation(); }

    let shipLength = Param.getParam("shipLength")
    if (activeCells.length !== shipLength) {
      return;
    }
    let id = Param.getParam("shipId")
    let newLocation = [];

    activeCells.forEach((cell) => {
      newLocation.push(evh.parseCoordinates(cell));
    });
    EventBus.emit("drop", { id, newLocation });
  };

  const listeners = {
    dragstart: dragstart,
    dragover: dragover,
    drop: drop,
  };

  const mount = () => {
    // el = container.querySelector(".battlefield_self");
    Object.keys(listeners).forEach((key) =>
      container.addEventListener(key, listeners[key]),
    );
  };
  const unmount = () => {
    activeCells = [];
    Object.keys(listeners).forEach((key) =>
      container.removeEventListener(key, listeners[key]),
    );
  };
  const validCoordinates = (i, j) => {
    return i < 10 && i >= 0 && j < 10 && j >= 0;
  };
  const clearCells = () => {
    while (activeCells.length > 0) {
      let cell = activeCells.shift();
      cell.style.cssText = "";
    }
  };
  const calculateHorizontalPos = (parentNode, length, x, y) => {
    let rows = Array.from(parentNode.children);
    let cells = Array.from(rows[x].children);
    for (let i = 0; i < length; i++) {
      if (!validCoordinates(x, y + i)) {
        clearCells();
        break;
      }
      let cell = cells[y + i];
      if (cell.hasAttribute("drag")) {
        clearCells();
        break;
      }
      activeCells.push(cell);
    }
  };
  const calculateVerticalPos = (parentNode, length, x, y) => {
    let rows = Array.from(parentNode.children);
    for (let i = 0; i < length; i++) {
      if (!validCoordinates(x + i, y)) {
        clearCells();
        break;
      }
      let cells = Array.from(rows[x + i].children);
      let cell = cells[y];
      if (cell.hasAttribute("drag")) {
        clearCells();
        break;
      }
      activeCells.push(cell);
    }
  };
})();

export default DragNdropEvents;
