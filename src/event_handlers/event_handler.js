import RandomiseEvents from "./randomise_events.js";
import StartEvents from "./start_events.js";
import AttackEvents from "./attack_events.js";
import ResetEvents from "./reset_events.js";
import DragNdropEvents from "./drag_n_drop_events.js";
import RotateEvents from "./rotate_events.js";
import ReadyEvents from "./ready_events.js";

let EventHandler = {};

EventHandler.Randomise = RandomiseEvents;
EventHandler.Start = StartEvents;
EventHandler.Attack = AttackEvents;
EventHandler.Reset = ResetEvents;
EventHandler.DragNdrop = DragNdropEvents;
EventHandler.Rotate = RotateEvents;
EventHandler.Ready = ReadyEvents;

export { EventHandler };
