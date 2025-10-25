import { EventBus } from "../event_bus.js";

const StartEvents = (() => {
  EventBus.subscribe("start-on", () => mount());
  EventBus.subscribe("start-off", () => unmount());

  let radioButtons;
  let panel;
  let el;

  const handler = (e) => {
    e.preventDefault();
    let selectedPlayer;

    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
        selectedPlayer = radioButton.value;
        break;
      }
    }
    EventBus.emit("start", selectedPlayer);
    unmount();
  };
  const mount = () => {
    el = document.querySelector("#startGame");
    panel = document.querySelector(".start-game");
    radioButtons = document.querySelectorAll('input[name="player"]');
    panel.classList.remove("hidden");
    el.addEventListener("click", handler);
  };
  const unmount = () => {
    panel.classList.add("hidden");
    el.removeEventListener("click", handler);
  };
})();

export default StartEvents;
