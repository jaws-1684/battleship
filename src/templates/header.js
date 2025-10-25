export const Header = ((doc) => {
  const row = (grid) => {
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    template(grid, letters, "col-header");
  };
  const col = (grid) => {
    let numbers = [...Array(10).keys()];
    template(grid, numbers, "row-header");
  };
  const template = (grid, data, attr) => {
    let container = doc.createElement("div");
    container.setAttribute("class", attr);

    for (let item of data) {
      let cell = doc.createElement("p");
      cell.textContent = item;
      cell.setAttribute("class", "header-item");
      container.append(cell);
    }
    grid.append(container);
  };

  return { col, row };
})(document);
