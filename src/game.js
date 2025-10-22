import { DOM } from "./dom.js"
import { Ship } from "./ship.js"
import { h } from "./helpers.mjs"
export class Game {
	constructor (player1, player2) {
		this.player1 = player1
		this.player2 = player2
		this.current_player = this.player1

		this.gameTag = "self-opponent"
		this.game = document.querySelector(".game")

		this.handler = this.#battlefield.bind(this)
		this.dragHandler = this.#drag.bind(this)
		this.events = []
		this.shipLength;
		this.shipDirection;
	}

	prepare() {
		this.game.textContent = ""
		this.#placeShips(this.player1, this.player2)
		DOM.render(this.gameTag, this.player1.gameboard, this.player2.gameboard)
		DOM.addPanel()

		this.battlefieldSelf = document.querySelector(".battlefield_self")
		this.battlefieldSelf.addEventListener("dragstart", this.dragHandler)

		// Cancel dragover so that drop can fire
		this.battlefieldSelf.addEventListener("dragover", (ev) => {
			let target = ev.target
  		ev.preventDefault();
  		if (target.hasAttribute("drag")) {
  			return
  		}
  		while (this.events.length > 0) {
  			let lastEvent = this.events.shift()
  			lastEvent.style.cssText = ""
  		}

  		let [x, y] = this.#parseCoordinates(target)
			let rows = Array.from(this.battlefieldSelf.children)
  		
			let el;
			console.log(this.shipDirection)
			switch (this.shipDirection) {

				case "vertical":
					break
				case "horizontal":
					console.log("horizontal")
					let cells = Array.from(rows[x].children)
					cells[y+0].style.cssText = "border: 1px solid red;"
					cells[y+1].style.cssText = "border: 1px solid red;"
					cells[y+2].style.cssText = "border: 1px solid red;"
					this.events.push(cells[y+0], cells[y+1], cells[y+2])
					break
				default:
					el = target
			}
		});
		this.battlefieldSelf.addEventListener("drop", (ev) => {
  		ev.preventDefault();
  		if (ev.target.classList.contains("cell")) {
  			
  		}	
		}); 
	}
	update() {
		this.#placeShips(this.player1)
		DOM.clearAndPrepend(this.player1.gameboard)
	}
	start() {
		this.battlefieldSelf.removeEventListener("dragstart", this.dragHandler)
		this.game.addEventListener("click", this.handler)
	}
	
	end() {
		this.game.removeEventListener("click", this.handler)
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
	async #battlefield(e) {
		DOM.message("Hit a target")
		let target  = e.target
		if (!this.#validTarget(target)) {
				return
		}

		let [x, y] = this.#parseCoordinates(target)
		let attack = this.current_player.opponent.gameboard.receiveAttack(x, y)
		if (attack === "target-twice") {
			DOM.message("Cannot target the same point twice.")
			return
		}
	   	this.game.textContent = ""

	    if (attack === 'hit') {
	      	 if (this.current_player.opponent.gameboard.allSunk()) {
	    				DOM.message("Game over " + this.current_player.name + " won.")
	    				this.end()
	    				return
	    			}
	    }
	    else if (attack === "missed-hit" && this.player2.name !== "computer") {
	    	DOM.showCourtain()
		            setTimeout(() => {
		                DOM.hideCourtain()
		            }, 3000)

		    this.gameTag = this.#switchGameTag()
    		this.current_player = this.#switchPlayer()
	    } else if (attack === "missed-hit" && this.player2.name === "computer") {
	        let computerAttack = this.player2.makeMove()
	        this.#setMessage(computerAttack)
	        DOM.render(this.gameTag, this.player1.gameboard, this.player2.gameboard)
	        while (computerAttack === "hit") {
	        	await h.sleep(1000);
	        	computerAttack = this.player2.makeMove()
	        	this.#setMessage(computerAttack)
	        
	        	this.game.textContent = ""
	        	DOM.render(this.gameTag, this.player1.gameboard, this.player2.gameboard)
	        	if (this.player1.gameboard.allSunk()) {
	    				DOM.message("Game over c0mput3r won.")
	    				this.end()
	    				return
	    			}
	        }
	        return
	    }
	    this.#setMessage(attack)
	    DOM.render(this.gameTag, this.player1.gameboard, this.player2.gameboard)  
	}
	#drag(e) {
		let cell = e.target.classList.contains("cell")
    if (cell) {
      let [x, y] = this.#parseCoordinates(e.target)
      let shipId = this.current_player.board[x][y]
      let ship = this.current_player.gameboard.ships[shipId]
      if (ship) {
      	this.shipLength = Number(ship.length)
      	this.shipDirection = ship.direction
      }
    }
	}
	#validTarget(target) {
		let battlefield_opponent = target.parentElement.parentElement.classList.contains("battlefield_opponent")
		return battlefield_opponent 
	}
	#parseCoordinates(target) {
		let x = Number(target.getAttribute("data-x"))
    let y = Number(target.getAttribute("data-y"))
    return [x, y]
	}
	#setMessage(attack) {
	    let message = attack === "hit" ? "Hit" : "Missed hit"
	    DOM.message(message + ".")
	}
}
