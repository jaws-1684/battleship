import { h } from "../helpers/helpers.js"

class Gameboard {
	constructor() {
		this.board = []
		this.ships = {}
		this.occupiedCells = {}
		for (let i = 0; i < 10; i++) {
  		this.board[i] = new Array(10).fill(null);
		}
	}
	receiveAttack(x, y) {
		if (!h.validCoordinates(x, y)) {
			return
		}
		let code = this.board[x][y]
		let ship = this.ships[code]
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
	rotateShip(shipId, point) {
		let ship = this.ships[shipId]
		let shipDirection = ship.direction
		let location = ship.location.toSorted()
		if (location.length <= 1) return

		let possiblePositions = {
			"up": [],
			"down": [],
			"left": [],
			"right": []
		}
		this.clear(ship.location)
		let [headX, headY] = (point > location[0]) ? location[location.length - 1] : location[0]

		for (let i = 0; i < location.length; i++) {
			if (shipDirection === "horizontal") {
				possiblePositions["down"].push([headX - i, headY])
				possiblePositions["up"].push([headX + i, headY])
			} else if (shipDirection === "vertical") {
				possiblePositions["right"].push([headX, headY + i])
				possiblePositions["left"].push([headX, headY - i])
			}
		}
		for (let coordinates of Object.values(possiblePositions)) {
			if (!Array.isArray(coordinates) || !coordinates.length) {
 				continue
			}
			if (this.validPlace(coordinates)) {
				ship.direction = shipDirection === "horizontal" ? "vertical" : "horizontal"  
				this.clear(ship.location)
				this.place(coordinates, ship)
				return true
			}
		}
		this.place(location, ship)
		return false
	}

	allSunk() {
		let ships = Object.values(this.ships)
		return ships.every(ship => ship.isSunk() === true)
	}

	place(coordinates, ship) {
		if (!this.validPlace(coordinates)) {
			return false
		}
		let code;
		if (this.ships[ship.id]) {
			code = ship.id
		} else {
			code = crypto.randomUUID()
		}
		
  	this.ships[code] = ship;
  	ship.id = code
  	ship.location = coordinates
  	
		for(let [x, y] of coordinates) {
			this.board[x][y] = code
		}
		return true
	}
	validPlace(coordinates) {
		for (let [x, y] of coordinates) {
			if (!h.validCoordinates(x, y) || !h.adjacentEmpty(x, y, this.board) || this.board[x][y] !== null) {
				return false
			}
		}
		return true
	}

	clear(oldPosition) {
		for (let [x, y] of oldPosition) {
			this.board[x][y] = null
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

export default Gameboard