class Player {
  constructor(name) {
    this.name = name;
  }

  get ships() {
    return this._ships;
  }
  set ships(ships) {
    this._ships = ships;
    return this;
  }
  get opponent() {
    return this._opponent;
  }
  get board() {
    return this._gameboard.board;
  }
  set opponent(opponent) {
    this._opponent = opponent;
    return this;
  }
  set gameboard(gameboard) {
    this._gameboard = gameboard;
    return this;
  }
  get gameboard() {
    return this._gameboard;
  }
}

export default Player;
