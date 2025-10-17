import "./styles.css";
import { Ship } from "./ship.js"
import { Gameboard } from "./gameboard.js"
import { Player } from "./player.js"
import { DOM } from "./dom.js"
import { h } from "./helpers.mjs"

function placeShipsFor(player) {
    let shipsLengths = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
    player.ships = shipsLengths.map(length => new Ship(length))
    player.ships.forEach(ship => player.gameboard.placeRandom(ship))
}

let axis = new Player("axis")
placeShipsFor(axis)
let antanta = new Player("antanta")
placeShipsFor(antanta)

DOM.renderBoard(axis.gameboard, "self")
DOM.renderBoard(antanta.gameboard, "opponent")
const switchPlayer = function (currentPlayer, player1, player2) {
    return currentPlayer == player1 ? player2 : player1
  };
let current_player = axis
let opponent = switchPlayer(current_player, axis, antanta)

let game = document.querySelector(".game")
game.addEventListener("click", (e) => {
   

    let target  = e.target
    console.log(target)

    if (target.parentElement.parentElement.classList.contains("battlefield_opponent")) {
       
        let x = target.getAttribute("data-x")
        let y = target.getAttribute("data-y")
        let attack = opponent.gameboard.receiveAttack(x, y)
        document.querySelector(".game").textContent = ""
        let axisTag = current_player === axis ? "self" : "opponent"
        let antantaTag =  current_player === antanta ? "self" : "opponent"
        if (attack === 'hit') {     
            DOM.renderBoard(axis.gameboard, axisTag)
            DOM.renderBoard(antanta.gameboard, antantaTag)
        }
        else if (attack === "missed-hit") {
            // document.querySelector(".pass-device").classList.toggle("hidden")
            // setTimeout(() => {
            //     document.querySelector(".pass-device").classList.toggle("hidden")
            // }, 1000)
            current_player = current_player === axis ? antanta : axis
            opponent = current_player === axis ? antanta : axis
            axisTag = current_player === axis ? "self" : "opponent"
            antantaTag =  current_player === antanta ? "self" : "opponent"
            DOM.renderBoard(axis.gameboard, axisTag)
            DOM.renderBoard(antanta.gameboard, current_player === antanta ? "self" : "opponent")
         
        }

    }
})

