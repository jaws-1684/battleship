

export const DOM = ((doc => {
	const game = doc.querySelector(".game")
	const passDeviceScreen = doc.querySelector(".pass-device")
	const counter = passDeviceScreen.querySelector(".time")
	const clear = (attr) => {
		doc.querySelector(attr).textContent = ""
	}
	const message = (str) => {
		let block = doc.querySelector(".messages")
		block.textContent = str
	}
	const showCourtain = () => {
		passDeviceScreen.classList.toggle("hidden")
		counter.textContent = "."
		for (let i = 1; i < 10; i++) {
			setTimeout(() => counter.textContent = counter.textContent + ".", 1000 * i)
		}
	}
	const hideCourtain = () => {
		passDeviceScreen.classList.toggle("hidden")
	}
	const addPanel = () => {
		let panel = doc.createElement("div")
		panel.innerHTML = `
            <form>
                <fieldset>
                    <legend>Opponent</legend>
                    <div>
                        <input type="radio" id="computer" name="player" value="computer" checked/>
                        <label for="computer">Computer</label>

                        <input type="radio" id="friend" name="player" value="friend" />
                        <label for="friend">Friend</label>

                    </div>

                    <div>
                        <button type="button" id="startGame">Play</button>
                    </div>
                </fieldset>
            </form>`
		panel.classList.add("start-game", "hidden")
		if (!doc.querySelector(".start-game")) {
			game.querySelectorAll(".battlefield_container")[1].append(panel)
		}
		
	}

	return { clear, showCourtain, hideCourtain, addPanel, message }
}))(document)
