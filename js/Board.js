
class Game {
  constructor(ctx, world, humanPlayers, computerPlayers,text, maxDuration = 10) {
    this.ctx = ctx;
    this.world = world;
    this.squareSize = (height-2*yDisplacement)/world.length;
    this.humanPlayers = humanPlayers;
    this.computerPlayers = computerPlayers;
    this.text1 = text;
    this.allPlayers = unionTwoArrays(humanPlayers,computerPlayers);
    this.maxDuration = maxDuration
  }

  start() {
    this.allPlayers.forEach(player => {
      this.world[player.y][player.x].addPlayerToSquare(player)
    })
    this.determineScores();
    this.draw();
  }

  update() {
    this.moveAllComps();
    this.determineScores();
    this.reorderByScore(this.computerPlayers);
    this.reorderByScore(this.allPlayers);
    this.checkSquares();
    this.draw();
  }

  reset() {
    this.allPlayers.forEach(player => {
      player.reset();
    })
    this.clearMap();
    this.start();
  }

  checkSquares() {
    for (var row = 0; row<this.world.length; row++) {
      for (var col = 0; col<this.world.length; col++) {
        let square = this.world[row][col];
        if (square.color!=null && square.passable) {
          square.duration++;
          if (square.duration > 18) {
            square.passable = false;
          }
        }
      }
    }
  }

  clearMap() {
    for (var row = 0; row<this.world.length;row++) {
      for (var col = 0; col<this.world[row].length; col++) {
        this.world[row][col] = new Square();      //will have to add more conditions here to clear map
      }
    }
  }

  moveAllComps() {
    for (var i = 0; i<this.computerPlayers.length;i++) {
      let comp = this.computerPlayers[i];
      comp.lookAround();
      comp.executeMove(comp.determineBestMove())
    }
  }

  determineScores() {
    this.allPlayers.forEach(function(player){
      player.score = 0;
    })
    for (var row = 0; row<this.world.length; row++) {
      for (var col = 0; col<this.world[row].length; col++) {
        var color = this.world[row][col].color;
        var matchingPlayer = this.allPlayers.filter(function(player){
          return player.color === color
        })
        if (matchingPlayer.length > 0)
          matchingPlayer[0].score += 1;
      }
    }
  }



  checkGameOver() {
    for (var row = 0; row<this.world.length;row++) {
      for (var col = 0; col<this.world[row].length;col++) {
        if (this.world[row][col].color === null)
          return false
      }
    }
    return true
  }

  checkRedRobotWin() {
    return this.checkGameOver() && this.allPlayers[0].name === "Red Robot"
  }

  draw() {
    console.log('draw called');
    this.ctx.save();
    this.ctx.clearRect(0,0,width,height);
    for (var row = 0; row<this.world.length; row++) {
      for (var col = 0; col<this.world[row].length; col++) {
        console.log('this.world[row][col].occupyingPlayer instanceof Player', this.world[row][col].occupyingPlayer instanceof Player)
        if (this.world[row][col].occupyingPlayer instanceof Player) {
          this.drawEmptySquare(row,col);
          this.drawCharacter(row,col);
        } else if (this.world[row][col].color === null){
          this.drawEmptySquare(row,col);
        } else if (this.world[row][col].color === "red") {
          this.drawColoredSquare(row,col,"red");
        } else if (this.world[row][col].color === "#009ACD") {
          this.drawColoredSquare(row,col,"#009ACD");
        } else if (this.world[row][col].color === "green") {
          this.drawColoredSquare(row,col,"green");
        } else if (this.world[row][col].color === "orange") {
          this.drawColoredSquare(row,col,"orange");
        } else if (this.world[row][col].color === "pink") {
          this.drawColoredSquare(row,col,"pink");
        }
        if (!this.world[row][col].passable) {
          this.drawImpassableSquare(row,col);
        }
      }
    }
    this.drawScoreBoard();
    this.drawStatusTextBox();
    this.ctx.restore();
  }

