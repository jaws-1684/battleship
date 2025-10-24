import { evh } from "./event_helpers.js"
import { EventBus } from "../event_bus.js"

export const DragactiveCells = (() => {
	let length;
	let direction;
	let id;
	let activeCells = [];

	EventBus.subscribe("dragDrop-on", () => mount())
	EventBus.subscribe("dragDrop-off", () => {
		unmount()
	})
	EventBus.subscribe("set-data", ({ len, dir, shipId }) => {
		length = len
		direction = dir
		id = shipId
	})
	

	let container = document.querySelector(".game")
	let el;
	const dragstart = (e) => {
    if (e.target.hasAttribute("drag")) {
      let point = evh.parseCoordinates(e.target)
     		EventBus.emit("dragPoint", point)
    }
	}

	const dragover = (e) => {
		let target = e.target
		let parent = target.parentElement.parentElement
  	e.preventDefault();

  	if (target.hasAttribute("drag") || !target.classList.contains("cell")) {
  			return
  	}
		
  	clearCells()

		let [x, y] = evh.parseCoordinates(target)
		
		switch (direction) {
			case "vertical":
				calculateVerticalPos(parent, x, y)
				break
			case "horizontal":
				calculateHorizontalPos(parent, x, y)
				break
			default:
				let cell = target
				cell.style.cssText = "border: 1px solid red;"
				activeCells.push(cell)
		}
	}
	const drop = (e) => {
		e.preventDefault();
		let newLocation = []
		if (activeCells.length !== length) {
			return
		}
		activeCells.forEach(cell => {
			newLocation.push(evh.parseCoordinates(cell))
		})
		validateCells()
		EventBus.emit("dropReplace", { id, newLocation })
	}

	const listeners = {
		"dragstart": dragstart,
		"dragover": dragover,
		"drop": drop
	}
	

	const mount = () => {
		el = container.querySelector(".battlefield_self")
		Object.keys(listeners).forEach(key => el.addEventListener(key, listeners[key]))
	}
	const unmount = () => {
		activeCells = []
		Object.keys(listeners).forEach(key => el.addEventListener(key, listeners[key]))
	}
	const validCoordinates = (i, j) => {
    return (i < 10 && i >= 0) && (j < 10 && j >= 0)
  }
  const clearCells = () => {
  	while (activeCells.length > 0) {
			let cell = activeCells.shift()
			cell.style.cssText = ""
		}
  }
  const validateCells = () => {
  		while (activeCells.length > 0) {
			let cell = activeCells.shift()
			cell.style.cssText = "border: 1px solid green"
		}
  }
  const calculateHorizontalPos = (parentNode, x, y) => {
  	let rows = Array.from(parentNode.children)
  	let cells = Array.from(rows[x].children)
		for (let i = 0; i < length; i++) {
			if (!validCoordinates(x, y+i)) {
				clearCells()
				break
			}
			let cell = cells[y+i]
			if (cell.hasAttribute("drag")) {
				clearCells()
				break
			}
			cell.style.cssText = "border: 1px solid red;"
			activeCells.push(cell)
		}	
  }
  const calculateVerticalPos = (parentNode, x, y) => {
  	let rows = Array.from(parentNode.children)
		for (let i = 0; i < length; i++) {
			if (!validCoordinates(x+i, y)) {
				clearCells()
				break
			}
			let cells = Array.from(rows[x+i].children)
			let cell = cells[y]
			if (cell.hasAttribute("drag")) {
				clearCells()
				break
			}
			cell.style.cssText = "border: 1px solid red;"
			activeCells.push(cell)
		}	
  }
})()