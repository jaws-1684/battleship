Array.prototype.sample = function() {
  return this[~~(Math.random() * this.length)];
}

export const h = (() => {
    function adjacent(i, j) {
        let adjacent = [
            [i-1, j-1], [i-1, j], [i-1, j+1],
            [i, j-1], [i, j+1],
            [i+1, j-1], [i+1, j], [i+1, j+1]
        ]
        return  adjacent.filter(([x, y]) => validCoordinates(x, y))
    }

    function random() {
        let rand = Math.floor(Math.random() * 9)
        return rand
    }

    function validCoordinates(i, j) {
        return (i < 10 && i >= 0) && (j < 10 && j >= 0)
    }

    function adjacentEmpty(i, j, board=[] ) {
        let cells = adjacent(i, j)
        
        for (let [x, y] of cells) {
            if (board[x][y] !== null) {
                return false 
            }
        }
        return true
    }

    function randomPoint() {
        let [i, j] = [random(), random()]
        return [i, j]
    }


    function randomDirX() {
        let orientation = [-1, 0, 1]
        return orientation.sample()
    }

    function randomDirY() {
        let orientation = [1, -1]
        return orientation.sample()
    }
    function validEndPoint(x, y, directionX, directionY, shipLength) {
        shipLength = shipLength - 1
        let endX = directionX === 0 ? x : x + directionX * shipLength;
        let endY = directionY === 0 ? y : y + directionY * shipLength 
        return validCoordinates(endX, endY)
    }
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return {
      randomPoint,
      validCoordinates,
      adjacent,
      adjacentEmpty,
      randomDirX,
      randomDirY,
      validEndPoint,
      sleep
    }

})()
