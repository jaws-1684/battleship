import Gameboard from "../src/models/gameboard.js"
import Ship from "../src/models/ship.js"
import { h } from "../src/helpers/helpers.js"

describe("Gameboard class", () => {
  it("receiveAttack() method determines when the attack hit a ship", () => {
    let board = new Gameboard()
    let ship = new Ship(1)
    board.place([[0, 1]], ship)
    expect(board.receiveAttack(0,1)).toBe("hit")
  })
  it("receiveAttack() method determines when the attack did not hit a ship", () => {
    let board = new Gameboard()
    let ship = new Ship(1)
    board.place([[0, 1]], ship)
    expect(board.receiveAttack(0,2)).toBe("missed-hit")
  })
  it("allSunk() method determines when all ships have not been sunk", () => {
    let board = new Gameboard()
    let ship = new Ship(1)
    board.place([[0, 1]], ship)
    expect(board.allSunk()).toBe(false)
  })
  it("allSunk() method determines when all ships have been sunk", () => {
    let board = new Gameboard()
    let ship = new Ship(1)
    board.place([[0, 1]], ship)
    board.receiveAttack(0, 1)
    expect(board.allSunk()).toBe(true)
  })    
})
