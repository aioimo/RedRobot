class Game {
  constructor(
    ctx,
    world,
    humanPlayers,
    computerPlayers,
    text,
    maxDuration,
    scoreBoardColor,
    backgroundColor
  ) {
    this.ctx = ctx;
    this.world = world;
    this.squareSize = (height - 2 * yDisplacement) / world.length;
    this.humanPlayers = humanPlayers;
    this.computerPlayers = computerPlayers;
    this.scoreBoardColor = scoreBoardColor;
    this.backgroundColor = backgroundColor;
    this.gameText = text;
    this.allPlayers = [...humanPlayers, ...computerPlayers];
    this.maxDuration = maxDuration;
  }

  start() {
    this.allPlayers.forEach(player => {
      this.world[player.y][player.x].addPlayerToSquare(player);
    });
    this.determineScores();
    this.draw();
  }

  update() {
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
        let square = this.world[row][col];
        if (square.color != null && square.passable) {
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
      let comp = this.computerPlayers[i];
      if (comp.connected) {
        comp.lookAround();
        comp.executeMove(comp.determineBestMove());
      }
    }
  }

  determineScores() {
    this.allPlayers.forEach(player => {
      player.score = 0;
    });
    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world[row].length; col++) {
        let color = this.world[row][col].color;
        let matchingPlayer = this.allPlayers.filter(
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
        if (this.world[row][col].color === null) return false;
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

  draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, width, height);
    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world[row].length; col++) {
        if (this.world[row][col].occupyingPlayer != null) {
          this.drawEmptySquare(row, col);
          this.drawCharacter(row, col);
        } else if (this.world[row][col].color === null) {
          this.drawEmptySquare(row, col);
        } else if (this.world[row][col].color != null) {
          this.drawColoredSquare(row, col, this.world[row][col].color);
        }
      }
    }
    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world[row].length; col++) {
        if (
          this.world[row][col].occupyingPlayer == null &&
          !this.world[row][col].passable
        ) {
          this.drawImpassableSquare(row, col);
        }
      }
    }
    this.drawScoreBoard();
    this.drawStatusTextBox();
    // this.drawBorderAroundBoard();
    this.ctx.restore();
  }

  drawBorderAroundBoard() {
    this.ctx.save();
    this.ctx.translate(gameBoardXDisplacement, yDisplacement);
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(
      -2,
      -2,
      this.squareSize * this.world.length + 4,
      this.squareSize * this.world.length + 4
    );
    this.ctx.restore();
  }

  drawEmptySquare(row, col) {
    this.ctx.save();
    this.ctx.fillStyle = '#F0F0F0';
    // this.ctx.fillStyle = "#white";
    this.ctx.translate(
      gameBoardXDisplacement + this.squareSize * col,
      yDisplacement + this.squareSize * row
    );
    this.ctx.fillRect(2, 2, this.squareSize - 4, this.squareSize - 4);

    //LIGHT OUTLINE --
    // this.ctx.strokeStyle="RGBA(0,0,0,0.1)"
    // this.ctx.translate(gameBoardXDisplacement+this.squareSize*col,yDisplacement+this.squareSize*row);
    // this.ctx.strokeRect(0,0,this.squareSize,this.squareSize);
    this.ctx.restore();
  }

  drawColoredSquare(row, col, color) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = 'white';
    this.ctx.translate(
      gameBoardXDisplacement + this.squareSize * col,
      yDisplacement + this.squareSize * row
    );
    this.ctx.fillRect(2, 2, this.squareSize - 4, this.squareSize - 4);
    this.ctx.strokeRect(0, 0, this.squareSize, this.squareSize);
    this.ctx.restore();
  }

  drawImpassableSquare(row, col) {
    this.ctx.save();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 4;
    this.ctx.translate(
      gameBoardXDisplacement + this.squareSize * col,
      yDisplacement + this.squareSize * row
    );
    this.ctx.strokeRect(0, 0, this.squareSize, this.squareSize);
    this.ctx.restore();
  }

  drawCharacter(row, col) {
    this.ctx.save();
    this.ctx.translate(
      gameBoardXDisplacement + this.squareSize * col,
      yDisplacement + this.squareSize * row
    );
    this.ctx.drawImage(
      this.world[row][col].occupyingPlayer.img,
      0,
      0,
      this.squareSize,
      this.squareSize
    );
    this.ctx.restore();
  }

  reorderByScore(arr) {
    arr.sort((a, b) => b.score - a.score);
  }

  drawStatusTextBox() {
    this.ctx.save();
    const textBoxWidth = width - height - xDisplacement;
    const textBoxHeight = height / 2 - 2 * yDisplacement;
    if (this.checkGameOver()) {
      this.gameText = [];
      this.gameText.push('Round Over');
      this.gameText.push('Winner is ' + this.allPlayers[0].name);
    }
    if (this.checkRedRobotWin()) {
      this.gameText.push('Congratulations!');
      this.gameText.push(
        'Click the button the right to play level ' + (levelCounter + 2)
      );
    }
    this.ctx.translate(xDisplacement, 40 + height / 2);
    this.drawRoundedBox(2, 2, textBoxWidth, textBoxHeight, 25, 'black');
    this.drawRoundedBox(
      0,
      0,
      textBoxWidth,
      textBoxHeight,
      25,
      this.scoreBoardColor
    );

    //draw title
    this.ctx.font = '26px PokemonGB';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = 'white';
    wrapText(
      this.ctx,
      this.gameText[0],
      textBoxWidth / 2,
      50,
      textBoxWidth - 20,
      35
    );

    //draw other text
    this.ctx.font = '14px PokemonGB';
    this.ctx.textAlign = 'left';
    this.ctx.fillStyle = 'white';
    for (let i = 1; i < this.gameText.length; i++) {
      wrapText(
        this.ctx,
        this.gameText[i],
        20,
        35 + 50 * i,
        textBoxWidth - 20,
        25
      );
    }

    this.ctx.restore();
  }

  drawScoreBoard() {
    this.ctx.save();
    this.ctx.translate(xDisplacement, yDisplacement);
    let indent = 30;
    this.drawOvalShape(0, 0);
    for (let i = 0; i < this.allPlayers.length; i++) {
      this.drawScorePanel(0, 60 + i * 50, this.allPlayers[i]);
    }
    this.ctx.restore();
  }

  drawHalfCircleLeft(x, y, color) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 20, Math.PI / 2, (3 * Math.PI) / 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawHalfCircleRight(x, y, color) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, 20, Math.PI / 2, (3 * Math.PI) / 2, true);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawOvalShape(x, y) {
    this.ctx.save();
    let radius = 20;
    //background
    this.ctx.fillStyle = 'black';
    this.drawHalfCircleLeft(x + 2 + radius, y + 2 + radius, 'black');
    this.drawHalfCircleRight(
      x + 2 + width - height - xDisplacement - radius,
      y + 2 + radius,
      'black'
    );
    this.ctx.fillRect(
      x + 2 + radius,
      y + 2,
      width - height - xDisplacement - 2 * radius,
      40
    );

    //The panel
    this.ctx.fillStyle = this.scoreBoardColor;
    this.drawHalfCircleLeft(x + radius, y + radius, this.scoreBoardColor);
    this.drawHalfCircleRight(
      x + width - height - xDisplacement - radius,
      y + radius,
      this.scoreBoardColor
    );
    this.ctx.fillRect(
      x + radius,
      y,
      width - height - xDisplacement - 2 * radius,
      40
    );

    //Text
    this.ctx.fillStyle = 'white';
    this.ctx.font = '24px PokemonGB';
    let text = 'Leaderboard:';
    this.ctx.fillText(text, x + 60, y + 30);
    this.ctx.restore();
  }

  drawScorePanel(x, y, player) {
    this.ctx.save();
    let radius = 20;
    //background
    this.ctx.fillStyle = 'black';
    this.drawHalfCircleLeft(x + 2 + radius + 30, y + 2 + radius, 'black');
    this.drawHalfCircleRight(
      x + 2 + width - height - xDisplacement - radius,
      y + 2 + radius,
      'black'
    );
    this.ctx.fillRect(
      x + 2 + radius + 30,
      y + 2,
      width - height - xDisplacement - 2 * radius - 30,
      40
    );

    //The panel
    this.ctx.fillStyle = player.color;
    this.drawHalfCircleLeft(x + radius + 30, y + radius, player.color);
    this.drawHalfCircleRight(
      x + width - height - xDisplacement - radius,
      y + radius,
      player.color
    );
    this.ctx.fillRect(
      x + radius + 30,
      y,
      width - height - xDisplacement - 2 * radius - 30,
      40
    );

    //Text
    this.ctx.fillStyle = 'white';
    this.ctx.font = '12px PokemonGB';
    let textName = player.name;
    this.ctx.fillText(textName, x + 60, y + 30);
    let textScore = player.score;
    this.ctx.fillText(textScore, x + 280 + 30, y + 30);
    this.ctx.restore();
  }

  drawRoundedBox(x, y, totalWidth, totalHeight, radius, color = 'black') {
    this.ctx.save();
    let innerHeight = totalHeight - 2 * radius;
    let innerWidth = totalWidth - 2 * radius;
    this.ctx.fillStyle = color;
    this.drawQuarterCircle(x + radius, y + radius, radius, Math.PI / 2, color);
    this.drawQuarterCircle(
      x + radius + innerWidth,
      y + radius,
      radius,
      Math.PI,
      color
    );
    this.drawQuarterCircle(
      x + radius,
      y + radius + innerHeight,
      radius,
      0,
      color
    );
    this.drawQuarterCircle(
      x + radius + innerWidth,
      y + radius + innerHeight,
      radius,
      (3 * Math.PI) / 2,
      color
    );
    this.ctx.fillRect(x, y + radius, totalWidth, innerHeight);
    this.ctx.fillRect(x + radius, y, innerWidth, totalHeight);
    this.ctx.restore();
  }

  drawQuarterCircle(x, y, radius, startAngle, color = 'black') {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(
      x,
      y,
      radius,
      Math.PI / 2 + startAngle,
      Math.PI + startAngle,
      false
    );
    this.ctx.lineTo(x, y);
    this.ctx.fill();
    this.ctx.restore();
  }
}
