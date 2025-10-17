import { Grid } from "./components/grid.js"
import { Ships } from "./components/ships.js"
import { Header } from "./components/header.js"

export const DOM = ((doc => {
	const game = doc.querySelector(".game")
	const passDeviceScreen = doc.querySelector(".pass-device")
	const counter = passDeviceScreen.querySelector(".time")

	const render = (attributes, ...gameboards) => {
		let attr = attributes.split("-")
		console.log(attr)
		let i = 0
		gameboards.forEach(gameboard => {
			renderBoard(gameboard, attr[i])
			i++
		})
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
	

	return { render, clear, showCourtain, hideCourtain }
}))(document)