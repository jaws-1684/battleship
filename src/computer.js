import { Player } from "./player.js"
import { h } from "./helpers.mjs"

export class Computer extends Player {
	constructor (name, gameboard) {
		super(name, gameboard)
		this.missedHits = {}
		this.hits = {}
		this.hotPoints = []
	}
	makeMove() {
		let point;
		let selected = false

		
		while (!selected) {
			if (this.hotPoints.length > 0) {
				point = this.hotPoints.shift()
			} else {
				point = h.randomPoint()
			}
			
			if (!this.freePoint(point)){
				continue
			} else {
				selected = true
			}
		}
		let attack = this._opponent.gameboard.receiveAttack(...point)
		if (attack === "hit") {
			this.hits[point] = true
			h.adjacent(...point).forEach(point => this.hotPoints.push(point))
		} else {
			this.missedHits[point] = true
		} 

		


		return attack
	}
	freePoint(point) {
		return (this.missedHits[point] || this.hits[point]) ? false : true
	}
}