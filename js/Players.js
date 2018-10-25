class Player {
  constructor(color="red", x = 0, y = 0) {
    this.name = "Red Robot";
    this.x = x;
    this.y = y;
    this.startingX = x;
    this.startingY = y;
    this.color = color;
    this.score = 0;
    this.img = new Image();
    this.img.src = "./images/redRobotTransparent.png"
    this.connected = true;
  }

  //determines point value of a given space 
  evaluateCoordinate(y,x) {  
    if (y < 0 || x < 0 || game.world.length-1 < y || game.world.length-1 < x || !game.world[y][x].passable) {
      return -1 
    }
    //Square does not belong to an opponent.
    if (this.checkIfBlank(game.world[y][x])) return 2
    if (this.checkIfOwnColor(game.world[y][x])) return 1

    //Square belongs to an opponent.
    let durationQuotient = game.world[y][x].duration / game.maxDuration
    if (this.checkIfLeadingPlayersColor(game.world[y][x])) return 5 + durationQuotient
    if (this.checkIfOpponentsColor(game.world[y][x])) return 5 + durationQuotient
    else return 1
  }

  executeMove(direction) {
    game.world[this.y][this.x].removePlayerFromSquare(this);
    switch(direction) {
      case "north":
        this.moveNorth()
        break;
      case "east":
        this.moveEast();
        break;
      case "west":
        this.moveWest();
        break;
      case "south":
        this.moveSouth();
        break;
      default:
        break;
    }
    game.world[this.y][this.x].addPlayerToSquare(this)
  }

  moveNorth() {
    this.y -= 1;
  }
  moveEast() {
    this.x += 1;
  }
  moveWest() {
    this.x -= 1;
  }
  moveSouth() {
    this.y += 1;
  }


  reset() {
    this.x = this.startingX;
    this.y = this.startingY;
    this.score = 0;
    this.connected = true;
    
  }

  checkIfLeadingPlayersColor(square) {
    return game.allPlayers[0].color === square.color
  }

  checkIfOwnColor(square) {
    return this.color === square.color;
  }

  checkIfOpponentsColor(square) {
    return !this.checkIfOwnColor(square) && square.color != null
  }

  checkIfBlank(square) {
    return square.color === null
  }

  isPassable(y,x) {
    if (y < 0 || x < 0 || y > game.world.length - 1 || x > game.world.length - 1) {   
      return false
    } else if (game.world[y][x].occupyingPlayer != null) {
      return true
    } else if (game.world[y][x].passable === false) {
      return false
    } else {
      return true
    }
  }

  isConnected() {
    var toCheck = [[this.y,this.x+1],[this.y+1,this.x],[this.y,this.x-1],[this.y-1,this.x]];
    var checked = [];
    while (toCheck.length > 0) {
      var nextToCheck = toCheck.pop();
      checked.push(nextToCheck);
      var currentY = nextToCheck[0]
      var currentX = nextToCheck[1]
      if (!this.isPassable(currentY,currentX)) {
        continue;
      } else if (game.world[currentY][currentX].color === null) {
        return true
      } else {
        if (!isArrayAinB([currentY,currentX +1],checked)) {
          toCheck.push([currentY,currentX +1])
        }
        if (!isArrayAinB([currentY+1,currentX],checked)) {
          toCheck.push([currentY+1,currentX])
        }
        if (!isArrayAinB([currentY-1,currentX],checked)) {
          toCheck.push([currentY-1,currentX])
        }
        if (!isArrayAinB([currentY,currentX-1],checked)) {
          toCheck.push([currentY,currentX-1])
        }  
      }
    }
    return false
  }  
}


class AIPlayer extends Player {
  constructor(name, color, src="", x=0, y=0) {
    super();
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
    this.startingX = x;
    this.startingY = y;
    this.img = new Image();
    this.img.src = src
    this.nextPossibleMoves = {north: 0, east: 0, west: 0, south: 0, stay: 0}
  }

  //evaluates the coordinates of the 4 adjacent squares
  // and updates nextPossibleMoves object
  lookAround() {      
    this.nextPossibleMoves.north = this.evaluateCoordinate(this.y-1,this.x)
    this.nextPossibleMoves.east = this.evaluateCoordinate(this.y,this.x+1)
    this.nextPossibleMoves.south = this.evaluateCoordinate(this.y+1,this.x)
    this.nextPossibleMoves.west = this.evaluateCoordinate(this.y,this.x-1)
  }

    //determines point value of a given space 
  evaluateCoordinate(y,x) {  
    if (y < 0 || x < 0 || game.world.length-1 < y || game.world.length-1 < x || !game.world[y][x].passable) {
      return -1 
    }

    let r = Math.random();

    //Square does not belong to an opponent.
    if (this.checkIfBlank(game.world[y][x]) && r > 0.925) return 8
    if (this.checkIfBlank(game.world[y][x])) return 2
    if (this.checkIfOwnColor(game.world[y][x])) return 1

    //Square belongs to an opponent.
    let durationQuotient = game.world[y][x].duration / game.maxDuration
    if (this.checkIfLeadingPlayersColor(game.world[y][x])) return 5 + durationQuotient
    if (this.checkIfOpponentsColor(game.world[y][x])) return 5 + durationQuotient
    else return 1
  }


  //Looks in nextPossibleMoves object 
  //and returns the best move (randomly breaks ties)
  determineBestMove() {  
    let valueOfBestMove = maxInArray(Object.values(this.nextPossibleMoves))
    let bestMoves = ["north","east","west","south","stay"].filter(direction => {  
      return this.nextPossibleMoves[direction] == valueOfBestMove
    })
    let r = Math.floor(Math.random()*bestMoves.length)
    return bestMoves[r]
  }

  reset() {
    this.x = this.startingX;
    this.y = this.startingY;
    this.score = 0;
    this.connected = true;
    this.nextPossibleMoves = {north: 0, east: 0, west: 0, south: 0, stay: 0}
  }

}

class EasyAI extends AIPlayer {
  constructor(name, color, src="", x=0, y=0) {
    super(name,color, src,x,y);
  }

  evaluateCoordinate(y,x) {  
    if (y < 0 || x < 0 || game.world.length-1 < y || game.world.length-1 < x || !game.world[y][x].passable) {
      return -1 
    }
    if (this.checkIfBlank(game.world[y][x])) return 2
    if (this.checkIfOwnColor(game.world[y][x])) return 2
    if (this.checkIfLeadingPlayersColor(game.world[y][x])) return 2
    if (this.checkIfOpponentsColor(game.world[y][x])) return 2
    else return 1
  }
}

class FairAI extends AIPlayer {
  constructor(name, color, src="", x=0, y=0) {
    super(name,color, src,x,y);
  }

  evaluateCoordinate(y,x) {  
    if (y < 0 || x < 0 || game.world.length-1 < y || game.world.length-1 < x || !game.world[y][x].passable) {
      return -1 
    }

     let r = Math.random();

    if (this.checkIfBlank(game.world[y][x]) && r > 0.925) return 8
    if (this.checkIfBlank(game.world[y][x])) return 2
    if (this.checkIfOwnColor(game.world[y][x])) return 1
    if (this.checkIfLeadingPlayersColor(game.world[y][x])) return 5
    if (this.checkIfOpponentsColor(game.world[y][x])) return 3
    else return 1
  }
}