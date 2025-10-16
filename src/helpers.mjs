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
        if (i > 9 || i < 0) {
            return false
        }
        else if (j > 9 || j < 0) {
            return false
        }
        return true
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
        let endX;
        let endY;

        if (directionX === 0) {
            endX =  x;
            endY = y + directionY * shipLength 
        }
        else {
           endX =  x + directionX * shipLength
           endY = y;
        }
        if (!validCoordinates(endX, endY)) {
            return false
        }
        return true
    }

    return {
      randomPoint,
      validCoordinates,
      adjacent,
      adjacentEmpty,
      randomDirX,
      randomDirY,
      validEndPoint
    }

})()