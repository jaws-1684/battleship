import { EventBus } from "../event_bus.js"

export const StartEvents = (() => {
  EventBus.subscribe("start-on", () => mount())
  EventBus.subscribe("start-off", () => unmount())
  
  let radioButtons;
  let panel;
  let el;

  const handler = (e) => {
   e.preventDefault()
    let selectedPlayer;

    for (const radioButton of radioButtons) {
      if (radioButton.checked) {
          selectedPlayer = radioButton.value;
          break;
      }
    }
    EventBus.emit("randomise-off")
    EventBus.emit("reset-on")
    EventBus.emit("start", selectedPlayer) 
    unmount()  
  }
  const mount = () => {
    el = document.querySelector("#startGame")
    panel = document.querySelector(".start-game")
    radioButtons = document.querySelectorAll('input[name="player"]');
    el.addEventListener("click", handler)
  }
  const unmount = () => {
    panel.remove()
    el.removeEventListener("click", handler)
  }
})()
