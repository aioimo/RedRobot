class Game {
  constructor(
    ctx,
    world,
    humanPlayers,
    hasHumanPlayer,
    computerPlayers,
    text,
    maxDuration,
    scoreBoardColor,
    backgroundColor
  ) {
    this.world = world;
    this.humanPlayers = hasHumanPlayer ? humanPlayers : [];
    this.computerPlayers = computerPlayers;
    this.allPlayers = [...this.humanPlayers, ...this.computerPlayers];
    this.maxDuration = maxDuration;
    this.turnCounter = 0;
    this.drawing = new Drawing({
      ctx,
      world,
      text,
      backgroundColor,
      scoreBoardColor
    });
  }

  draw() {
    this.drawing.draw({
      allPlayers: this.allPlayers,
      isGameOver: this.checkGameOver(),
      isRedRobotWinner: this.checkRedRobotWin(),
      turnCounter: this.turnCounter
    });
  }

  start() {
    this.allPlayers.forEach(player => {
      this.world[player.y][player.x].addPlayerToSquare(player);
    });
    this.determineScores();
    this.draw();
  }

  update() {
    this.turnCounter++;
    this.moveAllComps();
    this.determineScores();
    this.reorderByScore(this.computerPlayers);
    this.reorderByScore(this.allPlayers);
    this.checkSquares();
    this.checkAllPlayersConnected();
    this.draw();
    if (game.checkRedRobotWin()) {
      levelCounter++;
      setPlayBtn();
    }
  }

  reorderByScore(arr) {
    arr.sort((a, b) => b.score - a.score);
  }

  reset() {
    this.allPlayers.forEach(player => {
      player.reset();
    });
    this.clearMap();
    this.start();
  }

  includesHumanPlayer() {
    return this.humanPlayers.length > 0;
  }

  checkSquares() {
    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world.length; col++) {
        const square = this.world[row][col];
        if (square.isColored() && square.passable) {
          square.duration++;
          if (square.duration > this.maxDuration) {
            square.passable = false;
          }
        }
      }
    }
  }

  clearMap() {
    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world[row].length; col++) {
        this.world[row][col] = new Square(); //will have to add more conditions here to clear map
      }
    }
  }

  moveAllComps() {
    for (let i = 0; i < this.computerPlayers.length; i++) {
      const comp = this.computerPlayers[i];
      if (comp.connected) {
        comp.lookAround();
        comp.executeMove(comp.determineBestMove());
      }
    }
  }

  startCountingAtZero() {
    this.allPlayers.forEach(player => {
      player.score = 0;
    });
  }

  determineScores() {
    this.startCountingAtZero();
    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world[row].length; col++) {
        const color = this.world[row][col].color;
        const matchingPlayer = this.allPlayers.filter(
          player => player.color === color
        );
        if (matchingPlayer.length > 0) {
          matchingPlayer.forEach(player => {
            player.score += 1;
          });
        }
      }
    }
  }

  checkAllPlayersConnected() {
    this.allPlayers.forEach(player => {
      if (player.connected) {
        player.connected = player.isConnected();
      }
    });
  }

  checkGameOver() {
    return this.noMoreEmptySpaces() || this.noPlayersConnected();
  }

  noMoreEmptySpaces() {
    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world[row].length; col++) {
        const square = this.world[row][col];
        if (square.isBlank()) return false;
      }
    }
    return true;
  }

  noPlayersConnected() {
    let noPlayerConnected = true;
    this.allPlayers.forEach(player => {
      if (player.connected) noPlayerConnected = false;
    });
    return noPlayerConnected;
  }

  checkRedRobotWin() {
    this.includesHumanPlayer()
      ? this.checkGameOver() && this.allPlayers[0].name === 'Red Robot'
      : false;
  }
}
