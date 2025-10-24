export const evh = (() => {
	const validTarget = (target) => {
		let battlefield_opponent = target.parentElement.parentElement.classList.contains("battlefield_opponent")
		return battlefield_opponent 
	}
	const parseCoordinates = (target) => {
		let x = target.getAttribute("data-x")
    let y = target.getAttribute("data-y")
    return [Number(x), Number(y)]
	}
	return { validTarget, parseCoordinates}
})()