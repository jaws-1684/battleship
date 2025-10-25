export const evh = (() => {
  const validTarget = (target) => {
    try {
      let battlefield_opponent =
        target.parentElement.parentElement.classList.contains(
          "battlefield_opponent",
        );
      return battlefield_opponent;
    } catch (error) {
      console.log(error);
    }
  };
  const parseCoordinates = (target) => {
    let x = target.getAttribute("data-x");
    let y = target.getAttribute("data-y");
    return [Number(x), Number(y)];
  };
  return { validTarget, parseCoordinates };
})();
