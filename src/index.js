import "./styles.css";
import background from "./assets/background.png"
import { Battleship } from "./battleship.js";

document.body.style.cssText = `background: url(${background});`
let game = new Battleship("axis", "computer");

game.init();