  drawEmptySquare(row,col){
    this.ctx.save()
    this.ctx.strokeStyle="RGBA(0,0,0,0.3)"
    this.ctx.translate(gameBoardXDisplacement+this.squareSize*col,yDisplacement+this.squareSize*row);
    this.ctx.strokeRect(0,0,this.squareSize,this.squareSize);
    this.ctx.restore();
  }

  drawColoredSquare(row,col, color){
    this.ctx.save()
    this.ctx.fillStyle=color;
    this.ctx.strokeStyle = "white";
    this.ctx.translate(gameBoardXDisplacement+this.squareSize*col,yDisplacement+this.squareSize*row);
    this.ctx.fillRect(0,0,this.squareSize,this.squareSize);
    this.ctx.strokeRect(0,0,this.squareSize,this.squareSize);
    this.ctx.restore();
  }

  drawImpassableSquare(row,col) {
    this.ctx.save();
    this.ctx.strokeStyle = "yellow";
    this.ctx.lineWidth = 6;
    this.ctx.translate(gameBoardXDisplacement+this.squareSize*col,yDisplacement+this.squareSize*row);
    this.ctx.strokeRect(0,0,this.squareSize,this.squareSize);
    this.ctx.restore();
  }

  //
  //var gameBoardgameBoardXDisplacement = 200;
  //var gameBoardYDisplacement = yDisplacement;


  drawCharacter(row,col){
    console.log("draw character called")
    this.ctx.save()
    this.ctx.translate(gameBoardXDisplacement+this.squareSize*col,yDisplacement+this.squareSize*row);
    console.log('this.world[row][col].occupyingPlayer.img', this.world[row][col].occupyingPlayer.img)
    this.ctx.drawImage(this.world[row][col].occupyingPlayer.img,col,row,this.squareSize,this.squareSize)
    this.ctx.restore();
  }

  reorderByScore(arr) {
    arr.sort(function(a,b){
      return b.score - a.score
    })
  }

  drawScoreBoard() {
    this.ctx.save();
    // this.ctx.translate(this.ctx.canvas.width-200,50);
    this.ctx.translate(xDisplacement,yDisplacement);
    this.ctx.fillStyle = "black";
    this.ctx.font = '24px serif'
    for (var i = 0; i<this.allPlayers.length;i++) {
      this.ctx.strokeRect(0,i*60,180,50);
      var text = this.allPlayers[i].name + ": " + this.allPlayers[i].score
      this.ctx.fillText(text, 5, i*60 + 30)
    }
    this.ctx.restore();
  }

  drawStatusTextBox() {
    this.ctx.save();
    var textBoxWidth = width-height-xDisplacement;
    var textBoxHeight = height/2-yDisplacement;
    if(this.checkGameOver()) {
      this.text1 = "Game Over -- Winner is:      " + this.allPlayers[0].name
    }
    // this.ctx.translate(height, height/2);
    this.ctx.translate(xDisplacement,height/2);
    this.ctx.fillStyle = "black";
    this.ctx.font = '16px sans-serif'
    this.ctx.fillRect(0,0,textBoxWidth,textBoxHeight);
    this.ctx.fillStyle = "white";
    wrapText(this.ctx,this.text1,10,50,textBoxWidth,25)
    this.ctx.restore();
  }

}


