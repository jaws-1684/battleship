import DefaultAction from "./default_action.js";
import { EventBus } from "../../event_bus.js";
import  ReadyAction  from "./ready_action.js"
import { _ } from "../../helpers/underscore.js";

class StartAction extends DefaultAction {
   static start(secondPlayer) {
    if (secondPlayer == "friend") {
      this.c.setPlayer("friend");
      this.c.switchPlayer();
      _.show("courtain");
      _.render("game", { current_player: this.c.current_player });
      _.render("fight");
      ReadyAction.on(this.c)
    } else {
       this.c.start();
    }
  }
  static fns = {
    start: (secondPlayer) => this.start(secondPlayer),
  };
}

export default StartAction;
