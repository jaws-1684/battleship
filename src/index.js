import "./styles.css";
import { Player } from "./player.js"
import { Computer } from "./computer.js"
import { Gameboard } from "./gameboard.js"
import { Game } from "./game.js"
import { DOM } from "./dom.js"



function withElements(funct) {
    const randomise = document.querySelector("#randomise")
    const reset = document.querySelector("#reset")
    const radioButtons = document.querySelectorAll('input[name="player"]');
    const panel = document.querySelector(".start-game")
    const startGame = document.querySelector("#startGame")

    funct({ randomise, reset, radioButtons, panel, startGame })
}

let axis = new Player("axis", new Gameboard())
let antanta = new Computer("computer", new Gameboard())
axis.opponent = antanta
antanta.opponent = axis


let game = new Game(axis, antanta)

game.prepare()

function randomiseListener() {
    axis.gameboard = new Gameboard()
    game.update()
}
randomise.addEventListener("click", randomiseListener)
DOM.message("Start the game")


function startHandler (e) {
	e.preventDefault()
    let selectedPlayer;

    withElements((object) => {
        let { panel, startGame, randomise, reset, radioButtons } = object
        for (const radioButton of radioButtons) {
                if (radioButton.checked) {
                    selectedPlayer = radioButton.value;
                    break;
                }
            }
        panel.remove()
        startGame.removeEventListener("click", startHandler)
        randomise.removeEventListener("click", randomiseListener)
        randomise.classList.add("hidden")
        reset.classList.remove("hidden")   
    })
                   
  if (selectedPlayer === "computer") {
  	game.start()
  }
  else {
  	let friend = new Player("friend", antanta.gameboard)
    game.player2 = friend
    axis.opponent = friend
    friend.opponent = axis
  	game.start()
  }        
}


reset.addEventListener("click", () => {
    game.end()
    axis.gameboard = new Gameboard()
    antanta.gameboard = new Gameboard()
    game.prepare()
    withElements((object) => {
        let { startGame, randomise, reset } = object
        reset.classList.add("hidden")
        randomise.classList.remove("hidden")
        startGame.addEventListener("click", startHandler)
    })
})

startGame.addEventListener("click", startHandler)