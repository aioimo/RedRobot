class PlayerAI extends Player {
  constructor(name, color, src = '', x = 0, y = 0) {
    super();
    this.name = name;
    this.color = color;
    this.x = x;
    this.y = y;
    this.startingX = x;
    this.startingY = y;
    this.img = new Image();
    this.img.src = src;
    this.nextPossibleMoves = { north: 0, east: 0, west: 0, south: 0, stay: 0 };
  }

  //evaluates the coordinates of the 4 adjacent squares
  // and updates nextPossibleMoves object
  lookAround() {
    this.nextPossibleMoves.north = this.evaluateCoordinate(this.y - 1, this.x);
    this.nextPossibleMoves.east = this.evaluateCoordinate(this.y, this.x + 1);
    this.nextPossibleMoves.south = this.evaluateCoordinate(this.y + 1, this.x);
    this.nextPossibleMoves.west = this.evaluateCoordinate(this.y, this.x - 1);
  }

  //determines point value of a given space
  evaluateCoordinate(y, x) {
    if (
      y < 0 ||
      x < 0 ||
      game.world.length - 1 < y ||
      game.world.length - 1 < x ||
      !game.world[y][x].passable
    ) {
      return -1;
    }

    const r = Math.random();

    const square = game.world[y][x];

    //Square does not belong to an opponent.
    if (this.checkIfBlank(square) && r > 0.925) return 8;
    if (this.checkIfBlank(square)) return 2;
    if (this.checkIfOwnColor(square)) return 1;

    //Square belongs to an opponent.
    const durationQuotient = square.duration / game.maxDuration;
    if (this.checkIfLeadingPlayersColor(square)) return 5 + durationQuotient;
    if (this.checkIfOpponentsColor(square)) return 5 + durationQuotient;
    else return 1;
  }

  //Looks in nextPossibleMoves object
  //and returns the best move (randomly breaks ties)
  determineBestMove() {
    const valueOfBestMove = maxInArray(Object.values(this.nextPossibleMoves));
    const bestMoves = ['north', 'east', 'west', 'south', 'stay'].filter(
      direction => this.nextPossibleMoves[direction] == valueOfBestMove
    );
    return random(bestMoves);
  }

  reset() {
    this.x = this.startingX;
    this.y = this.startingY;
    this.score = 0;
    this.connected = true;
    this.nextPossibleMoves = { north: 0, east: 0, west: 0, south: 0, stay: 0 };
  }
}
