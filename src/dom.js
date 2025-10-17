import { Grid } from "./components/grid.js"
import { Ships } from "./components/ships.js"
import { Header } from "./components/header.js"

export const DOM = ((doc => {
	const game = doc.querySelector(".game")

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

	return { renderBoard }
}))(document)