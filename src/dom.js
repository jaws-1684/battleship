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
			renderBoard(gameboard, attr[i])
			i++

		})
		addPanel()
	}
	const renderBoard = (gameboard, type) => {
		let board = gameboard.board
		let ships = Object.values(gameboard.ships)

		let container = doc.createElement("div")
		container.setAttribute("class", `battlefield_container`)
		Header.col(container)
		Header.row(container)

		let grid = Grid.build(board, type)
		Ships.place(ships, grid, type)
		
		container.append(grid)
		game.append(container)
	}
	const clear = (attr) => {
		doc.querySelector(attr).textContent = ""
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
                        <input type="radio" id="computer" name="player" value="computer" />
                        <label for="computer">Computer</label>

                        <input type="radio" id="friend" name="player" value="friend" />
                        <label for="friend">Friend</label>

                    </div>

                    <div>
                        <button type="submit">Play</button>
                    </div>
                </fieldset>
            </form>`
		panel.setAttribute("class", "start-game")
		game.querySelectorAll(".battlefield_container")[1].append(panel)
	}
	

	return { render, clear, showCourtain, hideCourtain }
}))(document)