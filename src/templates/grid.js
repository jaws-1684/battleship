export const Grid = ((doc) => {
  const build = (array, type) => {
    let grid = doc.createElement("div");
    grid.setAttribute("class", `battlefield battlefield_${type}`);

    for (let i = 0; i < array.length; i++) {
      let row = doc.createElement("div");
      row.setAttribute("class", "row");
      for (let j = 0; j < array[i].length; j++) {
        let content = array[i][j];
        let col = doc.createElement("div");

        col.setAttribute("data-x", i);
        col.setAttribute("data-y", j);
        addTag(col, content);

        row.append(col);
      }
      grid.append(row);
    }
    return grid;
  };
  const addTag = (col, data) => {
    col.classList.add("col", "cell");

    switch (data) {
      case "hit":
        col.classList.add("hit");
        break;
      case "missed-hit":
        col.classList.add("missed-hit");
        break;
      case null:
        col.classList.add("empty");
        break;
      default:
        col.classList.add("empty");
    }
  };
  return { build };
})(document);
