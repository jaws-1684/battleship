import { h } from "../../helpers/helpers.js";
import { _ } from "../../helpers/underscore.js";
import { EventBus } from "../../event_bus.js";
import { Param } from "../../param.js";
import DefaultAction from "./default_action.js";

class DragNDropAction extends DefaultAction {
  static dragstart(point) {
    let ship = h.getShip(point, this.c.current_player.gameboard);

    if (ship) {
      let len = Number(ship.length);
      let dir = ship.direction;
      let id = ship.id;
      this.c.current_player.gameboard.clear(ship.location);

      Param.bulkSet({
        shipLength: len,
        shipId: id,
        shipDirection: dir
      })
      // EventBus.emit("set-data", { len, dir, shipId });
    }
  }

  static dragover(cells) {
    let color = this.c.current_player.gameboard.validPlace(cells) ? "lightgreen" : "red"
    Param.setParam("dragOverColor", color)
  }
  static async drop(id, newLocation) {
    let ship = h.getShipById(id, this.c.current_player.gameboard);
    let oldLocation = ship.location;

    if (this.c.current_player.gameboard.place(newLocation, ship)) {
      ship.location = newLocation;
      _.prepend("board", { gameboard: this.c.current_player.gameboard });
      _.message("Position updated!")
    } else {
      this.c.current_player.gameboard.place(oldLocation, ship);
    }
  }
  static fns = {
    dragstart: (point) => this.dragstart(point),
    dragover: (cells) => this.dragover(cells),
    drop: ({ id, newLocation }) => this.drop(id, newLocation),
  };
}

export default DragNDropAction;
