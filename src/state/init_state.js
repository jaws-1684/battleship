import { Action } from "./actions/action.js";

class InitState {
  static c;

  static on(controller) {
    this.c = controller;

    Action.Start.on(this.c)
    Action.DragNDrop.on(this.c);
    Action.Rotate.on(this.c);
    Action.Randomise.on(this.c);
  }
 
  static off() {
    Action.Start.off()
    Action.DragNDrop.off();
    Action.Rotate.off();
    Action.Randomise.off();
  }
}

export default InitState;
