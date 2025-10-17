import "./styles.css";
import { Player } from "./player.js"
import { Gameboard } from "./gameboard.js"
import { Game } from "./game.js"

let axis = new Player("axis", new Gameboard())
let antanta = new Player("antanta", new Gameboard())
let game = new Game(axis, antanta)

game.start()

// game.end()