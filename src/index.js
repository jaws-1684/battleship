import "./styles.css";
import background from "./assets/background.png"
import favicon from "./assets/favicon.png"
import { Battleship } from "./battleship.js";

let faviconEl = document.querySelector('#favicon')
faviconEl.href = favicon
document.body.style.cssText = `background: url(${background});`
let game = new Battleship("axis", "computer");

game.init();
