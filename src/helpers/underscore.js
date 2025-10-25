import { DOM } from "../templates/dom.js"
import { Game } from "../templates/game.js"

export const _ = {
	render: (what, obj={}) => {
		switch (what) {
			case "game":
				let gameboards = [obj.current_player.gameboard, obj.current_player.opponent.gameboard]
				Game.render(gameboards)
				break
			case "panel":
				DOM.addPanel()
				break
			case "fight":
				DOM.addFightPanel()
				break		
		}	
	},
	message: (str) => {
		str.includes("-") ? str = str.split("-").join(" ") : str
		str = str[0].toUpperCase() + str.slice(1) + "."
		DOM.message(str)
	},
	prepend: (what, obj) => {
		switch(what) {
			case "board":
				Game.clearAndPrepend(obj.gameboard)
				break
		}
	},
	show: (what) => {
		switch (what) {
			case "courtain":
				DOM.showCourtain()
		            setTimeout(() => {
		                DOM.hideCourtain()
		            }, 3000)
				break 
		}
	}
}