import AttackAction from "./attack_action.js"
import DragNDropAction from "./drag_n_drop_action.js"
import RandomiseAction from "./randomise_action.js"
import RotateAction from "./rotate_action.js"
import ResetAction from "./reset_action.js"

let Action = {}
Action.Attack = AttackAction
Action.DragNDrop = DragNDropAction
Action.Randomise = RandomiseAction
Action.Rotate = RotateAction
Action.Reset = ResetAction

export { Action }
