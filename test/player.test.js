import Player from "../src/models/player.js"

describe("Player class", () => {
  it("initializes with a name", () => {
    let player = new Player("spongebob")
    expect(player.name).toBe("spongebob")
  })
})
