import { evh } from "./event_helpers.js"
import { EventBus } from "../event_bus.js"

const DragNdropEvents = (() => {
	let length;
	let direction;
	let id;
	let activeCells = [];
	let color;

	EventBus.subscribe("dragDrop-on", () => mount())
	EventBus.subscribe("color", (c) => color = c) 
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
  	e.preventDefault();

  	if (target.hasAttribute("drag") || !target.classList.contains("cell")) {
  			return
  	}
		let parent = target.parentElement.parentElement
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
				activeCells.push(cell)
		}
		let coordinates = activeCells.map(cell => evh.parseCoordinates(cell))
		EventBus.emit("dragOver", coordinates)
		activeCells.forEach(cell => cell.style.cssText = `border: 2px solid ${color}`)
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
		Object.keys(listeners).forEach(key => el.removeEventListener(key, listeners[key]))
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
			activeCells.push(cell)
		}	
  }
})()

export default DragNdropEvents