/*

class GameBoard {
  constructor(ctx, size){
    this.ctx = ctx
    this.size = size
    this.gameBoard = matrix(size)
    this.squareSize = 120;
    this.humanPlayers = []
    this.computerPlayers = [];
    this.allPlayers = []
  }

  addComputerPlayer(computerPlayer) {
    this.computerPlayers.push(computerPlayer);
    this.allPlayers.push(computerPlayer);
    this.gameBoard[computerPlayer.y][computerPlayer.x] = computerPlayer
  }

  addHumanPlayer(player) {
    this.allPlayers.push(player);
    this.humanPlayers.push(player);
    this.gameBoard[player.y][player.x] = player
  }

  update() {
    this.moveAllComps();
    this.determineScores();
    this.computerPlayers.sort(function(a,b){
      return b.score - a.score
    })
    this.allPlayers.sort(function(a,b){
      return b.score - a.score
    })
    this.draw();
  }

  moveAllComps() {
    for (var i = 0; i<this.computerPlayers.length;i++) {
      let comp = this.computerPlayers[i];
      comp.lookAround();
      comp.executeMove(comp.determineBestMove())
    }
  }

  determineScores() {
    this.allPlayers.forEach(function(player){
      player.score = 0;
    })
    for (var row = 0; row<this.gameBoard.length; row++) {
      for (var col = 0; col<this.gameBoard[row].length; col++) {
        var color = this.gameBoard[row][col];
        var matchingPlayer = this.allPlayers.filter(function(player){
          return player.color === color
        })
        if (matchingPlayer.length > 0)
          matchingPlayer[0].score += 1;
      }
    }
  }
  
  draw() {
    this.ctx.save();
    this.ctx.clearRect(0,0,this.ctx.canvas.width,this.ctx.canvas.height)
    for (var row = 0; row<this.gameBoard.length; row++) {
      for (var col = 0; col<this.gameBoard[row].length; col++) {
        if (this.gameBoard[row][col] === null) {
          this.drawEmptySquare(row,col);
        } else if (this.gameBoard[row][col] === "red") {
          this.drawColoredSquare(row,col,"red");
        } else if (this.gameBoard[row][col] === "#009ACD") {
          this.drawColoredSquare(row,col,"#009ACD");
        } else if (this.gameBoard[row][col] === "green") {
          this.drawColoredSquare(row,col,"green");
        } else if (this.gameBoard[row][col] === "orange") {
          this.drawColoredSquare(row,col,"orange");
        } else if (this.gameBoard[row][col] === "pink") {
          this.drawColoredSquare(row,col,"pink");
        } else if (this.gameBoard[row][col] instanceof Player) {
          this.drawCharacter(row,col)
        }
      }
    }
    this.drawScoreBoard();
    this.ctx.restore();
  }

  checkGameOver(){
    for (var row = 0; row<this.gameBoard.length;row++) {
      for (var col = 0; col<this.gameBoard[row].length;col++) {
        if (this.gameBoard[row][col] === null)
          return false
      }
    }
    return true
  }

  drawCharacter(row,col){
    this.ctx.save()
    this.ctx.translate(50+this.squareSize*col,50+this.squareSize*row);
    this.ctx.drawImage(this.gameBoard[row][col].img,col,row,this.squareSize,this.squareSize)
    this.ctx.restore();
  }

  drawEmptySquare(row,col){
    this.ctx.save()
    this.ctx.strokeStyle="RGBA(0,0,0,0.3)"
    this.ctx.translate(50+this.squareSize*col,50+this.squareSize*row);
    this.ctx.strokeRect(0,0,this.squareSize,this.squareSize);
    this.ctx.restore();
  }

  drawColoredSquare(row,col, color){
    this.ctx.save()
    this.ctx.fillStyle=color;
    this.ctx.strokeStyle = "white";
    this.ctx.translate(50+this.squareSize*col,50+this.squareSize*row);
    this.ctx.fillRect(0,0,this.squareSize,this.squareSize);
    this.ctx.strokeRect(0,0,this.squareSize,this.squareSize);
    this.ctx.restore();
  }

  drawScoreBoard() {
    this.ctx.save();
    this.ctx.translate(this.ctx.canvas.width-200,50);
    this.ctx.fillStyle = "black";
    this.ctx.font = '24px serif'
    for (var i = 0; i<this.allPlayers.length;i++) {
      this.ctx.strokeRect(0,i*60,180,50);
      var text = this.allPlayers[i].name + ": " + this.allPlayers[i].score
      this.ctx.fillText(text, 5, i*60 + 30)
    }
    if(this.checkGameOver()) {
      this.ctx.fillText("Game Over",5,(i+1)*60 + 30);
      this.ctx.fillText("Winner is: ",5,(i+2)*60 + 30);
      var winnerText = this.allPlayers[0].name
      this.ctx.fillText(winnerText,5,(i+3)*60 +30)
    }
    this.ctx.restore();
  }

}

*/