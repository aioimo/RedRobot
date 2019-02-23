function maxInArray(arr) {
  var result = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > result) result = arr[i];
  }
  return result;
}

function createGameBoard(n) {
  let grid = [];
  for (let row = 0; row < n; row++) {
    grid.push([]);
    for (let col = 0; col < n; col++) {
      grid[row][col] = new Square();
    }
  }
  console.table(grid);
  return grid;
}

function unionTwoArrays(a, b) {
  return [...a, ...b];
}

function isArrayAinB(a, b) {
  var stringifiedA = JSON.stringify(a);
  var stringifiedB = JSON.stringify(b);
  return stringifiedB.indexOf(stringifiedA) > -1;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  var words = text.split(" ");
  var line = "";
  for (var i = 0; i < words.length; i++) {
    var testLine = line + words[i] + " ";
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
