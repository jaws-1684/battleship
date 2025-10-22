import Ship from "../src/models/ship.js"

describe("Ship class", () => {
  it("hit() method returns undefined", () => {
    let ship = new Ship(1)
    expect(ship.hit()).toBe(undefined)
  })
  it("isSunk() method that returns true if ship is sank", () => {
    let ship = new Ship(1)
    ship.hit()
    expect(ship.isSunk()).toBe(true)
  })
  it("isSunk() method that returns false if ship is not sank", () => {
    let ship = new Ship(4)
    ship.hit()
    expect(ship.isSunk()).toBe(false)
  })
})
