import DefaultAction from "./default_action.js";

class ResetAction extends DefaultAction {
  static reset() {
    this.c.reset()
  }
  static fns = {
    reset: () => this.reset()
  };
}

export default ResetAction;
