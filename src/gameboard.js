import { h } from "./helpers.js"

export class Gameboard {
	constructor() {
		this.board = []
		this.ships = {}
		this.occupiedCells = {}
		for (let i = 0; i < 10; i++) {
  		this.board[i] = new Array(10).fill(null);
		}
	}
	receiveAttack(coordinate) {
		let [x, y] = coordinate
		let code = this.board[x][y]
		let ship = this.ships[code]

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

		for(let coordinate of coordinates) {
			let [x, y] = coordinate
			this.board[x][y] = code
		}
	}

	placeRandom(ship) {
    let coordinates = []
    let checked = {}
    
    while (coordinates.length < shipLength) {
      let point = randomPoint()
      let [i, j] = point
      let dirX = randomDirX()
      let dirY = dirX === 0 ? randomDirY() : 0

      let pid = `${point}-${dirX}-${dirY}`
      if(!validEndPoint(i,j,dirX,dirY,shipLength)) {
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
              coordinates = []
              break
          }

          if (validCoordinates(cx, cy) && this.board[cx][cy] === null) {
              coordinates.push([cx, cy])
          }
          else {
              coordinates = []
              break
          }
      }
    }

    coordinates.forEach(shipCell => {
        this.occupiedCells[shipCell] = true
        adjacent(shipCell[0], shipCell[1]).forEach(cell => this.occupiedCells[cell] ? "" : this.occupiedCells[cell] = true)
  	})
       
    this.place(coordinates, ship)
	}
	mark(coordinate, marker) {
		let [x, y] = coordinate
		this.board[x][y] = marker
	}


}