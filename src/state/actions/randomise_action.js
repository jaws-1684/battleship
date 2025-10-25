import DragNDropAction from "./drag_n_drop_action.js";
import RotateAction from "./rotate_action.js";
import DefaultAction from "./default_action.js";

class RandomiseAction extends DefaultAction {
  static randomise() {
    this.c.newBoard();
    this.c.update();

    DragNDropAction.restart();
    RotateAction.restart();
  }
  static fns = {
    randomise: () => this.randomise(),
  };
}

export default RandomiseAction;
