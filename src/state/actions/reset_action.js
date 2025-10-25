import DefaultAction from "./default_action.js";

class ResetAction extends DefaultAction {
  static fns = {
    reset: () => this.c.reset(),
  };
}

export default ResetAction;
