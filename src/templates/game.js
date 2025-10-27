import { Grid } from "./grid.js";
import { Ships } from "./ships.js";
import { Header } from "./header.js";

export const Game = ((doc) => {
  const game = doc.querySelector(".game");
  const battlefield_container_self = doc.querySelector(".battlefield_container.self")
  const battlefield_container_opponent = doc.querySelector(".battlefield_container.opponent")
  const battlefield_self = doc.querySelector(".battlefield.battlefield_self")
  const battlefield_opponent = doc.querySelector(".battlefield.battlefield_opponent")

  const addHeaders = () => {
    [battlefield_container_self, battlefield_container_opponent].forEach(container => {
      Header.col(container);
      Header.row(container);
    })
  }

  addHeaders()
  
  const render = (...gameboards) => {
    let types = "self-opponent".split("-")
    let i = 0;
    [battlefield_self, battlefield_opponent].forEach(container => {
      buildBattlefield(container, gameboards[i], types[i])
      i++
    })
  }
  const buildBattlefield = (container, gameboard, type) => {
    container.textContent = ""
    Grid.build(container, gameboard.board, type)
    Ships.place(Object.values(gameboard.ships), container, type);
  };
  const clearAndPrepend = (gameboard) => {
    buildBattlefield(battlefield_self, gameboard, "self")
  };
  return { render, clearAndPrepend };
})(document);
