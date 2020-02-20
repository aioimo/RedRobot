function maxInArray(arr) {
  return Math.max(...arr);
}

function createGameBoard(n) {
  const grid = [];
  for (let row = 0; row < n; row++) {
    grid.push([]);
    for (let col = 0; col < n; col++) {
      grid[row][col] = new Square();
    }
  }
  return grid;
}

function isArrayAinB(a, b) {
  const stringifiedA = JSON.stringify(a);
  const stringifiedB = JSON.stringify(b);
  return stringifiedB.indexOf(stringifiedA) > -1;
}

function random(arr) {
  const r = Math.floor(Math.random() * arr.length);
  return arr[r];
}
