import { Grid } from "./grid.js"
import { Ships } from "./ships.js"
import { Header } from "./header.js"

export const Game = ((doc) => {
	const game = doc.querySelector(".game")
	const render = (gameboards, attributes="self-opponent") => {
		let children = Array.from(game.children)
		if (children.length > 0) {
			children.forEach(child => child.remove())
		}
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
	return { render, clearAndPrepend }

})(document)