import DefaultAction from "./default_action.js";
import { _ } from "../../helpers/underscore.js";


class ReadyAction extends DefaultAction {
  static ready() {
    _.render("game", { current_player: this.c.current_player });
    this.c.start();
    this.off()
  }
  static fns = {
    ready: () => this.ready(),
  };
}

export default ReadyAction;
