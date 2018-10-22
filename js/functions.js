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
      row.push(null);
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


//var player = new Player();
//addPlayerToMap(player);
//player.executeMove('south')

function matrixContainsNull(matrix){
  for (var row = 0;row<matrix.length;row++){
    for(var col = 0;col<matrix[row].length;col++) {
      if (matrix[row][col] == null)
        return true
    }
  }
  return false
}

function countTheBoard(matrix){
  var pink = 0
  var blue = 0
  var orange = 0
  var green = 0;
  for (var row = 0;row<matrix.length;row++){
    for(var col = 0;col<matrix[row].length;col++) {
      if (matrix[row][col] == "pink") pink++;
      else if (matrix[row][col] == "blue") blue++;
      else if (matrix[row][col] == "orange") orange++;
      else if (matrix[row][col] == "green") green++;
    }
  }
  return ["pink: " + pink, "blue: " + blue, "orange: " + orange,"green: " + green]
}