import { EventHandler } from "../event_handlers/event_handler.js"
import InitState from "./init_state.js";
import RunState from "./run_state.js";

let State = {};
State.Init = InitState;
State.Run = RunState;

export { State };
