export const Ships = (() => {
	const place = (ships, grid, type) => {

		if (type !== 'self') {
			return
		}

		for (let ship of ships) {
			let location = ship.location.sort()
			for (let i = 0; i < location.length; i++) {
				let pos = location[i]
				let direction = ship.direction

				if (i === 0) {
					addShipTag(grid, pos, direction,"head")
				} else if (i === location.length - 1) {
					addShipTag(grid, pos, direction,"tail")
				}
				addShipTag(grid, pos, direction)
			}
		}
	}
	const addShipTag = (grid, location, direction, attr="body") => {
		let [x, y] = location
		let rows = Array.from(grid.children)
		let cells =  Array.from(rows[x].children)
		switch (direction) {
					case "horizontal":
						cells[y].classList.add(`horizontal-${attr}`)
						break
					case "vertical":
						cells[y].classList.add(`vertical-${attr}`)	
						break
					case "":
						cells[y].classList.add('static')
						break
					default:			 
				}
	}
	return { place }
})()