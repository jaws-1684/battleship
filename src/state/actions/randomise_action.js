import DefaultAction from "./default_action.js";

class RandomiseAction extends DefaultAction {
  static randomise() {
    this.c.newBoard();
    this.c.update();
  }
  static fns = {
    randomise: () => this.randomise(),
  };
}

export default RandomiseAction;
