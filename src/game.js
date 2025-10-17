import { DOM } from "./dom.js"
import { Ship } from "./ship.js"


export class Game {
	constructor (player1, player2) {
		this.player1 = player1
		this.player2 = player2

		this.player1.opponent = this.player2	
		this.player2.opponent = this.player1

		this.current_player = this.player1

		this.gameTag = "self-opponent"
		this.game = document.querySelector(".game")
		
		this.battlefieldHandler = this.#battlefield.bind(this)
	}
	start() {
		this.#placeShips(this.player1, this.player2)
		DOM.render(this.gameTag, this.player1.gameboard, this.player2.gameboard)

		this.game.addEventListener("click", this.battlefieldHandler)
	}
	
	end() {
		this.game.removeEventListener("click", this.battlefieldHandler)
	}

	#placeShips(...players) {
    let ships = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]
    for (let player of players) {
    	player.ships = ships.map(length => new Ship(length))
    	player.ships.forEach(ship => player.gameboard.placeRandom(ship))
    }
	}
	#switchGameTag() {
		return this.gameTag === "self-opponent" ? "opponent-self" : "self-opponent"
	}
	#switchPlayer() {
		 return this.current_player === this.player1 ? this.player2 : this.player1
	}
	#battlefield(e) {
		let target  = e.target
		let battlefield_opponent = target.parentElement.parentElement.classList.contains("battlefield_opponent")

    if (battlefield_opponent) { 
        let x = target.getAttribute("data-x")
        let y = target.getAttribute("data-y")
        let attack = this.current_player.opponent.gameboard.receiveAttack(x, y)

       	this.game.textContent = ""
        if (attack === 'hit') {     
            DOM.render(this.gameTag, this.player1.gameboard, this.player2.gameboard)
        }
        else if (attack === "missed-hit") {
            DOM.showCourtain()
            setTimeout(() => {
                DOM.hideCourtain()
            }, 3000)
            this.gameTag = this.#switchGameTag()
            this.current_player = this.#switchPlayer()
       		
            DOM.render(this.gameTag, this.player1.gameboard, this.player2.gameboard)
        }

    }
	}
}