BORDER_WIDTH = 2;

class Drawing {
  constructor({ ctx, world, text, backgroundColor, scoreBoardColor }) {
    this.ctx = ctx;
    this.world = world;
    this.gameText = text;
    this.backgroundColor = backgroundColor;
    this.scoreBoardColor = scoreBoardColor;
    this.squareSize = (H_100 - 2 * Y_DISPLACEMENT) / this.world.length;
  }

  draw({ allPlayers, isGameOver, isRedRobotWinner }) {
    this.ctx.save();
    this.ctx.clearRect(0, 0, W_100, H_100);
    this.ctx.fillStyle = this.backgroundColor;
    this.ctx.fillRect(0, 0, W_100, H_100);

    // Draw the board, squares, and characters
    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world[row].length; col++) {
        const square = this.world[row][col];
        if (square.isOccupied()) {
          this.drawEmptySquare(row, col);
          this.drawCharacter(row, col);
        } else if (square.isBlank()) {
          this.drawEmptySquare(row, col);
        } else if (!square.isBlank()) {
          this.drawColoredSquare(row, col, square.color);
        }
      }
    }

    // Draw the impassable squares
    for (let row = 0; row < this.world.length; row++) {
      for (let col = 0; col < this.world[row].length; col++) {
        const square = this.world[row][col];
        if (!square.isOccupied() && !square.passable) {
          this.drawImpassableSquare(row, col);
        }
      }
    }
    this.drawScoreBoard({ allPlayers });
    this.drawStatusTextBox({ isGameOver, allPlayers, isRedRobotWinner });
    this.ctx.restore();
  }

  drawEmptySquare(row, col) {
    this.ctx.save();
    this.ctx.fillStyle = '#F0F0F0';
    // this.ctx.fillStyle = "#white";
    this.ctx.translate(
      BOARD_X_DISPLACEMENT + this.squareSize * col,
      Y_DISPLACEMENT + this.squareSize * row
    );
    this.ctx.fillRect(
      BORDER_WIDTH,
      BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH,
      this.squareSize - 2 * BORDER_WIDTH
    );

    this.ctx.restore();
  }

  drawColoredSquare(row, col, color) {
    this.ctx.save();
    this.ctx.fillStyle = color;
    this.ctx.strokeStyle = 'white';
    this.ctx.translate(
      BOARD_X_DISPLACEMENT + this.squareSize * col,
      Y_DISPLACEMENT + this.squareSize * row
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
      BOARD_X_DISPLACEMENT + this.squareSize * col,
      Y_DISPLACEMENT + this.squareSize * row
    );
    this.ctx.strokeRect(0, 0, this.squareSize, this.squareSize);
    this.ctx.restore();
  }

  drawCharacter(row, col) {
    this.ctx.save();
    this.ctx.translate(
      BOARD_X_DISPLACEMENT + this.squareSize * col,
      Y_DISPLACEMENT + this.squareSize * row
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
    const textBoxWidth = W_100 - H_100 - X_DISPLACEMENT;
    const textBoxHeight = H_100 / 3 - 2 * Y_DISPLACEMENT;
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
    this.ctx.translate(X_DISPLACEMENT, textBoxY + H_100 / 2);
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

    this.ctx.translate(X_DISPLACEMENT, Y_DISPLACEMENT);
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
      x: x + SHADOW_DISPLACEMENT + W_100 - H_100 - X_DISPLACEMENT - radius,
      y: y + SHADOW_DISPLACEMENT + radius,
      color: 'black',
      radius
    });
    this.ctx.fillRect(
      x + SHADOW_DISPLACEMENT + radius,
      y + SHADOW_DISPLACEMENT,
      W_100 - H_100 - X_DISPLACEMENT - HEIGHT,
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
      x: x + W_100 - H_100 - X_DISPLACEMENT - radius,
      y: y + radius,
      color: this.scoreBoardColor,
      radius
    });
    this.ctx.fillRect(
      x + radius,
      y,
      W_100 - H_100 - X_DISPLACEMENT - HEIGHT,
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
      x: x + SHADOW_DISPLACEMENT + W_100 - H_100 - X_DISPLACEMENT - radius,
      y: y + SHADOW_DISPLACEMENT + radius,
      color: 'black',
      radius
    });
    this.ctx.fillRect(
      x + SHADOW_DISPLACEMENT + radius + INDENT,
      y + SHADOW_DISPLACEMENT,
      W_100 - H_100 - X_DISPLACEMENT - DIAMETER - INDENT,
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
      x: x + W_100 - H_100 - X_DISPLACEMENT - radius,
      y: y + radius,
      color: player.color,
      radius
    });
    this.ctx.fillRect(
      x + radius + INDENT,
      y,
      W_100 - H_100 - X_DISPLACEMENT - DIAMETER - INDENT,
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
