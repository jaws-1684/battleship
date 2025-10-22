import { h } from "./helpers.mjs"

export class Gameboard {
	constructor() {
		this.board = []
		this.ships = {}
		this.occupiedCells = {}
		for (let i = 0; i < 10; i++) {
  		this.board[i] = new Array(10).fill(null);
		}
	}
	receiveAttack(x, y) {
		let code = this.board[x][y]
		let ship = this.ships["ship_" + code]
		if (code === "hit" || code === "missed-hit") {
			return "target-twice"
		}

		if (ship) {
			ship.hit()
			this.board[x][y] = "hit"
			return "hit"
		}
		else {
			this.board[x][y] = "missed-hit"
			return "missed-hit"
		}
	}

	allSunk() {
		let ships = Object.values(this.ships)
		return ships.every(ship => ship.isSunk() === true)
	}

	place(coordinates, ship) {
		let code = crypto.randomUUID()
  	this.ships[code] = ship;
  	ship.location = coordinates

		for(let coordinate of coordinates) {
			let [x, y] = coordinate
			this.board[x][y] = code
		}
	}

	placeRandom(ship) {
		let shipLength = ship.length
    let coordinates = []
    let direction = ""
    let checked = {}
    
    while (coordinates.length < shipLength) {
      let point = h.randomPoint()
      let [i, j] = point
      let dirX = h.randomDirX()
      let dirY = dirX === 0 ? h.randomDirY() : 0

      let pid = `${point}-${dirX}-${dirY}`
      if(!h.validEndPoint(i,j,dirX,dirY,shipLength)) {
          continue
      }
      if (checked[pid] || this.occupiedCells[point]) {
          continue
      }
      checked[pid] = true
      coordinates.push([i, j])

      for (let k = 1; k < shipLength; k++) {
          let cy = dirY === 0 ? j : j + (k * dirY)
          let cx = dirX === 0 ? i : i + (k * dirX)
          if (this.occupiedCells[[cx,cy]]) {
          		direction = ""
              coordinates = []
              break
          }

          if (h.validCoordinates(cx, cy) && this.board[cx][cy] === null) {
          		direction = dirX === 0 ? "horizontal" : "vertical" 
              coordinates.push([cx, cy])
          }
          else {
          		direction = ""
              coordinates = []
              break
          }
      }

    }

    coordinates.forEach(shipCell => {
        this.occupiedCells[shipCell] = true
        h.adjacent(shipCell[0], shipCell[1]).forEach(cell => this.occupiedCells[cell] ? "" : this.occupiedCells[cell] = true)
  	})
  	ship.direction = direction
    this.place(coordinates, ship)
	}
}