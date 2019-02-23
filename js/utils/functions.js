function maxInArray(arr) {
  var result = 0;
  for (var i = 0; i<arr.length;i++){
    if (arr[i]>result) 
      result = arr[i]
  }
  return result
}

function matrix(n) {
  var matrix = [];
  for (var i = 0; i < n; i++) {
    var row = [];
    for (var j = 0; j < n; j++) {
      row.push(new Square());
    }
    matrix.push(row);
  }
  return matrix;
}

function unionTwoArrays(a,b) {
  var c = [];
  for (var i = 0; i<a.length;i++) {
    c.push(a[i])
  }
  for (var j = 0; j<b.length;j++) {
    c.push(b[j])
  }
  return c
}

function isArrayAinB(a,b) {
  var stringifiedA = JSON.stringify(a)
  var stringifiedB = JSON.stringify(b)
  return stringifiedB.indexOf(stringifiedA) > -1
}



function wrapText(ctx,text,x,y,maxWidth,lineHeight) {
  var words = text.split(' ');
  var line = '';
  for(var i = 0; i<words.length; i++) {
    var testLine = line + words[i] + ' ';
    var metrics = ctx.measureText(testLine);
    var testWidth = metrics.width;
    if (testWidth > maxWidth && i>0){
      ctx.fillText(line,x,y);
      line = words[i] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line,x,y);
}


//var player = new Player();
//addPlayerToMap(player);
//player.executeMove('south')

function matrixContainsNull(matrix){
  for (var row = 0;row<matrix.length;row++){
    for(var col = 0;col<matrix[row].length;col++) {
      if (matrix[row][col].color == null)
        return true
    }
  }
  return false
}