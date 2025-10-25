import Computer from "./computer.js"
import Gameboard from "./gameboard.js"
import Player from "./player.js"
import Ship from "./ship.js"
import { EventBus } from "../event_bus.js"

let Model = {}
Model.Computer = Computer
Model.Gameboard = Gameboard
Model.Player = Player
Model.Ship = Ship

export { Model }