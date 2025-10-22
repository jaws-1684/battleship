import { Grid } from "./components/grid.js"
import { Ships } from "./components/ships.js"
import { Header } from "./components/header.js"

export const DOM = ((doc => {
	const game = doc.querySelector(".game")
	const passDeviceScreen = doc.querySelector(".pass-device")
	const counter = passDeviceScreen.querySelector(".time")

	const render = (attributes, ...gameboards) => {
		let attr = attributes.split("-")
		let i = 0
	
		gameboards.forEach(gameboard => {
			game.append(buildBoard(gameboard, attr[i]))
			i++
		})
	}

	const buildBoard = (gameboard, type) =>{
		let board = gameboard.board
		let ships = Object.values(gameboard.ships)

		let container = doc.createElement("div")
		
		container.setAttribute("class", `battlefield_container`)
		Header.col(container)
		Header.row(container)

		let grid = Grid.build(board, type)
		Ships.place(ships, grid, type)
		
		container.append(grid)
		let desp = document.createElement("p")
		desp.textContent = type === "self" ? "Your board" : "Opponent's board"
		desp.classList.add("desp")
		container.append(desp)
		return container
	}
	const clearAndPrepend = (gameboard, type="self") => {
		let self = doc.querySelectorAll(".battlefield_container")[0]
		self.remove()
		game.prepend(buildBoard(gameboard, type))
	}
	const clear = (attr) => {
		doc.querySelector(attr).textContent = ""
	}
	const message = (str) => {
		let block = doc.querySelector(".messages")
		block.textContent = str
	}
	const showCourtain = () => {
		passDeviceScreen.classList.toggle("hidden")
		counter.textContent = "."
		for (let i = 1; i < 10; i++) {
			setTimeout(() => counter.textContent = counter.textContent + ".", 1000 * i)
		}
	}
	const hideCourtain = () => {
		passDeviceScreen.classList.toggle("hidden")
	}
	const addPanel = () => {
		let panel = doc.createElement("div")
		panel.innerHTML = `
            <form>
                <fieldset>
                    <legend>Opponent</legend>
                    <div>
                        <input type="radio" id="computer" name="player" value="computer" checked/>
                        <label for="computer">Computer</label>

                        <input type="radio" id="friend" name="player" value="friend" />
                        <label for="friend">Friend</label>

                    </div>

                    <div>
                        <button type="button" id="startGame">Play</button>
                    </div>
                </fieldset>
            </form>`
		panel.setAttribute("class", "start-game")
		if (!doc.querySelector(".start-game")) {
			game.querySelectorAll(".battlefield_container")[1].append(panel)
		}
		
	}

	return { render, clear, showCourtain, hideCourtain, addPanel, message, clearAndPrepend }
}))(document)
