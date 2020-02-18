class Drawing {
  BORDER_WIDTH = 2;

  constructor({ ctx, world, text, backgroundColor, scoreBoardColor }) {
    this.ctx = ctx;
    this.world = world;
    this.gameText = text;
    this.backgroundColor = backgroundColor;
    this.scoreBoardColor = scoreBoardColor;
    this.squareSize = (height - 2 * yDisplacement) / this.world.length;
  }

  draw({ allPlayers, isGameOver, isRedRobotWinner }) {
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
    this.drawScoreBoard({ allPlayers });
    this.drawStatusTextBox({ isGameOver, allPlayers, isRedRobotWinner });
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
    const { BORDER_WIDTH } = this;

    this.ctx.save();
    this.ctx.fillStyle = '#F0F0F0';
    // this.ctx.fillStyle = "#white";
    this.ctx.translate(
      gameBoardXDisplacement + this.squareSize * col,
      yDisplacement + this.squareSize * row
    );
    this.ctx.fillRect(
      BORDER_WIDTH,
      BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH
    );

    //LIGHT OUTLINE --
    // this.ctx.strokeStyle="RGBA(0,0,0,0.1)"
    // this.ctx.translate(gameBoardXDisplacement+this.squareSize*col,yDisplacement+this.squareSize*row);
    // this.ctx.strokeRect(0,0,this.squareSize,this.squareSize);
    this.ctx.restore();
  }

  drawColoredSquare(row, col, color) {
    const { BORDER_WIDTH } = this;

    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = 'white';
    this.ctx.translate(
      gameBoardXDisplacement + this.squareSize * col,
      yDisplacement + this.squareSize * row
    );
    this.ctx.fillRect(
      BORDER_WIDTH,
      BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH
    );
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

  drawStatusTextBox({ isGameOver, allPlayers, isRedRobotWinner }) {
    this.ctx.save();
    const textBoxWidth = width - height - xDisplacement;
    const textBoxHeight = height / 3 - 2 * yDisplacement;
    const textBoxY = 100;
    const radius = 25;
    const shadowDisplacement = 2;
    if (isGameOver) {
      this.gameText = [];
      this.gameText.push('Round Over');
      this.gameText.push('Winner is ' + allPlayers[0].name);
    }
    if (isRedRobotWinner) {
      this.gameText.push('Congratulations!');
      this.gameText.push(
        'Click the button the right to play level ' + (levelCounter + 2)
      );
    }
    this.ctx.translate(xDisplacement, textBoxY + height / 2);
    this.drawRoundedBox(
      shadowDisplacement,
      shadowDisplacement,
      textBoxWidth,
      textBoxHeight,
      radius,
      'black'
    );
    this.drawRoundedBox(
      0,
      0,
      textBoxWidth,
      textBoxHeight,
      radius,
      this.scoreBoardColor
    );

    //draw title
    this.ctx.font = '18px PokemonGB';
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
    this.ctx.font = '12px PokemonGB';
    this.ctx.textAlign = 'left';
    this.ctx.fillStyle = 'white';
    for (let i = 1; i < this.gameText.length; i++) {
      wrapText(
        this.ctx,
        this.gameText[i],
        20,
        35 + 50 * i,
        textBoxWidth - 20,
        10
      );
    }

    this.ctx.restore();
  }

  drawScoreBoard({ allPlayers }) {
    this.ctx.save();
    const LEADERBOARD_HEIGHT = 40;
    const SPACE_FROM_TITLE = 10;
    const SPACE_BETWEEN_LINES = 12;
    const SCORE_HEIGHT = 30;

    this.ctx.translate(xDisplacement, yDisplacement);
    this.drawLeaderboardTitle(0, 0, LEADERBOARD_HEIGHT / 2);
    allPlayers.forEach((player, i) => {
      this.drawScorePanel({
        x: 0,
        y:
          LEADERBOARD_HEIGHT +
          SPACE_FROM_TITLE +
          i * (SPACE_BETWEEN_LINES + SCORE_HEIGHT),
        player,
        radius: SCORE_HEIGHT / 2
      });
    });
    this.ctx.restore();
  }

  drawHalfCircleLeft({ x, y, radius = 20, color }) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, Math.PI / 2, (3 * Math.PI) / 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawHalfCircleRight({ x, y, radius = 20, color }) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, Math.PI / 2, (3 * Math.PI) / 2, true);
    this.ctx.fill();
    this.ctx.restore();
  }

  drawLeaderboardTitle(x, y, radius) {
    const HEIGHT = 2 * radius;
    const SHADOW_DISPLACEMENT = 2;
    const MAX_TEXT_SIZE = 25;
    const TEXT_SIZE = Math.min(radius, MAX_TEXT_SIZE);

    this.ctx.save();
    //background
    this.ctx.fillStyle = 'black';
    this.drawHalfCircleLeft({
      x: x + SHADOW_DISPLACEMENT + radius,
      y: y + SHADOW_DISPLACEMENT + radius,
      color: 'black',
      radius
    });
    this.drawHalfCircleRight({
      x: x + SHADOW_DISPLACEMENT + width - height - xDisplacement - radius,
      y: y + SHADOW_DISPLACEMENT + radius,
      color: 'black',
      radius
    });
    this.ctx.fillRect(
      x + SHADOW_DISPLACEMENT + radius,
      y + SHADOW_DISPLACEMENT,
      width - height - xDisplacement - HEIGHT,
      HEIGHT
    );

    //The panel
    this.ctx.fillStyle = this.scoreBoardColor;
    this.drawHalfCircleLeft({
      x: x + radius,
      y: y + radius,
      color: this.scoreBoardColor,
      radius
    });
    this.drawHalfCircleRight({
      x: x + width - height - xDisplacement - radius,
      y: y + radius,
      color: this.scoreBoardColor,
      radius
    });
    this.ctx.fillRect(
      x + radius,
      y,
      width - height - xDisplacement - HEIGHT,
      HEIGHT
    );

    //Text
    this.ctx.fillStyle = 'white';
    this.ctx.font = `${TEXT_SIZE}px PokemonGB`;
    let text = 'Leaderboard:';
    this.ctx.fillText(text, x + 60, y + radius + 0.5 * TEXT_SIZE);
    this.ctx.restore();
  }

  drawScorePanel({ x, y, player, radius = 30 }) {
    this.ctx.save();

    const SHADOW_DISPLACEMENT = 2;
    const DIAMETER = 2 * radius;
    const INDENT = 10;
    const MAX_TEXT_SIZE = 20;
    const TEXT_SIZE = Math.min(0.75 * radius, MAX_TEXT_SIZE);

    // background
    this.ctx.fillStyle = 'black';
    this.drawHalfCircleLeft({
      x: x + SHADOW_DISPLACEMENT + radius + INDENT,
      y: y + SHADOW_DISPLACEMENT + radius,
      color: 'black',
      radius
    });
    this.drawHalfCircleRight({
      x: x + SHADOW_DISPLACEMENT + width - height - xDisplacement - radius,
      y: y + SHADOW_DISPLACEMENT + radius,
      color: 'black',
      radius
    });
    this.ctx.fillRect(
      x + SHADOW_DISPLACEMENT + radius + INDENT,
      y + SHADOW_DISPLACEMENT,
      width - height - xDisplacement - DIAMETER - INDENT,
      DIAMETER
    );

    // The panel itself
    this.ctx.fillStyle = player.color;
    this.drawHalfCircleLeft({
      x: x + radius + INDENT,
      y: y + radius,
      color: player.color,
      radius
    });
    this.drawHalfCircleRight({
      x: x + width - height - xDisplacement - radius,
      y: y + radius,
      color: player.color,
      radius
    });
    this.ctx.fillRect(
      x + radius + INDENT,
      y,
      width - height - xDisplacement - DIAMETER - INDENT,
      DIAMETER
    );

    //Text
    this.ctx.fillStyle = 'white';
    this.ctx.font = `${TEXT_SIZE}px PokemonGB`;
    const textName = player.name;
    const yPosition = y + radius + 0.5 * TEXT_SIZE;
    //   this.ctx.fillText(text, x + 60, y + radius + 0.5 * TEXT_SIZE);
    this.ctx.fillText(textName, x + 60, yPosition);
    const textScore = player.score;
    this.ctx.fillText(textScore, x + 280 + INDENT, yPosition);
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
