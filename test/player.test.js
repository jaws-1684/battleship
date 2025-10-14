import { Player } from "../src/player.js"

describe("Player class", () => {
  it("initializes with an injected board", () => {
    let player = new Player("spongebob")
    expect(player.gameboard.board.length).toBe(10)
  })
})
