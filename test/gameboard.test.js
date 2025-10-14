import { Gameboard } from "../src/gameboard.js"

describe("Gameboard class", () => {
  it("receiveAttack() method determines when the attack hit a ship", () => {
    let board = new Gameboard()
    board.placeShip([[0, 1]], "destroyer")
    expect(board.receiveAttack([0,1])).toBe("hit")
  })
  it("receiveAttack() method determines when the attack did not hit a ship", () => {
    let board = new Gameboard()
    board.placeShip([[0, 1]], "destroyer")
    expect(board.receiveAttack([0,2])).toBe("missed-hit")
  })
  it("allSunk() method determines when all ships have not been sunk", () => {
    let board = new Gameboard()
    board.placeShip([[0, 1]], "destroyer")
    expect(board.allSunk()).toBe(false)
  })
  it("allSunk() method determines when all ships have been sunk", () => {
    let board = new Gameboard()
    board.placeShip([[0, 1]], "destroyer")
    board.receiveAttack([0, 1])
    expect(board.allSunk()).toBe(true)
  })    
})
