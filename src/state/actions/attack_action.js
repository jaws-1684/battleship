import { h } from "../../helpers/helpers.js";
import { _ } from "../../helpers/underscore.js";
import DefaultAction from "./default_action.js";

class AttackAction extends DefaultAction {
  static async attack(point) {
    let attack = this.c.current_player.opponent.gameboard.receiveAttack(
      ...point,
    );
    await this.attackResponse(attack);
    _.message(attack);
    _.render("game", { current_player: this.c.current_player });
  }
  static async attackResponse(attack) {
    if (attack === "target-twice") {
      _.message("Cannot target the same point twice");
      return;
    }

    if (
      attack === "hit" &&
      this.c.current_player.opponent.gameboard.allSunk()
    ) {
      _.message("Game over " + this.c.current_player.name + " won.");
      this.c.end();
    } else if (attack === "missed-hit") {
      let computerAttack;
      switch (this.c.current_player.opponent.name) {
        case "computer":
          computerAttack = this.c.player2.makeMove();
          _.message(computerAttack);
          _.render("game", { current_player: this.c.current_player });

          while (computerAttack === "hit") {
            await h.sleep(1000);
            computerAttack = this.c.player2.makeMove();
            _.message(computerAttack);
            _.render("game", { current_player: this.c.current_player });

            if (this.c.player1.gameboard.allSunk()) {
              _.message("Game over c0mput3r won.");
              this.c.end();
              return;
            }
          }
          break;
        default:
          _.show("courtain");
          this.c.switchPlayer();
          break;
      }
    }
  }
  static fns = {
    attack: (point) => this.attack(point),
  };
}

export default AttackAction;
