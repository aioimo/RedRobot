function maxInArray(arr) {
  return Math.max(...arr);
}

function createGameBoard(n) {
  let grid = [];
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

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && i > 0) {
      ctx.fillText(line, x, y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
